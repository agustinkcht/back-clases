import { Schema, model } from "mongoose";

const collection = 'notes';

const schema = new Schema({
    text: { type: String, required: true },
    category: { type: String, default: 'to do', enum: ['to do', 'done'] },
}, 
{
    timestamps: true
}
);

const Note = model(collection, schema)

export default Note;
