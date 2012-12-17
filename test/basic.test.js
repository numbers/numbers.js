var assert = require('assert');
var numbers = require('../index.js');
var basic = numbers.basic;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Standard Mathematics\033[0m');

  // basic.sum
  test('sum should return the sum of items in an array', function (done) {
    assert.equal(6, basic.sum([0,1,2,3]));
    assert.equal(0, basic.sum([0,-3,5,-2]));
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
        basic.sum([1,2,"error"]);
      },
      /All elements in array must be numbers/
    );
    done();
  });

  // basic.substraction
  test('subtraction should return the difference of items in an array', function (done) {
    assert.equal(0, basic.subtraction([0,1,2,3]));
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
        basic.subtraction(["test",1,1,2]);
      },
      /All elements in array must be numbers/
    );
    done();
  });

  // basic.product

  test('product should return the product of items in an array', function (done) {
    assert.equal(24, basic.product([1,2,3,4]));
    assert.equal(-6, basic.product([-3,2]));
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
        basic.product([1,2,"error"]);
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
  test('gcd should return the greatest common denominator of two integers', function (done) {
    assert.equal(6, basic.gcd(1254, 5298));
    assert.equal(1, basic.gcd(78699786, 78978965));
    done();
  });

  // basic.lcm
  test('lcm should return the least common multiple of two integers', function (done) {
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
    assert.deepEqual([1,2,3,4,5,6,7,8,9,10],basic.range(1,10));
    assert.deepEqual([10,9,8,7,6,5,4,3,2,1],basic.range(10,1));
    assert.deepEqual([1,1.5,2,2.5,3,3.5,4,4.5,5],basic.range(1,5,.5));
    assert.deepEqual([5,4.5,4,3.5,3,2.5,2,1.5,1],basic.range(5,1,.5));
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

  // basic.powerMod

  // basic.egcd

  // basic.modInverse

});