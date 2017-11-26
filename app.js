const express = require('express');

require('./database-connection')

const app = express();

const item = require('./routes/item');

app.use('/item', item);

module.exports = app;