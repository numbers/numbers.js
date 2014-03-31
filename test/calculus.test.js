var assert = require('assert');
var numbers = require('../index.js');
var calculus = numbers.calculus;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Calculus Mathematics\033[0m');

  test('pointDiff should return the derivative at a point, provided function', function(done) {
    var func = function (x) {
      return 2 * x + 2;
    };

    var res = calculus.pointDiff(func, 5);
    
    assert.equal(true, 2 - res < numbers.EPSILON);
    done();
  });

  test('riemann should return an estimated definite integral of a function', function(done) {
    var func = function (x) {
      return 2 * Math.pow(x, 2);
    };

    var res = calculus.Riemann(func, 0, 100, 10);

    assert.equal(570000, res);
    done();
  });

  test('adaptive simpson should return an estimated definite integral of a function', function(done) {
    var func = function (x) {
      return 2 * Math.pow(x, 2);
    };

    var res = calculus.adaptiveSimpson(func, 0, 100);

    assert.equal(true, res - numbers.EPSILON < 666666.66667 < res + numbers.EPSILON);
    done();
  });

  test('limit should return the limit of a function at a given point from left, middle, or right', function(done) {
    var func = function (x) {
      return Math.pow(x, 2) * Math.sin(2 * x);
    };

    var res = calculus.limit(func, 10, 'middle');

    assert.equal(true, res - numbers.EPSILON < 91.29 < res + numbers.EPSILON);
    done();
  });

  test('Stirling approximation gamma should return correct values', function (done) {
    assert.equal(true, numbers.EPSILON > 5.69718714897717 - calculus.StirlingGamma(0.1));
    assert.equal(true, numbers.EPSILON > 3.3259984240223925 - calculus.StirlingGamma(0.2));
    assert.equal(true, numbers.EPSILON > 2.3625300362696198 - calculus.StirlingGamma(0.3));
    assert.equal(true, numbers.EPSILON > 0.8426782594483921 - calculus.StirlingGamma(1.3));
    done();
  });

  test('Lanczos approximation gamma should return correct values', function (done) {
    assert.equal(true, numbers.EPSILON > 9.513507698668736 - calculus.LanczosGamma(0.1));
    assert.equal(true, numbers.EPSILON > 4.590843711998803 - calculus.LanczosGamma(0.2));
    assert.equal(true, numbers.EPSILON > 2.9915689876875904 - calculus.LanczosGamma(0.3));
    assert.equal(true, numbers.EPSILON > 0.8974706963062777 - calculus.LanczosGamma(1.3));
    done();
  });

  //this test will be added if/when random.js and testing.js is merged
  /*
  test('Monte Carlo approximation method should return a reasonable answer', function(done) {
    f = function(x,y,z) {return x*y*Math.sin(z);}
    res = calculus.MonteCarlo(f, 10000, [5,10], [1,3], [0, Math.PI/4]);
    assert.between(res, 43, 45);
    done();
  });
  */
});
