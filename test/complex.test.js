var assert = require('assert');
var numbers = require('../index.js');
var Complex = numbers.complex;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Complex Numbers\033[0m');

  test('add should return the sum of two complex numbers', function(done) {
    var A = new Complex(3,4);
    var B = new Complex(5,6);
    var res = A.add(B);
    
    assert.equal(8, res.re);
    assert.equal(10, res.im);
    done();
  });

  test('subtract should return the difference of two complex numbers', function(done) {
    var A = new Complex(5,8);
    var B = new Complex(3,4);
    var res = A.subtract(B);
    
    assert.equal(2, res.re);
    assert.equal(4, res.im);
    done();
  });

  test('multiply should return the product of two complex numbers', function(done) {
    var A = new Complex(3,4);
    var B = new Complex(5,6);
    var res = A.multiply(B);
    
    assert.equal(-9, res.re);
    assert.equal(38, res.im);
    done();
  });

  test('divide should return the product of two complex numbers', function(done) {
    var A = new Complex(10,0);
    var B = new Complex(0,10);
    var res = A.divide(B);
    
    assert.equal(0, res.re);
    assert.equal(-1, res.im);
    done();
  });

  test('magnitude should return magnitude', function(done) {
    var A = new Complex(3,4);

    assert.equal(5, A.magnitude());
    done();
  });

  test('phase should return phase', function(done) {
    var A = new Complex(3,4);
    var res = A.phase();

    assert.equal(true, res - numbers.EPSILON < 0.9272952180016122 < res + numbers.EPSILON);
    done();
  });
}
