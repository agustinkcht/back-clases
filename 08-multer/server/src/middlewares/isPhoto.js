function isPhoto(req, res, next) {
    try {
        if(req.file) {
            req.body.photo = '/img/' + req.file.filename
        };
        return next();
    } catch(err) {
        return next(err);
    };
};

export default isPhoto;


