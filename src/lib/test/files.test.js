'use strict';

const fs = require('fs');
const path = require('path');
const { FILE_NOT_FOUND_ERROR } = require('../errors/error-codes');
const ShipRouteError = require('../errors/ship-route-error');
const { readData, writeData } = require('../files');

describe('files/', () => {
  describe('readData/', () => {
    it('readsData from a relative file', () => {
      expect(readData('.gitignore')).toEqual(['.DS_Store', 'node_modules/', 'coverage/']);
    });

    it('readsData from an explicit file path', () => {
      expect(readData(path.join(__dirname, 'testData.txt'), false))
        .toEqual(['Hello', 'second line']);
    });

    it('throws an error when a number is passed', () => {
      try {
        readData(path.join(__dirname, 'torstDerter.txt'), false);
      } catch (err) {
        expect(err).toBeInstanceOf(ShipRouteError);
        expect(err.code).toBe(FILE_NOT_FOUND_ERROR);
        expect(err.message).toBe(`[${path.join(__dirname, 'torstDerter.txt')}] file not found!`);
      }
    });
  });

  describe('writeData/', () => {
    const filePath = path.join(process.cwd(), 'test.data');

    afterEach(() => {
      fs.rmSync(filePath);
    });

    it('writes data to a relative file', () => {
      writeData(filePath, ['hello', 'line two!']);
      expect(fs.existsSync(filePath)).toEqual(true);
      expect(readData(filePath, false)).toEqual(['hello', 'line two!']);
    });
  });
});