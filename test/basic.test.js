var assert = require('assert');
var numbers = require('../index.js');
var basic = numbers.basic;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Standard Mathematics\033[0m');

  // basic.addition
  test('addition should return the sum of items in an array', function (done) {
    assert.equal(6, basic.addition([0,1,2,3]));
    assert.equal(0, basic.addition([0,-3,5,-2]));
    done();
  });

  // basic.subtraction
  test('subtraction should return the difference of items in an array', function (done) {
    assert.equal(0, basic.subtraction([0,1,2,3]));
    done();
  });

  // basic.product
  test('product should return the product of items in an array', function (done) {
    assert.equal(24, basic.product([1,2,3,4]));
    assert.equal(-6, basic.product([-3,2]));
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

  // basic.is_int
  test('is_int checks for an integer', function (done) {
    assert.equal(false, basic.is_int(2.32));
    assert.equal(false, basic.is_int("true"));
    assert.equal(false, basic.is_int("2"));
    assert.equal(true, basic.is_int(2));
    done();
  });  

  // basic.divmod
  test('divmod should return an array of both the division and modulus values of two integers', function (done) {
    assert.deepEqual([2, 0], basic.divmod(12, 6));
    assert.deepEqual([3, 1], basic.divmod(10, 3)); 
    done();
  });



});
