import test from 'ava'
import request from 'supertest'
import MongodbMemoryServer from 'mongodb-memory-server'
import mongoose from 'mongoose'

import app from '../app'
import ItemModel from '../models/item-model'

const mongod = new MongodbMemoryServer();

test.before(async () => {
	const uri = await mongod.getConnectionString();
	await mongoose.connect(uri, {useMongoClient: true});
});

test('Get list of items', async t => {
    const itemToCreate = { name: 'Flour', quantity: 2 };

    const creation = await request(app)
        .post('/item')
        .send(itemToCreate);

    const res = await request(app)
        .get('/item');

    t.is(res.status, 200);
    t.true(Array.isArray(res.body));
    t.true(res.body.length > 0);
});

test.afterEach.always(() => ItemModel.remove());