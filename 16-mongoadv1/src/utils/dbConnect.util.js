import { connect } from "mongoose";

// connect siempre devuelve promesa

async function dbConnect() {
    try {
        await connect(process.env.MONGO_URI)
        console.log('Connected to Mongo database')
    } catch(error) {
        console.log(error)
    };
};

export default dbConnect;

// esta function no es parte del request, por ende no usamos next