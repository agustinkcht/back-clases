import express from 'express';
import indexRouter from './src/routers/index.router.js';
import errorHandler from './src/middlewares/errorHandler.js';
import notFoundHandler from './src/middlewares/notFoundHandler.js';

const server = express();
const port = 8080;
const ready = () => {
    console.log(`Server running on port ${port}`);
};
server.listen(port, ready);


//middlewares
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static('public')); // public
server.use('/webpage', express.static('webpage'))  // otra estatica


//endpoints-routers
server.use("/", indexRouter) 
server.use(errorHandler)
server.use(notFoundHandler)
