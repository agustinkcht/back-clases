const fs = require("fs")
// llamamos a filesystem
const crypto = require("crypto")
// para generar id's de 12 bytes hexadecimales

class NotesManager {
    constructor() {
        this.path = '../files/notes.json'
        this.init()
    }
    init() {
        const exists = fs.existsSync(this.path)
        if (!exists) {
            const stringData = JSON.stringify([], null, 4)
            fs.writeFileSync(this.path, stringData)
            console.log('Archivo creado')
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
                const note = {
                    id: crypto.randomBytes(12).toString('hex'),
                    text: data.text,
                    date: data.date || new Date()
                };
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
    async read() {
        try {
            let allNotes = await fs.promises.readFile(this.path, 'utf-8')
            allNotes = JSON.parse(allNotes)
            console.log(allNotes)
            return allNotes
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
            throw (err)
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


const notes = new NotesManager();

// creamos entorno asincrono para ejecutar el create()

async function test() {
    try {
        const notes = new NotesManager();
        //notes.create({ text: 'mala fama' })
        //notes.read()
        //notes.readOne('3e20bfa6fdb1f8546f391769')
        //notes.destroyOne('e9ed751c3618ec0bc1f8d4e0')
    } catch (err) {
        console.log(err);
    }
};
test()