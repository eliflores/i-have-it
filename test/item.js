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

test.todo('Create new item')
test.todo('Fetch an item')
test.todo('Fetch an item by name')
test.todo('Update quantity')
test.todo('Delete an item')

test.after.always(after)