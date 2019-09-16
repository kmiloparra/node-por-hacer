const fs = require('fs');

let listadoPorHacer = [];

const cargarDB = () => {
    try {
        listadoPorHacer = require('../data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}


const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);
    return new Promise((resolve, reject) => {
        fs.writeFile('data.json', data, (err) => {
            if (err) {
                reject(err);
            } else
                resolve(data)
        })
    })

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }
    listadoPorHacer.push(porHacer);
    guardarDB().then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });

    return porHacer;
}

const getlistado = () => {

    cargarDB();
    console.log(listadoPorHacer);
    return listadoPorHacer;
}

const actualizar = (descripcion, completado) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const eliminar = (descripcion) => {
    cargarDB();
    let listadoNuevoPorHacer = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (listadoPorHacer.length === listadoNuevoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = listadoNuevoPorHacer;
        guardarDB();
        return true;
    }
}

const mostrarPorEstado = (estado) => {
    cargarDB();
    let listadoNuevoPorEstado = listadoPorHacer.filter(tarea => tarea.completado + '' === estado + '');
    return listadoNuevoPorEstado;
}



module.exports = {
    crear,
    guardarDB,
    getlistado,
    actualizar,
    eliminar,
    mostrarPorEstado
}