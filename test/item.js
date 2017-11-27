import test from 'ava'
import request from 'supertest'

import { before, beforeEach, afterEach, after } from './utils'

test.before(before)
test.beforeEach(beforeEach)
test.afterEach.always(afterEach)

test('Get list of items', async t => {
    const { app } = t.context
    const itemToCreate = { name: 'Flour', quantity: 2 }

    const creation = await request(app)
        .post('/item')
        .send(itemToCreate)

    const res = await request(app)
        .get('/item')

    t.is(res.status, 200)
    t.true(Array.isArray(res.body))
    t.true(res.body.length > 0)
})

test('Create new item', async t => {
    const { app } = t.context
    const itemToCreate = { name: 'Flour', quantity: 2 }

    const res = await request(app)
        .post('/item')
        .send(itemToCreate)

    t.is(res.status, 200)
    t.is(res.body.name, itemToCreate.name)
    t.is(res.body.quantity, itemToCreate.quantity)
})

test('Fetch an item', async t => {
    const { app } = t.context

    const item = (await request(app)
        .post('/item')
        .send({ name: 'Flour', quantity: 2 }))
        .body

    const fetch = await request(app)
        .get(`/item/${item.id}`)

    t.is(fetch.status, 200)
    t.deepEqual(fetch.body, item)
})

test('Fetch an item queried name', async t => {
    const { app } = t.context

    const item = (await request(app)
        .post('/item')
        .send({ name: 'Salt', quantity: 2 }))
        .body

    const fetch = await request(app)
        .get(`/item?name=${item.name}`)

    t.is(fetch.status, 200)
    t.deepEqual(fetch.body, item)
})

test.todo('Update quantity')
test.todo('Delete an item')

test.after.always(after)