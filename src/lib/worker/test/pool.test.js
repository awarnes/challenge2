'use strict';

const Pool = require('..');
const path = require('path');

describe('pool/', () => {
  it('should create pool', async () => {
    const pool = new Pool({
      path: path.join(__dirname, '/worker.js')
    });

    return await pool.run({ test: 1 })
      .then((result) => {
        expect(result).toEqual('hello world');
        pool.close();
      });
  });

  it('should close pool', async () => {
    const pool = new Pool({
      path: path.join(__dirname, '/worker.js'),
      size: 1
    });

    return await Promise.all([
      pool.run({ test: 1 }),
      pool.run({ test: 2 }),
      pool.run({ test: 3 }),
      pool.run({ test: 4 })
    ])
      .then((result) => {
        expect(result).toEqual(['hello world', 'hello world', 'hello world', 'hello world']);
        pool.close();
      })
      .then(() => {
        expect(pool.poolLength()).toBe(0);
      });
  });

  it('should create new worker if error in worker', async () => {
    const pool = new Pool({
      path: path.join(__dirname, '/boom.js'),
      size: 1
    });

    return await pool.run({ test: 1 })
      .catch((err) => {
        expect(err.message).toBe('boooom');
        expect(pool.poolLength()).toBe(1);
        pool.close();
        expect(pool.poolLength()).toBe(0);
      });
  });

  it('should emit close', (done) => {
    const pool = new Pool({
      path: path.join(__dirname, '/boom.js'),
      size: 1
    });

    pool.on('close', done);
    pool.close();
  });

  it('should return queue length', (done) => {
    const pool = new Pool({
      path: path.join(__dirname, '/boom.js'),
      size: 1
    });

    expect(pool.queueLength()).toBe(0);

    pool.on('close', done);
    pool.close();
  });
});
