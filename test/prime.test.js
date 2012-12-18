var assert = require('assert');
var numbers = require('../index.js');
var prime = numbers.prime;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Prime Number Mathematics\033[0m');

  test('should be able to determine if a number is prime or not', function(done) {
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
    done();
  });

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
	test("factorization should return the prime factors for x where 1 < x < Infinity", function (done) {
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

});
