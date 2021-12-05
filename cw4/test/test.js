/*
  Mocha allows you to use any assertion library you wish. In this example, we are using the built-in module called 'assert'.
  If you prefer the 'chai' library (https://www.chaijs.com/) then you have to install it yourself: 'npm install chai --save-dev',
  and then you need to uncomment the lines below.
*/

// var expect = require('chai').expect;
var assert = require('assert');
var module = require('../module');

describe('The sum() method', function () {
  it('Returns 4 for 2+2', function () {
    var op = new module.Operation(2, 2);
    assert.strictEqual(op.sum(), 4)
    // expect(op.sum()).to.equal(4);
  });
  it('Returns 0 for -2+2', function () {
    var op = new module.Operation(-2, 2);
    assert.strictEqual(op.sum(), 0)
    // expect(op.sum()).to.equal(0);
  });
});