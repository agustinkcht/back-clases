import Note from "./models/note.model.js";
import Manager from "./Manager.mongo.js";
// importo modelo y manager

const notesManager = new Manager(Note);
// en la instancia paso el modelo
export default notesManager;


