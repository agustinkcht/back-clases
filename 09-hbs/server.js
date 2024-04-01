import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
//importo motor de handlebar

import indexRouter from './src/routers/index.router.js';
import errorHandler from './src/middlewares/errorHandler.js';
import notFoundHandler from './src/middlewares/notFoundHandler.js';
import __dirname from './utils.js';


const server = express();
const port = 8080;
const ready = () => {
    console.log(`Server running on port ${port}`)
};
server.listen(port, ready);

//inicializo motor handlebars.
server.engine('handlebars', engine())
//('tipo de motor', motor importado)
server.set('view engine', 'handlebars')
//('viewengine', 'motor elegido')
server.set('views', __dirname + '/src/views')
// ('carpeta views', ruta absoluta + views)

//middlewares (a nivel servidor)
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(morgan('dev'))

server.use('/', indexRouter);
server.use(errorHandler);
server.use(notFoundHandler);