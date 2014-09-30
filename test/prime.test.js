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
      assert.equal(prime.simple(primes[i]), true);  
    }

    for (i = 0; i < composites.length; i++) {
      assert.equal(prime.simple(composites[i]), false);
    }

    done();
  });

  // prime.millerRabin
  test('millerRabin should be able to determine if a number is prime or not', function(done) {
    for (var i = 0; i < primes.length; i++) {
      assert.equal(prime.millerRabin(primes[i]), true);  
    }

    for (i = 0; i < composites.length; i++) {
      assert.equal(prime.millerRabin(composites[i]), false);
    }

    done();
  });

  // prime.sieve
  test('should be able to determine if a number is prime or not', function(done) {
    assert.deepEqual(prime.sieve(1), []);
    assert.deepEqual(prime.sieve(2), [2]);
    assert.deepEqual(prime.sieve(17), [ 2, 3, 5, 7, 11, 13, 17 ]);
    
    done();
  });

  //prime.factorization when values < 2
  test("factorization should return an empty array for values < 2, infinite or not numeric", function (done) {
  	var func = prime.factorization;
		assert.deepEqual([], func(Infinity));
		assert.deepEqual([], func({}));
		assert.deepEqual([], func(null));
		assert.deepEqual([], func(-1));
		assert.deepEqual([], func(0));
		assert.deepEqual([], func(1));
		
    done();
	});

  //prime.factorization when 1 < values < infinity
	test("factorization should return the prime factors for x where 1 < x < infinity", function (done) {
		var func = prime.factorization;
		assert.deepEqual([2], func(2));
		assert.deepEqual([ 2, 3 ], func(6));
		assert.deepEqual([ 3, 3 ], func(9));
		assert.deepEqual([ 3, 3, 3, 3, 3, 3 ], func('729'));
		assert.deepEqual([ 2347, 1420253 ], func(3333333791));
		assert.deepEqual([ 3, 3, 3607, 3803 ], func(123456789));
		assert.deepEqual([ 2, 3, 3, 5, 17, 17, 379721 ], func(9876543210));
		assert.deepEqual([ 3, 103, 333667 ], func('103103103'));
		
    done();
	});

  test("coprime should determine if two integers are coprime or not", function(done) {
    assert.equal(prime.coprime(3, 4), true);
    assert.equal(prime.coprime(48, 65), true);
    assert.equal(prime.coprime(48, 64), false);
    
    done();
  });

  //prime.getPrimePower
  test('should find what the prime power of n is if it exists', function(done) {
    assert.deepEqual(prime.getPrimePower(4), [ 2, 2 ]);
    assert.equal(prime.getPrimePower(1), false);
    assert.deepEqual(prime.getPrimePower(3), [ 3, 1 ]);
    assert.deepEqual(prime.getPrimePower(9), [ 3, 2 ]);
    done();
  });

  //prime.getPerfectPower
  test('should find a perfect power of n is if it exists', function(done) {
    assert.deepEqual(prime.getPerfectPower(4), [ 2, 2 ]);
    assert.equal(prime.getPerfectPower(1), false);
    assert.equal(prime.getPerfectPower(3), false);
    assert.deepEqual(prime.getPerfectPower(9), [ 3, 2 ]);
    done();
  });

});
