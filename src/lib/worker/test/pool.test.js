'use strict'

const t = require('tap')
const test = t.test
const Pool = require('..')
const path = require('path')

test('should create pool', (t) => {
  t.plan(2)
  const pool = new Pool({
    path: path.join(__dirname, '/worker.js')
  })

  return pool.run({ test: 1 })
    .then((result) => {
      t.equal(result, 'hello world')
      pool.close()
    })
    .then(() => t.pass())
})

test('should close pool', (t) => {
  t.plan(2)
  const pool = new Pool({
    path: path.join(__dirname, '/worker.js'),
    size: 1
  })

  return Promise.all([
    pool.run({ test: 1 }),
    pool.run({ test: 2 }),
    pool.run({ test: 3 }),
    pool.run({ test: 4 })
  ])
    .then((result) => {
      t.same(result, ['hello world', 'hello world', 'hello world', 'hello world'])
      pool.close()
    })
    .then(() => {
      t.equal(pool.poolLength(), 0)
    })
})

test('should create new worker if error in worker', (t) => {
  t.plan(3)
  const pool = new Pool({
    path: path.join(__dirname, '/boom.js'),
    size: 1
  })

  return pool.run({ test: 1 })
    .catch((err) => {
      t.equal(err.message, 'boooom')
      t.equal(pool.poolLength(), 1)
      pool.close()
      t.equal(pool.poolLength(), 0)
    })
})

test('should emit close', (t) => {
  t.plan(1)
  const pool = new Pool({
    path: path.join(__dirname, '/boom.js'),
    size: 1
  })

  pool.on('close', () => t.pass('close emitted'))
  pool.close()
})

test('should return queue length', (t) => {
  t.plan(2)
  const pool = new Pool({
    path: path.join(__dirname, '/boom.js'),
    size: 1
  })

  t.equal(pool.queueLength(), 0)
  pool.on('close', () => t.pass('close emitted'))
  pool.close()
})