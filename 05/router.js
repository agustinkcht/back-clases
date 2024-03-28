const NotesManager = require('./data/fs/files/NotesManager.js')

const notes = new NotesManager()

async function router(req, res) {
    // depende de 2 params: requerimientos para funcionar, y respuesta para el client.
    // siempre refieren en ese orden, no importa el nombre que tengan.
    const url = req.url 
    // requerimiento.url
    const options = { "Content-Type" : "text/plain" }
    // decimos q la respuesta será en texto

    switch(url) {
        case '/':
            res.writeHead(200, options).end('API conectada')
            // wrthd para escribir los encabezamientos de la respuesta con codigo 200 y las opciones configuradas
            // asimismo paso un "end", un mensaje que se dará al concretar la conexión.
            break;
        case '/api/notes':
            const all = await notes.read() 
            // traigo las notes asincronamente
            res.writeHead(200, options).end(JSON.stringify(all))
            //res para respuesta al client
            break;
        default:
            res.writeHead(404, options).end('Ruta no encontrada')
            break;
    };
}

module.exports = router;
// exportamos (e importamos en el server)
