import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
//se utiliza para identificar la ruta absoluta de un modulo o carpeta.
// En este caso, me da la ruta absoluta de la carpeta 09-hbs.

export default __dirname