import { Router } from "express"; // router express
import apiRouter from "./api/index.api.js"
// importo la ruta(s) que derivan acá.

const indexRouter = Router(); 
// inicializo indexRouter

indexRouter.use("/api", apiRouter)
// conecto con la ruta q deriva en él.

export default indexRouter;
// exporto(para importar en server.)

