import express from "express"
import notesManager from "./data/fs/files/NotesManager.js";



//server
const server = express();
const port = 8080;
const ready = () => {
    console.log(`Server running on port ${port}`)
}
server.listen(port, ready)

//middlewares
server.use(express.urlencoded({ extended: true }))
server.use(express.json())


//router

server.get('/', (req, res) => {
    try {
        return res.json({
            statusCode: 200,
            message: 'Api Connected Successfullys'
        });
    } catch(err) {
        return res.json({
            statusCode: 500,
            message: 'Error reaching app'
        });
    };
});


// LEER NOTAS, CON FILTRO
server.get("/api/notes", async(req, res)=> {
    try {
        const { category } = req.query;
        const allNotes = await notesManager.read(category);
        if (allNotes) {
            return res.status(200).json({
                response: allNotes,
                category,
                success: true
            });
        } else {
            const error = new Error("NOT FOUND")
            error.status = 404
            throw error
        };
    } catch(err) {
        console.log(err);
        return res.status(err.status).json({
            response: err.message,
            success: false
        });
    };
});


//LEER UNA NOTA
server.get('/api/notes/:nid', async(req, res) => {
    try {
        const { nid } = req.params;
        const selected = await notesManager.readOne(nid);
        if (selected) {
            return res.status(200).json({
                response: selected,
                success: true
            });
        } else {
            const error = new Error('NOT FOUND')
            error.statusCode = 404;
            throw error;
        };
    } catch(err) {
        console.log(err);
        const statusCode = err.statusCode || 500;
        return res.status(statusCode).json({
            response: err.message,
            success: false
        });
    };
});

const create = async(req, res) => {
    try {
        const data = req.body
        // body= datos que envía el cliente, es el cuerpo de lo que se envía.
        const newNote = await notesManager.create(data)
        return res.json({
            statusCode: 201,
            message: `Note created successfully with id + ${newNote.id}`
        }); // siempre tras realizar lo que el cliente pidió, enviamos respuesta
    } catch(err) {
        return res.json({
            statusCode: err.statusCode || 500,
            message: err.message || 'Error reaching app'
        });
    };
};

const update = async(req, res) => {
    try {
        const { nid } = req.params;
        const data = req.body;
        // el cuerpo del request es la data a pasar
        const selected = await notesManager.update(nid, data)
        return res.json({
            statusCode: 200,
            response: selected,
            message: `Note with ID ${nid} updated successfully`
        });
    } catch(err) {
        return res.json({
            statusCode: err.statusCode || 500,
            message: err.message || 'Error reaching app'
        });
        // si el status code y el mensaje ya vienen armados del constructor de errores del método en el NotesManager.js, se pasan acá... sino, va por defecto hardcodeado.
    };
};

const destroy = async(req, res) => {
    try{
        const { nid } = req.params;
        const selected = await notesManager.destroy(nid)
        return res.json({
            statusCode: 200,
            message: 'Note deleted successfully',
            response: selected
        });
    } catch(err) {
        return res.json({
            statusCode: err.statusCode || 500,
            message: err.message || 'Error reaching app'
        });
    };
};

server.post('/api/notes', create)
// create, en lugar de definir la función dentro de la callback que se introduce acá, lo defino por fuera.
server.put('/api/notes/:nid', update)
server.delete('/api/notes/:nid', destroy)