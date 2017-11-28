const ItemModel = require('../models/item-model');

async function findAll() {
    return ItemModel.find();
}

async function findById(id) {
    return ItemModel.findOne({ id })
}

async function find(query) {
    if (query.name) {
        return ItemModel.findOne({ name: query.name })
    }
}

async function add(item) {
    return ItemModel.create(item);
}

async function del(id) {
    return ItemModel.remove({ id })
}

module.exports = {
    findAll,
    findById,
    find,
    add,
    del
};