var assert = require('assert');
var numbers = require('../index.js');
var matrix = numbers.matrix;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Matrix Mathematics\033[0m');

  test('should create a deep copy of a matrix', function(done) {
    var input = [[1,2],[2,1]];

    var copy = matrix.deepCopy(input);

    assert.notEqual(input, copy);

    assert.throws(
      function() {
        matrix.deepCopy([1,2])
      },
      /Input cannot be a vector./
    );
    
    done();
  });

  test('should be able to tell if a matrix is square', function(done) {
    assert.equal(matrix.isSquare([[1,2],[3,4]]), true);
    assert.equal(matrix.isSquare([[1,2,3],[4,5,6]]), false);
    assert.equal(matrix.isSquare([[1,2,3], [4,5,6], [7,8,9]]), true);
    assert.equal(matrix.isSquare([[1,2], [3,4,5]]), false);
    assert.equal(matrix.isSquare([[1,2,3], [4,5], [6,7,8]]), false);
    
    done();
  });

  test('should return sum of two matrices', function(done) {
    var arrA = [
      [0, 1, 2],
      [3, 4, 5]
    ];

    var arrB = [
      [6, 7, 8],
      [9, 10, 11]
    ];

    var arrC = [
      [6, 8, 10],
      [12, 14, 16]
    ];

    var res = matrix.addition(arrA, arrB);
    
    assert.deepEqual(arrC, res);
    done();
  });

  test('should return sum of two vectors', function(done) {
    var arrA = [0, 1, 2];
    var arrB = [3, 4, 5];

    var arrC = [3, 5, 7];

    var res = matrix.addition(arrA, arrB);

    assert.deepEqual(arrC, res);
    done();
  });

  test('should returned scaled matrix', function(done) {
    var array = [
      [0, 1, 2],
      [3, 4, 5]
    ];
    var scalar = 5;

    var res = matrix.scalar(array, scalar);

    assert.deepEqual([[0, 5, 10], [15, 20, 25]], res);
    done();
  });

  test('should return transposed matrix', function(done) {
    var array = [
      [0, 1, 2],
      [3, 4, 5]
    ];

    var transposed = [
      [0, 3],
      [1, 4],
      [2, 5]
    ];

    var res = matrix.transpose(array);

    assert.deepEqual(transposed, res);
    done();
  });

  test('should return identity matrix of dimension n', function(done) {
    var identity = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ];
    var res = matrix.identity(3);

    assert.deepEqual(identity, res);
    done();
  });

  test('should return dot product of two vectors', function(done) {
    var vectorA = [0, 1, 2, 3];
    var vectorB = [-1, 2, 4, 6];

    var res = matrix.dotproduct(vectorA, vectorB);

    assert.equal(28, res);
    done();
  });

  test('should return product of two matrices', function(done) {
    var matrixA = [
      [0, 1, 2],
      [3, 4, 5]
    ];
    var matrixB = [
      [0, 3],
      [1, 4],
      [2, 5]
    ];

    var res = matrix.multiply(matrixA, matrixB);

    assert.deepEqual([[5, 14], [14, 50]], res);
    done();
  });

  test('should return product of matrix and a vector', function(done) {
    var matrixA = [
      [0, 1, 2],
      [3, 4, 5]
    ];
    var matrixB = [
      [0],
      [1],
      [2]
    ];

    var res = matrix.multiply(matrixA, matrixB);

    assert.deepEqual([[5], [14]], res);
    done();
  });

  test('should return determinant of matrix', function(done) {

    var m0 = [
      [1]
    ];

    var res0 = matrix.determinant(m0);
    assert.equal(1, res0);
    
    var m1 = [
      [2, 3],
      [6, 7]
    ];

    var res1 = matrix.determinant(m1);
    assert.equal(-4, res1);

    var m2 = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];

    var res2 = matrix.determinant(m2);
    assert.equal(0, res2);
    
    done();
  }); 
  
  test('should throw an error for calculating the determinant of a non-square matrix', function(done) {    
    var m3 = [
      [3, -7, 8, 9, -6],
      [0, 2, -5, 7, 3],
      [0, 0, 1, 5, 0],
      [0, 0, 0, -2, 0]
    ];

    assert.throws(function() {
        matrix.determinant(m3);
      },
      /Not a square matrix/
    );
    done();
  });

  test('should throw an error if trying to get LU decomposition of non-square matrix', function(done) {
    assert.throws(
      function() {
        matrix.lupDecomposition([[1,2,3],[4,5,6]]);
      },
      /Matrix must be square./
    );
    
    done();
  });

  test('should return the LU decomposition of a matrix', function(done) {
    var inputMatrix = [[1, 0, 0, 2], [2, -2, 0, 5], [1, -2, -2, 3], [5, -3, -5, 2]];
    var firstLup = matrix.lupDecomposition(inputMatrix);

    assert.deepEqual(matrix.multiply(firstLup[0], firstLup[1]),
                     matrix.multiply(firstLup[2], inputMatrix));

    var secondInputMatrix = [[1, 0, 0, 2], [1, -2, 0, 5], [1, -2, 0, 3], [1, -3, -5, 0]];
    var secondLup = matrix.lupDecomposition(secondInputMatrix);

    assert.deepEqual(matrix.multiply(secondLup[0], secondLup[1]),
                     matrix.multiply(secondLup[2], secondInputMatrix));
    
    done();
  });

  test('should return a new vector that has been rotated by the transformation matrix', function(done) {
    var vectorA = [[0], [1]];
    var degree = 90;

    var res = matrix.rotate(vectorA, degree, 'clockwise');

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
        matrix.rotate(vectorA, degree, 'clockwise');
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

    var res = matrix.scale(vectorA, sx, sy);

    assert.deepEqual(expected, res);
    done();
  });

  test('should throw an error if a vector larger than two is given for scaling', function(done) {
    var vectorA = [[0], [1], [2]];
    var sx = 10;
    var sy = 5;

    assert.throws(
      function() {
        var res = matrix.scale(vectorA, sx, sy);
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

    var res = matrix.shear(vectorA, k, direction);

    assert.deepEqual(expected, res);
    done();
  });

  test('should return a new vector that has been sheared in the y direction by the transformation matrix', function(done) {
    var vectorA = [[2], [5]];
    var k = 10;
    var direction = "yaxis"
    var expected = [ [2], [25] ];

    var res = matrix.shear(vectorA, k, direction);

    assert.deepEqual(expected, res);
    done();
  });

  test('should throw an error if a vector larger than two is given for shearing', function(done) {
    var vectorA = [[0], [1], [2]];
    var k = 10;
    var direction = "yaxis"

    assert.throws(
      function() {
        var res = matrix.shear(vectorA, k, direction);
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

    var res = matrix.affine(vectorA, tx, ty);

    assert.deepEqual(expected, res);
    done();
  });

  test('should throw an error if a vector larger than two is given for the affine transform', function(done) {
    var vectorA = [[0], [1], [2]];
    var tx = 10;
    var ty = 10;

    assert.throws(
      function() {
        var res = matrix.affine(vectorA, tx, ty);
      },
      /Only two dimensional operations are supported at this time/
    );

    done();
  });

  test('should return a new matrix that has a scaled row for the rowScale function', function(done) {
    var m = [
      [0, 1, 2],
      [3, -1, 5],
      [1, 2, 5]
    ];

    var expected1 = [
      [0, 0, 0],
      [3, -1, 5],
      [1, 2, 5]
      ];
    var res1 = matrix.rowScale(m,0,0);

    assert.deepEqual(res1,expected1);


    var expected2 = [
      [0, 1, 2],
      [-6, 2, -10],
      [1, 2, 5]
      ];
    var res2 = matrix.rowScale( m , 1 , -2 );

    assert.deepEqual( res2 , expected2 );


    done();
  });

  test('should return a new matrix that has rows changed with the rowSwitch function', function(done) {
    var m = [
      [0, 1, 2],
      [3, -1, 5],
      [1, 2, 5]
    ];

    var expected1 = [
      [3, -1, 5],
      [0, 1, 2],
      [1, 2, 5]
      ];
    var res1 = matrix.rowSwitch(m,0,1);

    assert.deepEqual(res1,expected1);

    var res2 = matrix.rowScale(m,1,1);

    assert.deepEqual(res2,m);

    
    done();
  });
  test('should return a new matrix that has a multiple of one row added to another using the rowAddMultiple function', function(done) {
    var m = [
      [0, 1, 2],
      [3, -1, 5],
      [1, 2, 5]
    ];

    var expected1 = [
      [0, 1, 2],
      [3, 1, 9],
      [1, 2, 5]
      ];
    var res1 = matrix.rowAddMultiple(m,0,1,2);

    assert.deepEqual(res1,expected1);

    var res2 = matrix.rowScale(m,1,1,0);

    assert.deepEqual(res2,m);

    
    done();
  });

  test('should row reduce the given matrix for a given epsilon', function(done) {
    var m1 = [[0, 1, 2],
              [3, -1, 5],
              [1, 2, 5]];

    var m2 = [[2, -1, 0],
              [-1, 2, -1],
              [0, -1, 2]];

    var expected1 = [[1, 0, 0],
                     [0, 1, 0],
                     [0, 0, 1]];

    var res1 = matrix.GaussJordanEliminate(m1);
    var res2 = matrix.GaussJordanEliminate(m2);
    var res3 = matrix.rowReduce(m2, 0.01);

    assert.deepEqual(res1,expected1);
    assert.deepEqual(res2,expected1);
    assert.deepEqual(res3,expected1);

    done();
  });

  test('should row reduce the given matrix for a given epsilon', function(done) {
    var m1 = [[0, 1],
              [1, 2]];

    var expected1 = [[-2, 1],
                     [1, 0]];

    var m2 = [[1, 3, 3],
              [1, 4, 3],
              [1, 3, 4]];

   var expected2 = [[7,-3,-3],
                    [-1,1,0],
                    [-1,0,1]];

    var res1 = matrix.inverse(m1);
    var res2 = matrix.inverse(m2);

    assert.deepEqual(res1,expected1);
    assert.deepEqual(res2,expected2);

    done();
  });

  test('should reorder columns', function(done) {
    var m1 = [[1,2,3],
              [4,5,6],
              [7,8,9]];

    var expected1 = [[2,3,1],
                     [5,6,4],
                     [8,9,7]];

    var m2 = [[20,3],
              [17,5]];

    var expected2 = [[3,20],
                     [5,17]];

    var res1 = matrix.reorderCols(m1, [1,2,0]);
    var res2 = matrix.reorderCols(m2, [1,0]);

    assert.deepEqual(res1,expected1);
    assert.deepEqual(res2,expected2);
    done();
  });

  test('should reorder rows', function(done) {
    var m1 = [[1,2,3],
              [4,5,6],
              [7,8,9]];

    var expected1 = [[7,8,9],
                     [1,2,3],
                     [4,5,6]]

    var m2 = [[20,3],
              [17,5]];

    var expected2 = [[17,5],
                     [20,3]];

    var res1 = matrix.reorderRows(m1, [2,0,1]);
    var res2 = matrix.reorderRows(m2, [1,0]);

    assert.deepEqual(res1,expected1);
    assert.deepEqual(res2,expected2);
    done();
  });

  test('should reverse columns and rows', function(done) {
    var m1 = [[2,5,7],
              [10,4,6],
              [0,1,0]];

    var expected1 = [[0,1,0],
                     [6,4,10],
                     [7,5,2]];

    var res1 = matrix.reverseRows(matrix.reverseCols(m1));

    assert.deepEqual(res1, expected1);
    done();
  });

  test('should produce a matrix of zeros', function(done) {
    var n1 = 3;
    var m1 = 2;

    var expected1 = [[0,0],
                     [0,0],
                     [0,0]];

    var res1 = matrix.zeros(n1,m1);

    assert.deepEqual(res1, expected1);
    done();
  });

  test('should get a column', function(done) {
    var m1 = [[10,2,5],
              [5,2,42],
              [7,6,4]];

    var expected1 = [5,42,4];

    var res1 = matrix.getCol(m1, 2);

    assert.deepEqual(res1, expected1);
    done();
  });

  test('should create a zigzag matrix', function(done) {
    var n1 = 4;
    var corner1 = 'TL';
    var dir1 = 'V';

    var expected1 = [[1,3,4,10],
                     [2,5,9,11],
                     [6,8,12,15],
                     [7,13,14,16]];

    var res1 = matrix.zigzag(n1, corner1, dir1);

    assert.deepEqual(res1, expected1);
    done();
  });

});
