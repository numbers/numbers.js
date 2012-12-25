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

    for (i = 0; i < composites.length; i++) {
      assert.equal(false, prime.simple(composites[i]), composites[i] + " should not be prime");
    }

    done();
  });

  // prime.millerRabin
  test('millerRabin should be able to determine if a number is prime or not', function(done) {
    for (var i = 0; i < primes.length; i++) {
      assert.equal(true, prime.millerRabin(primes[i]), primes[i] + " should be prime");  
    }

    for (i = 0; i < composites.length; i++) {
      assert.equal(false, prime.millerRabin(composites[i]), composites[i] + " should not be prime");
    }

    done();
  });

  // prime.sieve
  test('should be able to determine if a number is prime or not', function(done) {
    assert.deepEqual([], prime.sieve(1));
    assert.deepEqual([2], prime.sieve(2));
    assert.deepEqual([2, 3, 5, 7, 11, 13, 17], prime.sieve(17));
    
    done();
  });

  //prime.factorization when values < 2
  test("factorization should return an empty array for values < 2, infinite or not numeric", function (done) {
  	var func = prime.factorization;
		assert.deepEqual(func(Infinity), []);
		assert.deepEqual(func({}), []);
		assert.deepEqual(func(null), []);
		assert.deepEqual(func(-1), []);
		assert.deepEqual(func(0), []);
		assert.deepEqual(func(1), []);
		
    done();
	});

  //prime.factorization when 1 < values < infinity
	test("factorization should return the prime factors for x where 1 < x < infinity", function (done) {
		var func = prime.factorization;
		assert.deepEqual(func(2), [2]);
		assert.deepEqual(func(6), [2, 3]);
		assert.deepEqual(func(9), [3, 3]);
		assert.deepEqual(func("729"), [3, 3, 3, 3, 3, 3]);
		assert.deepEqual(func(3333333791), [2347, 1420253]);
		assert.deepEqual(func(123456789), [3, 3, 3607, 3803]);
		assert.deepEqual(func(9876543210), [2, 3, 3, 5, 17, 17, 379721]);
		assert.deepEqual(func("103103103"), [3, 103, 333667]);
		
    done();
	});

  test("coprime should determine if two integers are coprime or not", function(done) {
    assert.equal(true, prime.coprime(3, 4));
    assert.equal(true, prime.coprime(48, 65));
    assert.equal(false, prime.coprime(48, 64));
    
    done();
  });

  //prime.getPrimePower
  test('should find what the prime power of n is if it exists', function(done) {
    assert.deepEqual([2, 2], prime.getPrimePower(4));
    assert.equal(false, prime.getPrimePower(1));
    assert.deepEqual([3, 1], prime.getPrimePower(3));
    assert.deepEqual([3, 2], prime.getPrimePower(9));
    done();
  });

  //prime.getPerfectPower
  test('should find a perfect power of n is if it exists', function(done) {
    assert.deepEqual([2, 2], prime.getPerfectPower(4));
    assert.equal(false, prime.getPerfectPower(1));
    assert.equal(false, prime.getPerfectPower(3));
    assert.deepEqual([3, 2], prime.getPerfectPower(9));
    done();
  });

});
