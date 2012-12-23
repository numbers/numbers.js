var assert = require('assert');
var numbers = require('../index.js');
var generate = numbers.generate;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Generators\033[0m');

  //numbers.generate.fibonacci
  test('Should generate the nth fibonacci number', function (done) {
    assert.equal(55, generate.fibonacci(10));
    assert.equal(12586269025, generate.fibonacci(50));
    assert.equal(14472334024676221, generate.fibonacci(79));
    done();
  });

  //numbers.useless.collatz
  test('collatz should populate the given array with a collatz sequence', function (done) {
    var result = [];
    generate.collatz(7, result);
    assert.equal([7,22,11,34,17,52,26,13,40,20,10,5,16,8,4,2,1].join(','), result.join(','));
    done();
  });

});
