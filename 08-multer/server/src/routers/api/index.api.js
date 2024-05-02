//enrutador principal de la api, donde derivan notes.api y users.api, y este va a index.router
import { Router } from "express"; //express
import notesRouter from "./notes.api.js"; //ruta inferior 1
import usersRouter from "./users.api.js"; //ruta inferior 2

const apiRouter = Router() // inicializo

apiRouter.use("/notes", notesRouter) // conecto
apiRouter.use("/users", usersRouter)

export default apiRouter; // exporto

