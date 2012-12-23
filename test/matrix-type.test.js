var assert = require('assert');
var numbers = require('../index.js');
var matrix = numbers.matrix;
var Matrix = numbers.linear.Matrix;
var SquareMatrix = numbers.linear.SquareMatrix;

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
      /Invalid element/
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

  test('should return a new matrix that has a scaled row', function(done) {
    var m = new Matrix([
      [0, 1, 2],
      [3, -1, 5],
      [1, 2, 5]
    ]);

    var expected1 = [
      [0, 0, 0],
      [3, -1, 5],
      [1, 2, 5]
    ];
    
    var res1 = m.scaleRowBy(0,0).getData();
    assert.deepEqual(res1, expected1);
    
    var expected2 = [
      [0, 0, 0],
      [-6, 2, -10],
      [1, 2, 5]
      ];

    var res2 = m.scaleRowBy(1 , -2).getData();
    assert.deepEqual( res2 , expected2 );

    done();
  });

  test('should return a new matrix that has rows changed with the swapRows function', function(done) {
    var m = new Matrix([
      [0, 1, 2],
      [3, -1, 5],
      [1, 2, 5]
    ]);

    var expected1 = [
      [3, -1, 5],
      [0, 1, 2],
      [1, 2, 5]
      ];

    var res1 = m.swapRows(0,1).getData();
    assert.deepEqual(res1,expected1);

    done();
  });

  test('should return a new matrix that has a multiple of one row added to another using the rowAddMultiple function', function(done) {
    var m = new Matrix([
      [0, 1, 2],
      [3, -1, 5],
      [1, 2, 5]
    ]);

    var expected1 = [
      [0, 1, 2],
      [3, 1, 9],
      [1, 2, 5]
    ];
    
    var res1 = m.rowAddMultiple(0,1,2).getData();
    assert.deepEqual(res1,expected1);
    
    done();
  });

  test('should return true for matrix equality', function(done) {
    var matrixA = new Matrix([
      [0, 1, 2],
      [3, 4, 5]
    ]);

    var matrixB = new Matrix([
      [0, 1, 2],
      [3, 4, 5]
    ]);

    assert.equal(true, matrixA.equals(matrixB));
    done();
  });

  test('should return false for matrix equality', function(done) {
    var matrixA = new Matrix([
      [0, 1, 2],
      [3, 4, 5]
    ]);

    var matrixB = new Matrix([
      [0, 1, 2],
      [3, 4, 0]
    ]);

    assert.equal(false, matrixA.equals(matrixB));
    done();
  });

  test('should return false for matrix equality', function(done) {
    var matrixA = new Matrix([
      [0, 1, 2],
      [3, 4, 5]
    ]);

    var matrixB = new Matrix([
      [0, 1, 2],
      [3, 4, 5],
      [3, 4, 5]
    ]);

    assert.equal(false, matrixA.equals(matrixB));
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

  test('should returned scaled matrix', function(done) {
    var matrix = new Matrix([
      [0, 1, 2],
      [3, 4, 5]
    ]);

    var res = matrix.scaleBy(5).getData();

    assert.deepEqual([[0, 5, 10], [15, 20, 25]], res);
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

    assert.deepEqual(transposed, matrixA.getData());
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

    assert.deepEqual([[5, 14], [14, 50]], res.getData());
    done();
  });

  test('should return product of matrix and a vector', function(done) {
    var matrixA = new Matrix([
      [0, 1, 2],
      [3, 4, 5]
    ]);
    var matrixB = new Matrix([
      [0],
      [1],
      [2]
    ]);

    var res = matrixA.multiply(matrixB).getData();

    assert.deepEqual([[5], [14]], res);
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

  test('should return determinant of matrix', function(done) {

    var m0 = new SquareMatrix([[1]]);
    
    var res0 = m0.determinant();
    assert.equal(1, res0);
    
    var m1 = new SquareMatrix([
      [2, 3],
      [6, 7]
    ]);

    var res1 = m1.determinant();
    assert.equal(-4, res1);

    var m2 = new SquareMatrix([
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ]);

    var res2 = m2.determinant();
    assert.equal(0, res2);
    
    done();
  });

  test('should throw an error for trying to create a square matrix with non-square data', function(done) {    
    

    assert.throws(
      function() {
        var m3 = new SquareMatrix([
          [3, -7, 8, 9, -6],
          [0, 2, -5, 7, 3],
          [0, 0, 1, 5, 0],
          [0, 0, 0, -2, 0]
        ]);
      },
      /Invalid \(non-square\) data/
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

    assert.deepEqual(expected.getData(), matrixA.getData());
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

    assert.deepEqual(expected.getData(), matrixA.getData());
    done();
  });

  test('should transform a matrix that has been sheared in the y direction by the transformation matrix', function(done) {
    var matrixA = new Matrix([[2], [5]]);
    var k = 10;
    var direction = "yaxis"
    var expected = new Matrix([ [2], [25] ]);

    matrixA.shear(k, direction);

    assert.deepEqual(expected.getData(), matrixA.getData());
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

    assert.deepEqual(expected.getData(), matrixA.getData());
    done();
  });

  test('should return the original matrix whose scale and rotation transform has been undone', function(done) {
    var matrixA = new Matrix([[2], [5]]);
    var expected = new Matrix([ [2], [5] ]);
    var sx = 10;
    var sy = 5;
    var degree = 90;

    matrixA.scale(sx, sy).rotate(degree, 'clockwise').undo().undo();

    assert.deepEqual(expected.getData(), matrixA.getData());
    done();
  });

  test('should return the original matrix when an untransformed matrix has been undone', function(done) {
    var matrixA = new Matrix([[2], [5]]);
    var expected = new Matrix([ [2], [5] ]);

    matrixA.undo();

    assert.deepEqual(expected.getData(), matrixA.getData());
    done();
  });
  
  test('should return identity matrix of dimension n', function(done) {
    var identity = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ];
    var res = Matrix.identity(3).getData();

    assert.deepEqual(identity, res);
    done();
  });


  test('should test the determinant of a square matrix', function(done) {
    var squareMatrix = new SquareMatrix(
      [[3, -1, 0.2, 2],
      [3, 1, 5, 1],
      [6, 3, -5, 0],
      [7, 7, 7, 1]]
    );

    var res = squareMatrix.determinant();
    assert.equal(-247.2, res);
    done();
  });

  test('should remove a row correctly', function(done) {
    var m = new Matrix([
      [1, 2, 0],
      [1, 1, 0],
      [0, 2, 1]
    ]);

    var expected = [
      [1, 2, 0],
      [0, 2, 1]
    ];

    m.removeRow(1);
    assert.deepEqual(expected, m.getData());

    done();
  });

  test('should remove a column correctly', function(done) {
    var m = new Matrix([
      [1, 2, 0, 2],
      [1, 1, 0, 2],
      [0, 2, 1, 15]
    ]);

    var expected = [
      [1, 2, 2],
      [1, 1, 2],
      [0, 2, 15]
    ];
    
    m.removeColumn(2);
    assert.deepEqual(expected, m.getData());

    done();
  });

  test('should return if a matrix is n x n', function(done) {
    var res1 = new Matrix([
      [1, 0, 0],
      [0, 1, 0],
      [0, 1, 1]
    ]);

    var res2 = new Matrix([
      [1, 0, 0],
      [0, 1, 0],
      [0, 1, 1],
      [0, 1, 1]
    ]);

    assert.deepEqual(true, res1.isSquare());
    assert.deepEqual(false, res2.isSquare());
    done();
  });

test('should cofactors of the matrix', function(done) {
    var res1 = new SquareMatrix([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]);

    var res2 = new SquareMatrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ]);

    var res3 = new SquareMatrix([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ]);

    assert.deepEqual([[1, 0],[0, 1]], res1.cofactor(0,0).getData());
    assert.deepEqual([[-2, -3],[-8,-9]], res2.cofactor(1,0).getData());
    assert.deepEqual([[1, 0],[0, 1]], res3.cofactor(0,0).cofactor(0,0).getData());
    done();
  });

});
