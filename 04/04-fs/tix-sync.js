const fs = require("fs");

const path = '../04-fs/tix.json'

if (!fs.existsSync(path)) {
    const array = JSON.stringify([]);
    fs.writeFileSync(path, array)
}

// si el path no existe, lo creo e inicializo con array vacio.

const movies = JSON.parse(fs.readFileSync(path, 'utf-8'))
// traigo el array de movies, parseo.

const movie1 = { title: 'hp1', place: 'hoyts' }
const movie2 = { title: 'hp2', place: 'hoyts' }
movies.push(movie1)
movies.push(movie2)
// pusheo la nueva movie (obj) al array.

const moviesString = JSON.stringify(movies, null, 4)
// segundo param es filtro (para solo guardar algo en especial), 3ro es identador (ordenador, define cantidad de margen entre el borde y el codigo.)

fs.writeFileSync(path, moviesString)
// stringyfeo para enviar

//  fs.unlinkSync(path)
// ojo! borra el archivo.