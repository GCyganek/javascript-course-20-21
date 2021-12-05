const operationModule = require('./module');
// nie jest możliwe utworzenie obiektu przed definicją klasy
const x = parseInt(process.argv[2], 10);
const y = parseInt(process.argv[3], 10);
const operation = new operationModule.Operation(x, y);
console.log(operation.sum());

// dla ES6:
// import Operation from './module';
// const operation = new Operation(4, 2);
// console.log(operation.sum());
// // node --experimiental-modules index.mjs
