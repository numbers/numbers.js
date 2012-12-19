var assert = require('assert');
var numbers = require('../index.js');
var matrix = numbers.matrix;
var Matrix = numbers.matrix.Matrix;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Matrix Type Mathematics\033[0m');

  test('Should return the number of columns and rows correctly', function(done) {
    var m = new Matrix([
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [1, 3, 4, 6],
    ]);

    var rows = m.getRowCount();
    assert.equal(3,rows);

    var cols = m.getColumnCount();
    assert.equal(4,cols);

    done();
  });

  test('should return the proper element', function(done) {
    var m = new Matrix([
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    ]);

    assert.equal(3, m.getElement(0,3));
    assert.equal(4, m.getElement(1,0));
    
    assert.throws(
      function() {
        m.getElement(2,0);
      },
      /Invalid Element/
    );

    done();
  });
    
  test('should modify the proper element', function(done) {
    var m = new Matrix([
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    ]);

    m.setElement(0,3,9).setElement(1,1,7);

    assert.equal(9, m.getElement(0,3));
    assert.equal(7, m.getElement(1,1));

    done();
  });
    
  test('should swap the proper elements', function(done) {
    var m = new Matrix([
    [0, 1, 2, 3]
    ]);

    m.swapElements(0,3, 0,0);

    assert.equal(3, m.getElement(0,0));
    assert.equal(0, m.getElement(0,3));

    done();
  });

  
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

  test('should return a new vector that has been rotated by the transformation matrix', function(done) {
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

  test('should return a new vector that has been scaled by the transformation matrix', function(done) {
    var matrixA = new Matrix([[2], [5]]);
    var sx = 10;
    var sy = 5;
    var expected = new Matrix([ [20], [25] ]);

    matrixA.scale(sx, sy);

    assert.deepEqual(expected, matrixA);
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

  test('should return a new vector that has been sheared in the x direction by the transformation matrix', function(done) {
    var matrixA = new Matrix([[2], [5]]);
    var k = 10;
    var direction = "xaxis"
    var expected = new Matrix([ [52], [5] ]);

    matrixA.shear(k, direction);

    assert.deepEqual(expected, matrixA);
    done();
  });

  test('should return a new vector that has been sheared in the y direction by the transformation matrix', function(done) {
    var matrixA = new Matrix([[2], [5]]);
    var k = 10;
    var direction = "yaxis"
    var expected = new Matrix([ [2], [25] ]);

    matrixA.shear(k, direction);

    assert.deepEqual(expected, matrixA);
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

  test('should return a new vector that has been transformed by the affine transformation matrix', function(done) {
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


});
