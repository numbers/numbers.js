var assert = require('assert');
var numbers = require('../index.js');
var prime = numbers.prime;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Prime Number Mathematics\033[0m');

  //prime.simple
  test('should be able to determine if a number is prime or not', function(done) {
<<<<<<< HEAD
    assert.equal(false, prime.simple(1));
    assert.equal(true, prime.simple(2));
    assert.equal(true, prime.simple(17));
=======
    assert.equal(false, prime.simple(1), "1 should not be prime");
    assert.equal(true,  prime.simple(2), "2 should be prime");
    assert.equal(false, prime.simple(4), "4 should not be prime");
    assert.equal(true,  prime.simple(17), "17 should be prime");
    assert.equal(false, prime.simple(18), "18 should not be prime");
    assert.equal(false, prime.simple(25), "25 should not be prime");
    assert.equal(false, prime.simple(838), "838 should not be prime");
    assert.equal(true,  prime.simple(839), "839 should be prime");
    assert.equal(false, prime.simple(3007), "3007 should not be prime");
    assert.equal(true,  prime.simple(3733), "3733 should be prime");
    assert.equal(true,  prime.simple(999983), "999983 should be prime");
>>>>>>> sjkaliski/master
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
