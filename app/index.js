const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.get('/', async (req, res, next) => {
    res.render(`index`);
});

app.listen(3000, () => {
    console.log('Server listening.');
});