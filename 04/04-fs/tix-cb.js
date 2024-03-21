const fs = require("fs")

const path = '../04-fs/tix2.json'
const content = JSON.stringify([], null, 4)
// lo inicializamos con array vacío, sin filtro, iden 4

fs.writeFile(path, content, (error)=> {
    if(error) {
        console.log(error)
    } else {
        console.log('Archivo Creado')
    }
})

fs.readFile(path, 'utf-8', (error, exito)=>{
    if(error) {
        console.log(error)
    } else {
        console.log('Se han encontrado películas')
        console.log(exito) 
    }
})
// ruta, utf, callback -> siempre es (error, exito)
// si existe error se muestra por consola
// en EXITO se guarda lo que logra leer


// fs.unlink(path, (error) => {
//     if(error) {
//         console.log(error)
//     } else {
//         console.log('eliminado')
//     }
// })