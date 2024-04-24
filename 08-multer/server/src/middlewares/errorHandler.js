function errorHandler(error, _req, res, _next) {
    console.log(error)
    return res.json({
        statusCode: error.statusCode || 500,
        message: error.message || 'API Error'
    });
};
// toma el err (que se catchea en el catch), y la response (RESPONSE ES LA RESPUESTA A DAR A LA PÁGINA.)
// se retorna el statusCode del error generado, o por defecto 500
// se retorna el mensaje que configuré, o por defecto "api error."

export default errorHandler;