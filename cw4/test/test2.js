const assert = require('assert');
const check = require('../fs.js');

describe('Finds directories', () => {
  it('Finds test directory', () => {
    const result = check.checkString('test');
    assert.strictEqual(result, 'Given string is a directory name');
  });
});

describe('Finds files', () => {
  it('Finds for_test.txt file', () => {
    const result = check.checkString('for_test.txt');
    assert.strictEqual(result, 'Given string is a file and here is its content:\ncontent of file for test');
  });
});

describe('Does not find anything', () => {
  it('Does not find src', () => {
    const result = check.checkString('src');
    assert.strictEqual(result, 'No such file or directory in this directory.');
  });
  it('Does not find javascript', () => {
    const result = check.checkString('javascript');
    assert.strictEqual(result, 'No such file or directory in this directory.');
  });
});
