import { Schema, model } from "mongoose";

const collection = 'users'
const schema = new Schema({
    email: { type: String, required: true, unique: true },
    age: { type: Number, default: 12 },
    photo: { type: String }
    // agregar default a photo... default: 'https://...'
}, {
    timestamps: true
})

const User = model(collection, schema)
export default User