const { acceptedFormats } = require('../serializers');

module.exports = app => {
    app.use((req, res, next) => {
        let accept = req.header('Accept');
        if (accept === '*/*') {
            accept = 'application/json';
        }
    
        if (acceptedFormats.indexOf(accept) === -1) {
            res.status(406).end();
            return;
        }
        res.setHeader('Content-Type', accept);
        next();
    })
}
