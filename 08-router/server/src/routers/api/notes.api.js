// enrutador del recurso, donde tengo tóda la lógica.

import { Router } from "express";
import notesManager from "../../data/fs/NotesManager.js"

const notesRouter = Router();


// routes 
notesRouter.get('/', read);
notesRouter.get('/:nid', readOne);
notesRouter.post('/', create);
notesRouter.put('/:nid', update);
notesRouter.delete('/:nid', destroy);
// cada método contiene el endpoint que ejecuta la función.


// functions lectura
async function read (req, res, next) { // request(elemento), response(Lo que voy a representar en la pág), next(middleware)
    try {
        const { category } = req.query;
        // desestructura category del request para poder pasarlo como argumento al ejecutar el read().
        const allNotes = await notesManager.read(category);
        // en variable allNotes se guarda el valor de ejecutar el método read sobre notesManager.
        if (allNotes) {
            return res.json({
                statusCode: 200,
                response: allNotes,
                category,
                success: true
            });
        } else {
            const error = new Error("NOT FOUND");
            error.status = 404;
            throw error;
        };
    } catch(err) {
        return next(err); // me ejecuta el middleware para los errores.
    };
}; // read es el nombre de la función, pero hasta que no se ejecuta el notesManager.read(), no se ejecuta el método del json.

async function readOne (req, res, next) {
    try {
        const { nid } = req.params;
        const selected = await notesManager.readOne(nid);
        if (selected) {
            return res.json({
                statusCode: 200,
                response: selected,
                success: true
            });
        } else {
            const error = new Error('NOT FOUND');
            error.statusCode = 404;
            throw error;
        };
    } catch(err) {
        return next(err);
    };
};

// functions create, update, destroy 
async function create (req, res, next) {
    try {
        const data = req.body
        // body= datos que envía el cliente, es el cuerpo de lo que se envía.
        const newNote = await notesManager.create(data)
        // ejecuto create del notes manager pasandole data como prop.
        return res.json({
            statusCode: 201,
            message: `Note created successfully with id + ${newNote.id}`
        }); // siempre tras realizar lo que el cliente pidió, enviamos respuesta
    } catch(err) {
        return next(err);
    };
};

async function update (req, res, next) {
    try {
        const { nid } = req.params;
        const data = req.body;
        // el cuerpo del request es la data a pasar
        const updatedNote = await notesManager.update(nid, data)
        return res.json({
            statusCode: 200,
            response: updatedNote,
            message: `Note with ID ${nid} updated successfully`
        });
    } catch(err) {
        return next(err);
    };
};

async function destroy (req, res, next) {
    try{
        const { nid } = req.params;
        const deletedNote = await notesManager.destroy(nid)
        return res.json({
            statusCode: 200,
            message: 'Note deleted successfully',
            response: deletedNote
        });
    } catch(err) {
        return next(err);
    };
};

export default notesRouter;