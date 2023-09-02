const express = require('express');


const app = express();

// Middlewares
require('./src/middlewares/content-type')(app);

// Routes
require('./src/routes')(app);

// Middlewares
require('./src/middlewares/errors')(app);

app.listen(3000, () => { 
    console.log('Server is running on port 3000');
});

module.exports = app;