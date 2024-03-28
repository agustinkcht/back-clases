import fs from "fs";
import crypto from "crypto";


class NotesManager {
    // exportamos la class para manejarla en el router.
    constructor() {
        this.path = './data/fs/files/notes.json'
        this.init()
    }
    init() {
        const exists = fs.existsSync(this.path)
        if (!exists) {
            const stringData = JSON.stringify([], null, 4);
            fs.writeFileSync(this.path, stringData);
            console.log('Archivo creado');
        } else {
            console.log('Archivo localizado')
        } 
    }
    async create(data) {
        try {
            if (!data.text) {
                const error = new Error ('Ingrese Texto')
                throw error // para q lo agarre el catch
            } else {
                const note = { // creación nota
                    id: crypto.randomBytes(12).toString('hex'),
                    text: data.text,
                    category: data.category || 'to do',
                    date: data.date || new Date()
                }; // cargar nota a array
                let allNotes = await fs.promises.readFile(this.path, 'utf-8')
                    allNotes = JSON.parse(allNotes)
                    allNotes.push(note)
                    allNotes = JSON.stringify(allNotes, null, 4)
                    await fs.promises.writeFile(this.path, allNotes)
                    console.log('creado')
                    return note
            };

        } catch(err) {
            throw (err)
        };
    };
    async read(category = 'to do') {
        try {
            let allNotes = await fs.promises.readFile(this.path, 'utf-8')
            allNotes = JSON.parse(allNotes)
            allNotes = allNotes.filter(each => each.category === category)
            if(allNotes.length === 0) {
                return null
            } else {
                console.log(allNotes)
                return allNotes
            }
        } catch (err) {
            throw err
        };
    };
    async readOne(id) {
        try {
            let allNotes = await fs.promises.readFile(this.path, 'utf-8');
            allNotes = JSON.parse(allNotes)
            let selected = allNotes.find((each) => each.id === id)
            if(!selected) {
                throw new Error(`No existe nota con el id: ${id}`)
            } else {
                console.log(selected)
                return selected;
            };
        } catch (err) {
            throw err
        }; 
    };
    async destroyOne(id) {
        try {
            let allNotes = await fs.promises.readFile(this.path, 'utf-8');
            allNotes = JSON.parse(allNotes);
            let selected = allNotes.find((each) => each.id === id);
            if(!selected) {
                throw new Error(`No existe nota con el id: ${id}`)
            } else {
                let withoutSelected = allNotes.filter((each) => each.id !== id);
                    withoutSelected = JSON.stringify(withoutSelected, null, 4);
                    await fs.promises.writeFile(this.path, withoutSelected);
                    console.log('Nota eliminada');
                    console.log(withoutSelected);
                    return withoutSelected;
            };
        } catch (err) {
            throw (err)
        }; 
    };
};

const notesManager = new NotesManager()
export default notesManager



