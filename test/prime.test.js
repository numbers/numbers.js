var assert = require('assert');
var numbers = require('../index.js');
var prime = numbers.prime;

suite('numbers', function() {
  var primes = [2, 17, 839, 3733, 999983];
  var composites = [1, 4, 18, 25, 838, 3007];
  
  console.log('\n\n\033[34mTesting Prime Number Mathematics\033[0m');

  // prime.simple
  test('simple should be able to determine if a number is prime or not', function(done) {
      for (var i = 0; i < primes.length; i++) {
        assert.equal(true, prime.simple(primes[i]), primes[i] + " should be prime");  
      }
      for (var i = 0; i < composites.length; i++) {
        assert.equal(false, prime.simple(composites[i]), composites[i] + " should not be prime");
      }
      done();
  });

  // prime.millerRabin
  test('millerRabin should be able to determine if a number is prime or not', function(done) {
      for (var i = 0; i < primes.length; i++) {
        assert.equal(true, prime.millerRabin(primes[i]), primes[i] + " should be prime");  
      }
      for (var i = 0; i < composites.length; i++) {
        assert.equal(false, prime.millerRabin(composites[i]), composites[i] + " should not be prime");
      }
      done();
  });

  // prime.sieve
  test('should be able to determine if a number is prime or not', function(done) {
    assert.deepEqual([], prime.sieve(1));
    assert.deepEqual([2], prime.sieve(2));
    assert.deepEqual([2,3,5,7,11,13,17], prime.sieve(17));
    done();
  });

});