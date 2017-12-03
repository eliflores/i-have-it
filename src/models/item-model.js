const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0
    }
});

ItemSchema.plugin(AutoIncrement, {inc_field: 'id'});

const ItemModel = mongoose.model('Item', ItemSchema);

module.exports = ItemModel;