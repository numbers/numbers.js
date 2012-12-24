var assert = require('assert');
var numbers = require('../index.js');
var Complex = numbers.complex;
var basic = numbers.basic;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Complex Numbers\033[0m');

  test('add should return the sum of two complex numbers', function(done) {
    var A = new Complex(3, 4);
    var B = new Complex(5, 6);
    var res = A.add(B);

    assert.equal(8, res.re);
    assert.equal(10, res.im);
    assert.equal(5, A.r);
    assert.equal(true, (A.t - numbers.EPSILON < 0.9272952180016122) && (0.9272952180016122 < A.t + numbers.EPSILON));
    done();
  });

  test('subtract should return the difference of two complex numbers', function(done) {
    var A = new Complex(5, 8);
    var B = new Complex(3, 4);
    var res = A.subtract(B);

    assert.equal(2, res.re);
    assert.equal(4, res.im);
    done();
  });

  test('multiply should return the product of two complex numbers', function(done) {
    var A = new Complex(3, 4);
    var B = new Complex(5, 6);
    var res = A.multiply(B);
    
    assert.equal(-9, res.re);
    assert.equal(38, res.im);
    done();
  });

  test('divide should return the product of two complex numbers', function(done) {
    var A = new Complex(10, 0);
    var B = new Complex(0, 10);
    var res = A.divide(B);
    
    assert.equal(0, res.re);
    assert.equal(-1, res.im);
    done();
  });

  test('magnitude should return magnitude', function(done) {
    var A = new Complex(3, 4);

    assert.equal(5, A.magnitude());
    done();
  });

  test('phase should return phase', function(done) {
    var A = new Complex(3, 4);
    var res = A.phase();

    assert.equal(true, basic.numbersEqual(res, 0.9272952180016122, numbers.EPSILON));
    done();
  });

  test('magnitude should return complex conjugate', function(done) {
    var A = new Complex(3, 4);

    assert.equal(3, A.conjugate().re);
    assert.equal(-4, A.conjugate().im);
    done();
  });

  test('should be able to get the power of a complex number', function(done) {
    var A = new Complex(3, 4);
    var justImaginary = new Complex(0, 4);
    var justNegativeImaginary = new Complex(0, -4);
    var epsilon = .001;

    assert.equal(true, A.pow(1/2).equals(new Complex(2, 1), epsilon));
    assert.equal(true, A.pow(1/4).equals(new Complex(1.455,   .343), epsilon));
    assert.equal(true, A.pow(0).equals(new Complex(1, 0), epsilon));
    assert.equal(true, A.pow(2).equals(new Complex(-7, 24), epsilon));
    assert.equal(true, A.pow(5).equals(new Complex(-237, -3116), epsilon));
    assert.equal(true, justImaginary.pow(2).equals(new Complex(-16, 0), epsilon));
    assert.equal(true, justNegativeImaginary.pow(-2).equals(new Complex(-1/16, 0), epsilon));

    done();
  });

  test('should be able to get all the roots of a complex number', function(done) {
    var A = new Complex(3, -4);
    var root = 5;
    var roots = A.roots(root);

    assert.equal(root, roots.length);

    for(var i = 0; i < root; i++) {
       assert.equal(true, roots[i].pow(root).equals(A, numbers.EPSILON))
    }

    done();
  });

  test('should be able to check for equality of two complex numbers', function(done) {
    var A = new Complex(3,4);

    assert.equal(true, A.equals(new Complex(3,4), .001));
    assert.equal(true, A.equals(new Complex(3,4.0001), .001));
    assert.equal(true, A.equals(new Complex(3.0001,4), .001));

    assert.equal(false, A.equals(new Complex(3.1,4), .001));
    assert.equal(false, A.equals(new Complex(3,4.1), .001));
    assert.equal(false, A.equals(new Complex(5,4), .001));
    done();
  });

});
