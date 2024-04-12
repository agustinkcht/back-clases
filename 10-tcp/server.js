import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import morgan from 'morgan';
import { engine } from 'express-handlebars';

import indexRouter from './src/routers/index.router.js';
import socketCb from './src/routers/index.socket.js'
// metemos socket callback dentro de routers, pq es parecido
import errorHandler from './src/middlewares/errorHandler.js';
import notFoundHandler from './src/middlewares/notFoundHandler.js';
import __dirname from './utils.js';


const server = express();
const port = 8080;
const ready = () => {
    console.log(`Server running on port ${port}`)
};
const nodeServer = createServer(server);
// creo servidor de node con su metodo nativo, con las configuraciones del server de express.
// necesito crear un servidor de node porque en ello está basado el de TCP.
const socketServer = new Server(nodeServer);
// creo server de TCP construyendo una instacia de servidor de socket pasando como base el server de node.
socketServer.on('connection', socketCb);
// 2 argumentos: connection | llamado a socket callback
nodeServer.listen(port, ready);
// levanto el nodeServer en lugar del server express (funciona todo igual)



server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')


//middlewares (a nivel servidor)
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(morgan('dev'))

server.use('/', indexRouter);
server.use(errorHandler);
server.use(notFoundHandler);