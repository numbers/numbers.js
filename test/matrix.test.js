var assert = require('assert');
var numbers = require('../index.js');
var matrix = numbers.matrix;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Matrix Mathematics\033[0m');

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

  test('should return determinant of matrix', function(done) {
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

});
