var assert = require('assert');
var numeric = require('../index.js');
var calculus = numeric.calculus;

suite('numeric', function() {

  console.log('\n\n\033[34mTesting Calculus Mathematics\033[0m');

  test('pointDiff should return the derivative at a point, provided function', function(done) {
    var func = function(x) {
      return 2 * x + 2;
    };

    assert.equal(true, 2 - calculus.pointDiff(func, 5) < numeric.EPSILON);
    done();
  });
});