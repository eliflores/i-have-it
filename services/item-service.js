const ItemModel = require('../models/item-model');

async function findAll() {
    return ItemModel.find();
}

async function add(item) {
    return ItemModel.create(item);
}

module.exports = {
    findAll,
    add
};