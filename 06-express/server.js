import express from "express"
// importar modulos: myModule from "myModule"
// importar archivos: archivo from "/path"
import notesManager from "./data/fs/files/NotesManager.js"


const server = express()
// ejecuto modulo de express para crear servidor

const port = 8080
const ready = () => {
    console.log('server ready on port ' + port)
}
server.listen(port, ready)
// activo el server

//MIDDLEWARES
//intermediarios REQ y RES
server.use(express.urlencoded({ extended: true }))
// urlencoded permite leer datos complejos dentro de la url para manejarlos correctamente



//ROUTER
server.get('/', async(req, res)=>{
    try{
        return res.status(200).json({
            res: 'CODER API',
            success: true
        })

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            res: 'CODER API ERROR',
            success: false
        })
    };
})
// esta callback se ejecuta UNA SOLA VEZ, cuando el client accede.


// LEER NOTAS, CON FILTRO
// para ello query (?) los cuales son opcionales
server.get("/api/notes", async(req, res)=> {
    try {
        const { category } = req.query 
        const allNotes = await notesManager.read(category)
        if (allNotes) {
            return res.status(200).json({
                response: allNotes,
                category,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND")
            error.status = 404
            throw error
        }
        // si existe el array ALLNOTES hace lo primero, y si no lo encuentra generamos un error
    } catch(err) {
        console.log(err);
        return res.status(err.status).json({
            response: err.message,
            success: false
        })
    }
})
// query es opcional, por ello no se pasa como param o endpoint, para que solo funcione si se necesita.

//LEER UNA NOTA
server.get('/api/notes/:id', async(req, res) => {
    try {
        const { id } = req.params
        const selected = await notesManager.readOne(id)
        if (selected) {
            return res.status(200).json({
                response: selected,
                success: true
            });
        } else {
            const error = new Error('NOT FOUND')
            error.statusCode = 404;
            throw error;
        }
    } catch(err) {
        console.log(err);
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).json({
            response: err.message,
            success: false
        })
    }
})


// CREAR NOTAS
// preciso requerimientos text y category
server.get('/api/notes/:text/:category', async(req, res)=> {
    try {
        const { text, category } = req.params
        const data = { text, category}
        const newNote = await notesManager.create(data)
        // tengo habilitados los params del req
        return res.status(201).json({
            response: newNote,
            success: true
        })

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            response: 'ERROR',
            success: false
        })
    }
})




