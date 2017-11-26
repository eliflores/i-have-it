const express = require('express');
const bodyParser = require('body-parser')

require('./database-connection');

const app = express();

app.use(bodyParser.json());

const item = require('./routes/item');

app.use('/item', item);

module.exports = app;