const express = require('express');
const routes = require('./src/routes');

const app = express();

routes(app);

app.listen(3000, () => { 
    console.log('Server is running on port 3000');
});

module.exports = app;