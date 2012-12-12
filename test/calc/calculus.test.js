var assert = require('assert');
var numbers = require('../index.js');
var calculus = numbers.calc;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Calculus Mathematics\033[0m');

  test('pointDiff should return the derivative at a point, provided function', function(done) {
    var func = function(x) {
      return 2 * x + 2;
    };

    var res = calculus.pointDiff(func, 5);
    
    assert.equal(true, 2 - res < numbers.EPSILON);
    done();
  });

  test('riemann should return an estimated definite integral of a function', function(done) {
    var func = function(x) {
      return 2 * Math.pow(x, 2);
    };

    var res = calculus.riemann(func, 0, 100, 10);

    assert.equal(570000, res);
    done();
  });

  test('adaptive simpson should return an estimated definite integral of a function', function(done) {
    var func = function(x) {
      return 2 * Math.pow(x, 2);
    };

    var res = calculus.adaptiveSimpson(func, 0, 100);

    assert.equal(true, res - numbers.EPSILON < 666666.66667 < res + numbers.EPSILON);
    done();
  });

  test('limit should return the limit of a function at a given point from left, middle, or right', function(done) {
    var func = function(x) {
      return Math.pow(x, 2) * Math.sin(2 * x);
    };

    var res = calculus.limit(func, 10, 'middle');

    assert.equal(true, res - numbers.EPSILON < 91.29 < res + numbers.EPSILON);
    done();
  });

});