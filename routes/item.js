const express = require('express');
const router = express.Router();

const ItemService = require('../services/item-service');

router.get('/', async (req, res, next) => {
    let items;
    if (Object.keys(req.query).length > 0) {
        items = await ItemService.find(req.query)
    } else {
        items = await ItemService.findAll()
    }

    if (!items) {
        res.status(404)
    }

    res.send(items)
});

router.get('/:id', async (req, res, next) => {
    const item = await ItemService.findById(req.params.id)
    if (!item) {
        res.status(404)
    }
    res.send(item)
})

router.post('/', async (req, res, next) => {
    const item = await ItemService.add(req.body);
    res.send(item)
});

router.post('/:id/quantity', async (req, res, next) => {
    const item = await ItemService.findById(req.params.id)
    item.quantity = req.body.quantity

    const updatedItem = await item.save()
    res.send(updatedItem)
});

module.exports = router;