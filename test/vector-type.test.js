var assert = require('assert');
var numbers = require('../index.js');
var matrix = numbers.matrix;
var Vector = numbers.linear.Vector;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Vector Type Mathematics\033[0m');

  test('should return dot product of two vectors', function(done) {
    var vectorA = new Vector([0, 1, 2, 3]);
    var vectorB = new Vector([-1, 2, 4, 6]);

    var res = vectorA.dotproduct(vectorB);

    assert.equal(28, res);
    done();
  });

});
