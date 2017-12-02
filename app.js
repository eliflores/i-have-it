const express = require('express');
const bodyParser = require('body-parser');
const item = require('./routes/item');

require('./database-connection');

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
});

app.use(bodyParser.json());

app.use('/item', item);

module.exports = app;
