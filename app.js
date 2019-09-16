const colors = require('colors');
const argv = require('./config/yargs').argv;


const { crear, guardarDB, getlistado, actualizar, eliminar, mostrarPorEstado } = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        let listado = getlistado();
        console.log('');
        console.log('');
        console.log('LISTAR'.bgRed);
        console.log(argv.completado);
        console.log('');

        if (argv.completado === undefined) {
            listado.forEach(tarea => {
                console.log('=========== Por Hacer ======'.green);
                console.log(tarea.descripcion);
                console.log('estado: ', tarea.completado ? 'terminada' : 'Pendiente');
                console.log('============================'.green);
            });

        } else {
            let listadoTemp = mostrarPorEstado(argv.completado);
            listadoTemp.forEach(tarea => {
                console.log('=========== Por Hacer ======'.green);
                console.log(tarea.descripcion);
                console.log('estado: ', tarea.completado ? 'terminada' : 'Pendiente');
                console.log('============================'.green);
            });
        }
        break;
    case 'actualizar':

        let actualizado = actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;
    case 'eliminar':

        let eliminado = eliminar(argv.descripcion);
        console.log(eliminado ? 'tarea eliminada' : 'no se pudo eliminar la tarea');
        break;

    default:
        console.log('Comando no es reconocido.');
        break;
}