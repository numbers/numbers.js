var assert = require('assert');
var numbers = require('../index.js');
var matrix = numbers.matrix;
var transformation = numbers.transformation;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Transformation Mathematics\033[0m');

  test('should return a new vector that has been rotated by the transformation matrix', function(done) {
    var vectorA = [[0], [1]];
    var degree = 90;

    var res = transformation.rotate(vectorA, degree, 'clockwise');

    assert.equal((res[0][0] > (1 - numbers.EPSILON)), true);
    assert.equal((res[0][0] < (1 + numbers.EPSILON)), true);
    assert.equal((res[1][0] > (0 - numbers.EPSILON)), true);
    assert.equal((res[1][0] < (0 + numbers.EPSILON)), true);
    done();
  });

  test('should throw an error if a vector larger than two is given for rotation', function(done) {
    var vectorA = [[0], [1], [2]];
    var degree = 90;

    assert.throws(
      function() {
        transformation.rotate(vectorA, degree, 'clockwise');
      },
      /Only two dimensional operations are supported at this time/
    );
    done();
  });

  test('should return a new vector that has been scaled by the transformation matrix', function(done) {
    var vectorA = [[2], [5]];
    var sx = 10;
    var sy = 5;
    var expected = [ [20], [25] ];

    var res = transformation.scale(vectorA, sx, sy);

    assert.deepEqual(expected, res);
    done();
  });

  test('should throw an error if a vector larger than two is given for scaling', function(done) {
    var vectorA = [[0], [1], [2]];
    var sx = 10;
    var sy = 5;

    assert.throws(
      function() {
        var res = transformation.scale(vectorA, sx, sy);
      },
      /Only two dimensional operations are supported at this time/
    );
    done();
  });

  test('should return a new vector that has been sheared in the x direction by the transformation matrix', function(done) {
    var vectorA = [[2], [5]];
    var k = 10;
    var direction = "xaxis"
    var expected = [ [52], [5] ];

    var res = transformation.shear(vectorA, k, direction);

    assert.deepEqual(expected, res);
    done();
  });

  test('should return a new vector that has been sheared in the y direction by the transformation matrix', function(done) {
    var vectorA = [[2], [5]];
    var k = 10;
    var direction = "yaxis"
    var expected = [ [2], [25] ];

    var res = transformation.shear(vectorA, k, direction);

    assert.deepEqual(expected, res);
    done();
  });

  test('should throw an error if a vector larger than two is given for shearing', function(done) {
    var vectorA = [[0], [1], [2]];
    var k = 10;
    var direction = "yaxis"

    assert.throws(
      function() {
        var res = transformation.shear(vectorA, k, direction);
      },
      /Only two dimensional operations are supported at this time/
    );
    done();
  });

  test('should return a new vector that has been transformed by the affine transformation matrix', function(done) {
    var vectorA = [[2], [5]];
    var tx = 10;
    var ty = 10;
    var expected = [ [12], [15] ];

    var res = transformation.affine(vectorA, tx, ty);

    assert.deepEqual(expected, res);
    done();
  });

  test('should throw an error if a vector larger than two is given for the affine transform', function(done) {
    var vectorA = [[0], [1], [2]];
    var tx = 10;
    var ty = 10;

    assert.throws(
      function() {
        var res = transformation.affine(vectorA, tx, ty);
      },
      /Only two dimensional operations are supported at this time/
    );
    done();
  });

});
