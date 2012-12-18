var assert = require('assert');
var numbers = require('../index.js');
var prime = numbers.prime;

suite('numbers', function() {
  var primes = [2, 17, 839, 3733, 999983];
  var composites = [1, 4, 18, 25, 838, 3007];
  var primality_tests = ['simple', 'millerRabin', 'AKS'];

  console.log('\n\n\033[34mTesting Prime Number Mathematics\033[0m');

  for (var i = 0; i < primality_tests.length; i++) {
    test('should be able to determine if a number is prime or not', function(done) {
      for (var j = 0; j < primes.length; j++) {
        assert.equal(true, prime[primality_tests[i]](primes[j]), primes[j] + " should not be prime");  
      }
      for (var j = 0; j < composites.length; j++) {
        assert.equal(false, prime[primality_tests[i]](composites[j]), composites[j] + " should not be prime");
      }
      done();
    });
  }

  //prime.isPrimePower

  //prime.isPerfectPower

  //prime.factorization

  //prime.sieve
  test('should return with array of primes up to that number', function(done) {
 
    assert.deepEqual([], prime.sieve(1));
    assert.deepEqual([2], prime.sieve(2));
    assert.deepEqual([2,3,5,7,11,13,17], prime.sieve(17));
    done();
  });



});
