const { NotFoundError, DataNotProvidedError } = require('../errors');
const ErrorSerializer = require('../serializers/ErrorSerializer');

module.exports = app => {
    app.use((error, req, res, next) => {
        let status = 500;
        if(error instanceof NotFoundError) {
            status = 404;
        }
        if (error instanceof DataNotProvidedError) {
            status = 400;
        }
        res.status(status).send(
            new ErrorSerializer(res.getHeader('Content-Type')).serialize({
                message: error.message,
                idError: error.idError
            })
        );
    });
}
