const fs = require("fs")
// llamamos a filesystem

const path = '../04-fs/tix3.json'
// creamos ruta

const content = JSON.stringify([{title: 'hp1'}, {title: 'hp2'}], null, 2)
// contenido para enviar... content, filter, idem

fs.promises
    .writeFile(path, content)
    .then(res => console.log(res))
    .catch(err => console.log(err))
// writear archivo


fs.promises
    .readFile(path, 'utf-8')
    .then(res => console.log(JSON.parse(res)))
    .catch(err => console.log(err))
// leer archivo


// fs.promises
//     .unlink(path)
//     .then(()=> console.log('se ha eliminado'))
//     .catch(err => console.log(err))