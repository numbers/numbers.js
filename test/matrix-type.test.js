var assert = require('assert');
var numbers = require('../index.js');
var matrix = numbers.matrix;
var Matrix = numbers.matrix.Matrix;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Matrix Type Mathematics\033[0m');

  test('should return sum of two matrices', function(done) {
    var matrixA = new Matrix([
      [0, 1, 2],
      [3, 4, 5]
    ]);

    var matrixB = new Matrix([
      [6, 7, 8],
      [9, 10, 11]
    ]);

    var matrixC = new Matrix([
      [6, 8, 10],
      [12, 14, 16]
    ]);

    matrixA.add(matrixB);
    
    assert.deepEqual(matrixC, matrixA);
    done();
  });

  test('should return transposed matrix', function(done) {
    var matrixA = new Matrix([
      [0, 1, 2],
      [3, 4, 5]
    ]);

    var transposed = [
      [0, 3],
      [1, 4],
      [2, 5]
    ];

    matrixA.transpose();

    assert.deepEqual(transposed, matrixA.data);
    done();
  });

  test('should return product of two matrices', function(done) {
    var matrixA = new Matrix([
      [0, 1, 2],
      [3, 4, 5]
    ]);

    var matrixB = new Matrix([
      [0, 3],
      [1, 4],
      [2, 5]
    ]);

    var res = matrixA.multiply(matrixB);

    assert.deepEqual([[5, 14], [14, 50]], res.data);
    done();
  });

  test('should return inverse of a 2x2 matrix', function(done) {
    var matrixA = new Matrix([
      [0, 1],
      [3, 4]
    ]);

    var expected = new Matrix([
      [-1.333, 0.333],
      [1, 0]
    ]);

    var actual = matrixA.invert();
    
    assert.equal((actual.getElement(0,0) > (expected.getElement(0,0) - numbers.EPSILON)), true);
    assert.equal((actual.getElement(0,0) < (expected.getElement(0,0) + numbers.EPSILON)), true);
    assert.equal((actual.getElement(0,1) > (expected.getElement(0,1) - numbers.EPSILON)), true);
    assert.equal((actual.getElement(0,1) < (expected.getElement(0,1) + numbers.EPSILON)), true);
    assert.equal((actual.getElement(1,0) > (expected.getElement(1,0) - numbers.EPSILON)), true);
    assert.equal((actual.getElement(1,0) < (expected.getElement(1,0) + numbers.EPSILON)), true);
    assert.equal((actual.getElement(1,1) > (expected.getElement(1,1) - numbers.EPSILON)), true);
    assert.equal((actual.getElement(1,1) < (expected.getElement(1,1) + numbers.EPSILON)), true);

    done();
  });

  test('should throw an error if a vector larger than 2x2 is given for invert', function(done) {
    var matrixA = new Matrix([[0], [1], [2]]);

    assert.throws(
      function() {
        matrixA.invert();
      },
      /Only two by two matrices currently supported/
    );
    done();
  });

  test('should transform a matrix that has been rotated by the transformation matrix', function(done) {
    var matrixA = new Matrix([[0], [1]]);
    var degree = 90;

    matrixA.rotate(degree, 'clockwise');

    assert.equal((matrixA.getElement(0,0) > (1 - numbers.EPSILON)), true);
    assert.equal((matrixA.getElement(0,0) < (1 + numbers.EPSILON)), true);
    assert.equal((matrixA.getElement(1,0) > (0 - numbers.EPSILON)), true);
    assert.equal((matrixA.getElement(1,0) < (0 + numbers.EPSILON)), true);
    done();
  });

  test('should throw an error if a vector larger than two is given for rotation', function(done) {
    var matrixA = new Matrix([[0], [1], [2]]);
    var degree = 90;

    assert.throws(
      function() {
        matrixA.rotate(degree, 'clockwise');
      },
      /Only two dimensional matrices currently supported/
    );
    done();
  });

  test('should transform a matrix that has been scaled by the transformation matrix', function(done) {
    var matrixA = new Matrix([[2], [5]]);
    var sx = 10;
    var sy = 5;
    var expected = new Matrix([ [20], [25] ]);

    matrixA.scale(sx, sy);

    assert.deepEqual(expected.data, matrixA.data);
    done();
  });

  test('should throw an error if a vector larger than two is given for scaling', function(done) {
    var matrixA = new Matrix([[0], [1], [2]]);
    var sx = 10;
    var sy = 5;

    assert.throws(
      function() {
        matrixA.scale(sx, sy);
      },
      /Only two dimensional operations are supported/
    );
    done();
  });

  test('should transform a matrix that has been sheared in the x direction by the transformation matrix', function(done) {
    var matrixA = new Matrix([[2], [5]]);
    var k = 10;
    var direction = "xaxis"
    var expected = new Matrix([ [52], [5] ]);

    matrixA.shear(k, direction);

    assert.deepEqual(expected.data, matrixA.data);
    done();
  });

  test('should transform a matrix that has been sheared in the y direction by the transformation matrix', function(done) {
    var matrixA = new Matrix([[2], [5]]);
    var k = 10;
    var direction = "yaxis"
    var expected = new Matrix([ [2], [25] ]);

    matrixA.shear(k, direction);

    assert.deepEqual(expected.data, matrixA.data);
    done();
  });

  test('should throw an error if a vector larger than two is given for shearing', function(done) {
    var matrixA = new Matrix([[0], [1], [2]]);
    var k = 10;
    var direction = "yaxis"

    assert.throws(
      function() {
        matrixA.shear(k, direction);
      },
      /Only two dimensional operations are supported/
    );
    done();
  });

  test('should transform a matrix by the affine transformation matrix', function(done) {
    var matrixA = new Matrix([[2], [5]]);
    var tx = 10;
    var ty = 10;
    var expected = new Matrix([ [12], [15] ]);

    matrixA.affine(tx, ty);

    assert.deepEqual(expected, matrixA);
    done();
  });

  test('should throw an error if a vector larger than two is given for the affine transform', function(done) {
    var matrixA = new Matrix([[0], [1], [2]]);
    var tx = 10;
    var ty = 10;

    assert.throws(
      function() {
        matrixA.affine(tx, ty);
      },
      /Only two dimensional operations are supported/
    );

    done();
  });

  test('should return the original matrix whose scale transform has been undone', function(done) {
    var matrixA = new Matrix([[2], [5]]);
    var expected = new Matrix([ [2], [5] ]);
    var sx = 10;
    var sy = 5;

    matrixA.scale(sx, sy).undo();

    assert.deepEqual(expected.data, matrixA.data);
    done();
  });

  test('should return the original matrix whose scale and rotation transform has been undone', function(done) {
    var matrixA = new Matrix([[2], [5]]);
    var expected = new Matrix([ [2], [5] ]);
    var sx = 10;
    var sy = 5;
    var degree = 90;

    matrixA.scale(sx, sy).rotate(degree, 'clockwise').undo().undo();

    assert.deepEqual(expected.data, matrixA.data);
    done();
  });

  test('should return the original matrix when an untransformed matrix has been undone', function(done) {
    var matrixA = new Matrix([[2], [5]]);
    var expected = new Matrix([ [2], [5] ]);

    matrixA.undo();

    assert.deepEqual(expected.data, matrixA.data);
    done();
  });


});
