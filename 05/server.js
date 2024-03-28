const http = require("http")
const router = require('./router.js')
const server = http.createServer(router)
const port = 8080
// para estandarizar usamos 8080
const ready = () => console.log(`server ready on port ${port}`)
// callback que informa q el server está funcionando

server.listen(port, ready)
// cuando empieza a funcionar? cuando lo inicio con el metodo listen, en el port x, y cuando termino de ejecutar la callback ready.