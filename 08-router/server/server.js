import express from 'express';
import indexRouter from './src/routers/index.router.js';
import errorHandler from './src/middlewares/errorHandler.js';
import noteFoundHandler from './src/middlewares/notFoundHandler.js';

const server = express();
const port = 8080;
const ready = () => {
    console.log(`Server running on port ${port}`);
};
server.listen(port, ready);


//middlewares
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
//para q funcionen req.params/query/body...

// quitamos responsabilidad al server.js utilizando el modulo Router para generar enrutadores.
// ENRUTADORES: formas de manejar las rutas enfocada en los recursos. (recursos: notesManager, userManager, etc.)

//endpoints-routers
server.use("/", indexRouter)
server.use(errorHandler)
server.use(noteFoundHandler)

