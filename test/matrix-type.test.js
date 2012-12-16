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

  /*test('should throw an error if a vector larger than two is given for rotation', function(done) {
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
  });*/

});
