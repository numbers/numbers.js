var assert = require('assert');
var numbers = require('../index.js');
var Complex = numbers.complex;
var basic = numbers.basic;

suite('numbers', function () {

  console.log('\n\n\033[34mTesting Complex Numbers\033[0m');

  test('add should return the sum of two complex numbers', function (done) {
    var A = new Complex(3, 4);
    var B = new Complex(5, 6);
    var res = A.add(B);

    assert.equal(res.re, 8);
    assert.equal(res.im, 10);
    assert.equal(A.r, 5);
    assert.equal(A.t - numbers.EPSILON < 0.9272952180016122 && 0.9272952180016122 < A.t + numbers.EPSILON, true);
    done();
  });

  test('subtract should return the difference of two complex numbers', function (done) {
    var A = new Complex(5, 8);
    var B = new Complex(3, 4);
    var res = A.subtract(B);

    assert.equal(res.re, 2);
    assert.equal(res.im, 4);
    done();
  });

  test('multiply should return the product of two complex numbers', function (done) {
    var A = new Complex(3, 4);
    var B = new Complex(5, 6);
    var res = A.multiply(B);

    assert.equal(res.re, -9);
    assert.equal(res.im, 38);
    done();
  });

  test('divide should return the product of two complex numbers', function (done) {
    var A = new Complex(10, 0);
    var B = new Complex(0, 10);
    var res = A.divide(B);

    assert.equal(res.re, 0);
    assert.equal(res.im, -1);
    done();
  });

  test('magnitude should return magnitude', function (done) {
    var A = new Complex(3, 4);

    assert.equal(A.magnitude(), 5);
    done();
  });

  test('phase should return phase', function (done) {
    var A = new Complex(3, 4);
    var res = A.phase();

    assert.equal(basic.numbersEqual(res, 0.9272952180016122, numbers.EPSILON), true);
    done();
  });

  test('magnitude should return complex conjugate', function (done) {
    var A = new Complex(3, 4);

    assert.equal(A.conjugate().re, 3);
    assert.equal(A.conjugate().im, -4);
    done();
  });

  test('should be able to get the power of a complex number', function (done) {
    var A = new Complex(3, 4);
    var justImaginary = new Complex(0, 4);
    var justNegativeImaginary = new Complex(0, -4);

    assert.equal(A.pow(1 / 2).equals(new Complex(2, 1), numbers.EPSILON), true);
    assert.equal(A.pow(1 / 4).equals(new Complex(1.455, 0.343), numbers.EPSILON), true);
    assert.equal(A.pow(0).equals(new Complex(1, 0), numbers.EPSILON), true);
    assert.equal(A.pow(2).equals(new Complex(-7, 24), numbers.EPSILON), true);
    assert.equal(A.pow(5).equals(new Complex(-237, -3116), numbers.EPSILON), true);
    assert.equal(justImaginary.pow(2).equals(new Complex(-16, 0), numbers.EPSILON), true);
    assert.equal(justNegativeImaginary.pow(-2).equals(new Complex(-1 / 16, 0), numbers.EPSILON), true);
    done();
  });

  test('should be able to raise a complex number to a given complex power', function (done) {
    var A = new Complex(0, 1);
    var B = new Complex(0, -1);

    assert.equal(A.complexPow(B).equals(new Complex(4.81047, 0), numbers.EPSILON), true);

    var C = new Complex(3, 4);
    var D = new Complex(1, 2);

    assert.equal(C.complexPow(D).equals(new Complex(-0.4198, -0.66), numbers.EPSILON), true);
    done();
  });

  test('should be able to get all the roots of a complex number', function (done) {
    var A = new Complex(3, -4);
    var root = 5;
    var roots = A.roots(root);

    assert.equal(roots.length, root);

    for (var i = 0; i < root; i++) {
      assert.equal(roots[i].pow(root).equals(A, numbers.EPSILON), true);
    }
    done();
  });

  test('should be able to get the sine of a complex number', function (done) {
    var A = new Complex(3, -4);

    assert.equal(A.sin().equals(new Complex(3.8537, 27.0168), numbers.EPSILON), true);
    done();
  });

  test('should be able to get the cosine of a complex number', function (done) {
    var A = new Complex(3, -4);

    assert.equal(A.cos().equals(new Complex(-27.0349, 3.8511), numbers.EPSILON), true);
    done();
  });

  test('should be able to get the tangent of a complex number', function (done) {
    var A = new Complex(3, -4);
    var expected = A.sin().divide(A.cos());

    assert.equal(A.tan().equals(expected, numbers.EPSILON), true);
    done();
  });

  test('should be able to check for equality of two complex numbers', function (done) {
    var A = new Complex(3, 4);

    assert.equal(A.equals(new Complex(3, 4), numbers.EPSILON), true);
    assert.equal(A.equals(new Complex(3, 4.0001), numbers.EPSILON), true);
    assert.equal(A.equals(new Complex(3.0001, 4), numbers.EPSILON), true);

    assert.equal(A.equals(new Complex(3.1, 4), numbers.EPSILON), false);
    assert.equal(A.equals(new Complex(3, 4.1), numbers.EPSILON), false);
    assert.equal(A.equals(new Complex(5, 4), numbers.EPSILON), false);
    done();
  });

});
