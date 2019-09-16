const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
}

const completado = {
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'
}

const optsDesc = {
    descripcion
}

const optsActu = {
    descripcion,
    completado
}

const optsEst = {
    completado
}

const argv = require('yargs')
    .command('actualizar', 'Actualiza el estado completado de una tarea', optsActu)
    .command('crear', 'Crear un elemento por realizar', optsDesc)
    .command('eliminar', 'Elimina un elemento por realizar', optsDesc)
    .command('listar', 'Muestra las tareas filtradas por estado', optsEst)
    .help()
    .argv;


module.exports = {
    argv
}