var assert = require('assert');
var numeric = require('../index.js');
var prime = numeric.prime;

suite('numeric', function() {

  console.log('\n\n\033[34mTesting Prime Number Mathematics\033[0m');

  test('should be able to determine if a number is prime or not', function(done) {
    assert.equal(false, prime.simple(1));
    assert.equal(true, prime.simple(2));
    assert.equal(true, prime.simple(17));
    done()
  });

});
