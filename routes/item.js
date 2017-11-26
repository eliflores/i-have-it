const express = require('express');
const router = express.Router();

const ItemService = require('../services/item-service');

router.get('/', async (req, res, next) => {
    const items = await ItemService.findAll();
    res.send(items);
});

router.post('/', async (req, res, next) => {
    const item = await ItemService.add(req.body);
    res.send(item);
});

module.exports = router;