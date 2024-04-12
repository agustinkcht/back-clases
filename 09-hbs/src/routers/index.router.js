import { Router } from "express";
import apiRouter from "./api/index.api.js"
import viewsRouter from "./views/index.view.js";

const indexRouter = Router();

indexRouter.use("/api", apiRouter);
// rutas de funcionalidad
indexRouter.use("/", viewsRouter);
// vistas

export default indexRouter;