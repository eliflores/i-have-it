const express = require('express');
const router = express.Router();

const ItemService = require('../services/item-service');

router.get('/', async (req, res, next) => {
    const dummyItem = {name: 'Flour', quantity: 2};
    res.send([dummyItem]);
});

router.post('/', async (req, res, next) => {
    res.send(req.body);
});

module.exports = router