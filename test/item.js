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

test('Fetch items queried name', async t => {
    const { app } = t.context

    const item = (await request(app)
        .post('/item')
        .send({ name: 'Salt', quantity: 2 }))
        .body

    const fetch = await request(app)
        .get(`/item?name=${item.name}`)

    t.is(fetch.status, 200)
    t.true(Array.isArray(fetch.body))
    t.is(fetch.body.length, 1)
    t.deepEqual(fetch.body[0], item)
})

test('Fetch an items queried name when item does not exist', async t => {
    const { app } = t.context

    const item = (await request(app)
        .post('/item')
        .send({ name: 'Butter', quantity: 2 }))
        .body

    const fetch = await request(app)
        .get(`/item?name=chocolate`)

    t.is(fetch.status, 200)
    t.true(Array.isArray(fetch.body))
    t.is(fetch.body.length, 0)
})

test('Update quantity', async t => {
    const { app } = t.context

    const item = (await request(app)
        .post('/item')
        .send({ name: 'Peper', quantity: 2 }))
        .body

    const updatedItem = (await request(app)
        .post(`/item/${item.id}/quantity`)
        .send({ quantity: 1 }))
        .body

    const fetch = await request(app)
        .get(`/item/${item.id}`)

    t.is(fetch.status, 200)
    t.deepEqual(fetch.body, updatedItem)
})

test('Delete an item', async t => {
    t.plan(3)

    const { app } = t.context

    const item = (await request(app)
        .post('/item')
        .send({ name: 'Peper', quantity: 2 }))
        .body

    const del = await request(app)
        .delete(`/item/${item.id}`)

    t.is(del.status, 200)
    t.is(del.text, 'OK!')

    const fetch = await request(app)
        .get(`/item/${item.id}`)

    t.is(fetch.status, 404)
})

test.after.always(after)