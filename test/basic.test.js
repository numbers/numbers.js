var assert = require('assert');
var numbers = require('../index.js');
var basic = numbers.basic;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Standard Mathematics\033[0m');

  // basic.sum
  test('sum should return the sum of items in an array', function (done) {
    assert.equal(6, basic.sum([0, 1, 2, 3]));
    assert.equal(0, basic.sum([0, -3, 5, -2]));
    done();
  });

  test('sum should throw an exception when given anything but an array', function (done) {
    assert.throws(
      function() {
        basic.sum(1);
      },
      /Input must be of type Array/
    );
    done();
  });

  test('sum should throw an exception when given anything objects other than numbers', function (done) {
    assert.throws(
      function() {
        basic.sum([1, 2, "error"]);
      },
      /All elements in array must be numbers/
    );
    done();
  });

  // basic.substraction
  test('subtraction should return the difference of items in an array', function (done) {
    assert.equal(2, basic.subtraction([5, 3, 1, -1]));
    done();
  });

  test('subtraction should throw an exception when given anything but an array', function (done) {
    assert.throws(
      function() {
        basic.subtraction(1);
      },
      /Input must be of type Array/
    );
    done();
  });

  test('subtraction should throw an exception when given anything objects other than numbers', function (done) {
    assert.throws(
      function() {
        basic.subtraction(["test", 1, 1, 2]);
      },
      /All elements in array must be numbers/
    );
    done();
  });

  test('subtraction should throw an exception last element is not a number', function (done) {
    assert.throws(
      function() {
        basic.subtraction([1, 1, 2, "test"]);
      },
      /All elements in array must be numbers/
    );
    done();
  });

  // basic.product
  test('product should return the product of items in an array', function (done) {
    assert.equal(24, basic.product([1, 2, 3, 4]));
    assert.equal(-6, basic.product([-3, 2]));
    done();
  });

  test('product should throw an exception when given anything but an array', function (done) {
    assert.throws(
      function() {
        basic.product(1);
      },
      /Input must be of type Array/
    );
    done();
  });

  test('product should throw an exception when given anything objects other than numbers', function (done) {
    assert.throws(
      function() {
        basic.product([1, 2, "error"]);
      },
      /All elements in array must be numbers/
    );
    done();
  });

  test('product should throw an exception when given anything objects other than numbers', function (done) {
    assert.throws(
      function() {
        basic.product(["error", 1, 2]);
      },
      /All elements in array must be numbers/
    );
    done();
  });

  test('square should return the square of a number', function(done) {
    assert.equal(16, basic.square(4));
    done();
  });

  // basic.binomial
  test('binomial should return the binomial coefficient (n choose k) of two numbers', function(done) {
    assert.equal(10, basic.binomial(5, 3));
    done();
  });

  // basic.factorial
  test('factorial should return the product of n * (n - 1) * (n - 2) * ... * 1', function (done) {
    assert.equal(24, basic.factorial(4));
    assert.equal(120, basic.factorial(5));
    done();
  });

  // basic.gcd
  test('gcd should throw an exception when given a decimal', function (done) {
    assert.throws(
      function() {
        basic.gcd(0.2,1);
      },
      /Can only operate on integers/
    );
    done();
  });
  test('gcd should return the greatest common denominator of two integers', function (done) {
    assert.equal(1254, basic.gcd(1254, 0));
    assert.equal(5298, basic.gcd(0, -5298));
    assert.equal(Infinity, basic.gcd(0, -Infinity));
    assert.equal(Infinity, basic.gcd(4430, -Infinity));
    assert.equal(6, basic.gcd(-1254, -5298));
    assert.equal(6, basic.gcd(1254, 5298));
    assert.equal(1, basic.gcd(78699786, 78978965));
    done();
  });

  // basic.lcm
  test('lcm should return the least common multiple of two integers', function (done) {
    assert.equal(0, basic.lcm(4, 0));
    assert.equal(0, basic.lcm(0, 4));
    assert.equal(true, isNaN(basic.lcm(4, Infinity)));
    assert.equal(true, isNaN(basic.lcm(Infinity, 4)));
    assert.equal(20, basic.lcm(4, 5));
    assert.equal(12, basic.lcm(3, 4));
    assert.equal(12, basic.lcm(4, 6));
    assert.equal(42, basic.lcm(21, 6));
    assert.equal(240, basic.lcm(12, 80));
    done();
  });

  // basic.max
  test('max should return the biggest number in an array', function (done) {
    assert.equal(42, basic.max([1,2,3,42]));
    done();
  });

  // basic.min
  test('min should return the smallest number in an array', function (done) {
    assert.equal(1, basic.min([2,1,3,42]));
    done();
  });

  // basic.range
  test('range should return an appropriate range for the given start, stop, and step parameters', function (done) {
    assert.deepEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10],basic.range(1, 10));
    assert.deepEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1],basic.range(10, 1));
    assert.deepEqual([1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],basic.range(1, 5, 0.5));
    assert.deepEqual([5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1],basic.range(5, 1, 0.5));
    done();
 
  });

  // basic.isInt
  test('isInt checks for an integer', function (done) {
    assert.equal(false, basic.isInt(2.32));
    assert.equal(false, basic.isInt("true"));
    assert.equal(true, basic.isInt("2")); //based off impelementation change
    assert.equal(true, basic.isInt(2));
    done();
  });  

  // basic.divMod
  test('divMod should return an array of both the division and modulus values of two integers', function (done) {
    assert.deepEqual([2, 0], basic.divMod(12, 6));
    assert.deepEqual([3, 1], basic.divMod(10, 3)); 
    done();
  });

  // basic.egcd
  test('egcd should return the array [a, x, y] which is the solved linear equation for GCD', function(done) {
    assert.deepEqual([5, -3, 5], basic.egcd(65, 40));
    assert.deepEqual([5, 5, -3], basic.egcd(40, 65));
    assert.deepEqual([21, -16, 27], basic.egcd(1239, 735));
    assert.deepEqual([21, 5, -2], basic.egcd(105, 252));
    assert.deepEqual([21, -2, 5], basic.egcd(252, 105));
    done();
  });

  // basic.modInverse
  test('modInverse will return the modulo m inverse of a', function(done) {
    assert.equal(1, basic.modInverse(1, 5));
    done();
  });

  test('modInverse will throw an exception if no modular inverse exists', function(done) {
    assert.throws(
      function() {
        basic.modInverse(65, 40);
      },
      /No modular inverse exists/
    );
    done();
  });

  // basic.powerMod
  test('powerMod should return the answer to a^b mod m', function (done) {
    assert.equal(1, basic.powerMod(1, -1, 5));
    assert.equal(1, basic.powerMod(2, 10, 3));
    assert.equal(16, basic.powerMod(2, Math.pow(10, 9), 18));
    assert.equal(6, basic.powerMod(6, 0.5, 10));
    assert.equal(445, basic.powerMod(4, 13, 497));
    done();
  });
  

  test('should be able to check equality of two floating point numbers', function(done) {
    assert.equal(true, basic.numbersEqual(5, 5, numbers.EPSILON));
    assert.equal(true, basic.numbersEqual(5.0001, 5.0000001, numbers.EPSILON));
    assert.equal(false, basic.numbersEqual(-5, 5, numbers.EPSILON));
    assert.equal(false, basic.numbersEqual(5, 5.1, numbers.EPSILON));
    assert.equal(false, basic.numbersEqual(5, 5.001, numbers.EPSILON));
    done();
  });
  
  // basic.fallingFactorial
  test('fallingFactorial should return correct answers', function (done) {
    var func = basic.fallingFactorial;

    assert.equal(1, func(0,0)); //allows n=0
    assert.equal(1, func(7,0)); //k = 0 returns 1.
    assert.equal(0, func(2,4)); //nonsensical k returns 0
    
    assert.equal(5040, func(7,7)); //n=k returns n!
    assert.equal(840,  func(7,4));
    
    assert.throws(
      function() {
        func(-2,5)
      },
      /negative/
    );

    done();
  });

});

