import { Router } from "express";
import notesViewRouter from "./notes.view.js";
import usersViewRouter from "./users.view.js";

// enrutador principal de los views

const viewsRouter = Router();

viewsRouter.use('/notes', notesViewRouter);
viewsRouter.use('/users', usersViewRouter);
viewsRouter.get('/', (req, res, next) => {
    try {
        return res.render("index", { title: 'Home' });
        // el motor de hbs busca index dentro de la carpeta views, con la extensión configurada.
    } catch(err) {
        return next(err);
    };
});

export default viewsRouter;