var assert = require('assert');
var numbers = require('../index.js');
var prime = numbers.prime;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Prime Number Mathematics\033[0m');

  //prime.simple
  test('should be able to determine if a number is prime or not', function(done) {
    assert.equal(false, prime.simple(1));
    assert.equal(true, prime.simple(2));
    assert.equal(true, prime.simple(17));
    done();
  });

  //prime.millerRabin
  test('should be able to determine if a number is prime or not', function(done) {
    assert.equal(false, prime.millerRabin(1));
    assert.equal(true, prime.millerRabin(2));
    assert.equal(true, prime.millerRabin(17));
    assert.equal(false, prime.millerRabin(27));
    done();
  });

  //prime.sieve
  test('should be able to determine if a number is prime or not', function(done) {
    assert.deepEqual([], prime.sieve(1));
    assert.deepEqual([2], prime.sieve(2));
    assert.deepEqual([2,3,5,7,11,13,17], prime.sieve(17));
    done();
  });
});
