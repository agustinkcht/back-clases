function isText(req, __res, next) {
    try {
        const { text } = req.body;
        if (!text) {
            const error = new Error('Insert text!');
            error.statusCode = 400;
            throw error;
        } else {
            return next();
            // next() permite continuar con el código
        };
    } catch(err) {
        return next(err)
    };
};

export default isText;

// el posible error lo catchea el error handler