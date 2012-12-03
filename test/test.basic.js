var assert = require('assert')
  , Numeric = require('../index.js');

var numeric = new Numeric();


suite('numeric', function() {

  console.log('\n\n\033[34mTesting Standard Mathematics\033[0m');

  // numeric.addition
  test('addition should return the sum of items in an array', function(done) {
    assert.equal(6, numeric.addition([0,1,2,3]));
    assert.equal(0, numeric.addition([0,-3,5,-2]));
    assert.equal(0.43, numeric.addition([0.03, 0.4]));
    done();
  });

  // numeric.subtraction
  test('subtraction should return the difference of items in an array', function(done) {
    assert.equal(0, numeric.subtraction([0,1,2,3]));
    done();
  });

  // numeric.product
  test('product should return the product of items in an array', function(done) {
    assert.equal(24, numeric.product([1,2,3,4]));
    assert.equal(-6, numeric.product([-3,2]));
    done();
  });

  // numeric.factorial
  test('factorial should return the product of n * (n - 1) * (n - 2) * ... * 1', function(done) {
    assert.equal(24, numeric.factorial(4));
    assert.equal(120, numeric.factorial(5));
    done();
  });

  // numeric.gcd
  test('gcd should return the greatest common denominator of two integers', function(done) {
    assert.equal(6, numeric.gcd(1254, 5298));
    assert.equal(1, numeric.gcd(78699786, 78978965));
    done();
  });

  // numeric.lcm
  test('lcm should return the least common multiple of two integers', function(done) {
    assert.equal(240, numeric.lcm(12, 80));

    done();
  });
});