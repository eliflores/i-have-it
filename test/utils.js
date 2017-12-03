const MongodbMemoryServer =  require('mongodb-memory-server').default
const mongoose = require('mongoose')

const app = require('../src/app')
const ItemModel = require('../src/models/item-model')

const mongod = new MongodbMemoryServer()

async function before(t) {
    mongoose.connect(await mongod.getConnectionString(), { useMongoClient: true })
}

async function beforeEach(t) {
    t.context.app = app
}

async function afterEach(t) {
    ItemModel.remove()
}

async function after(t) {
    mongoose.disconnect()
    mongod.stop()
}

module.exports = {
    before,
    beforeEach,
    afterEach,
    after
}
