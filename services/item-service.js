const ItemModel = require('../models/item-model');

async function findAll() {
    return ItemModel.find();
}

async function add(item) {
    return ItemModel.create(item);
}

async function find(id) {
    return ItemModel.findOne({ id })
}

module.exports = {
    findAll,
    find,
    add
};