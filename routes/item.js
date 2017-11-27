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

router.get('/:id/json', async (req, res, next) => {
    const item = await ItemService.find(req.params.id)
    if (!item) {
        res.status(404)
    }
    res.send(item)
})

module.exports = router;