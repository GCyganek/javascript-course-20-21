/**
 * Represents an operation.
 * @constructor
 * @param {number} x - x parameter
 * @param {number} y - y parameter
 */

class Operation {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /** Function that returns a sum x and y parameters */
  sum() {
    return this.x + this.y;
  }
}

module.exports.Operation = Operation;

// dla ES6:
// export { Operation as default };
