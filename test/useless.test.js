var assert = require('assert');
var numeric = require('../index.js');
var useless = numeric.useless;

suite('numeric', function() {

  console.log('\n\n\033[34mTesting Useless Mathematics\033[0m');

  //numeric.useless.collatz
  test('collatz should populate the given array with a collatz sequence', function (done) {
    var result = [];
    useless.collatz(7, result);
    assert.equal([7,22,11,34,17,52,26,13,40,20,10,5,16,8,4,2,1].join(), result.join());
    done();
  });
});
