var matrix = exports;

/**
 * Add two matrices together.  Matrices must be of same dimension.
 *
 * @param {Array} matrix A
 * @param {Array} matrix B
 * @return {Array} summed matrix.
 */
matrix.addition = function (arrA, arrB) {
  if ((arrA.length === arrB.length) && (arrA[0].length === arrB[0].length)) {
    var result = new Array(arrA.length);
    for (var i = 0; i < arrA.length; i++) {
      result[i] = new Array(arrA[i].length);
      for (var j = 0; j < arrA[i].length; j++) {
        result[i][j] = arrA[i][j] + arrB[i][j];
        console.log(result[i][j]);
      }
    }
    return result;
  } else {
    throw new Error('Matrix mismatch');
  }
};


/**
 * Scalar multiplication on an matrix.
 *
 * @param {Array} matrix
 * @param {Number} scalar
 * @return {Array} updated matrix
 */
matrix.scalar = function (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      arr[i][j] = val * arr[i][j];
    }
  }
  return arr;
};


/**
 * Transpose a matrix
 *
 * @param {Array} matrix
 * @return {Array} transposed matrix.
 */
matrix.transpose = function (arr) {
  var result = new Array(arr[0].length);
  for (var i = 0; i < arr[0].length; i++) {
    result[i] = new Array(arr.length);
    for (var j = 0; j < arr.length; j++){
      result[i][j] = arr[j][i];
    }
  }
  return result;
};


/**
 * Create an identity matrix of dimension n x n.
 *
 * @param {Number} dimension of the identity array to be returned
 * @return {Array} n x n identity matrix.
 */
matrix.identity = function (n) {
  var result = new Array(n);
  for (var i = 0 ; i < n ; i++) {
    result[i] = new Array(n);
    for (var j = 0 ; j < n ; j++) {
      result[i][j] = (i === j) ? 1 : 0;
    }
  }
  return result;
};


/**
 * Evaluate dot product of two vectors.  Vectors must be of same length.
 *
 * @param {Array} vector
 * @param {Array} vector
 * @return {Array} dot product
 */
matrix.dotproduct = function (vectorA, vectorB) {
  if (vectorA.length === vectorB.length) {
    var result = 0;
    for (var i = 0 ; i < vectorA.length ; i++) {
      result += vectorA[i] * vectorB[i];
    }
    return result;
  } else {
    throw new Error("Vector mismatch");
  }
};


/**
 * Multiply two matrices. They must abide by standard matching.
 *
 * e.g. A x B = (m x n) x (n x m), where n, m are integers who define
 * the dimensions of matrices A, B.
 *
 * @param {Array} matrix
 * @param {Array} matrix
 * @return {Array} result of multiplied matrices
 */
matrix.multiply = function (arrA, arrB) {
  if (arrA[0].length === arrB.length) {
    var result = new Array(arrA.length);
    
    for (var x = 0 ; x < arrA.length ; x++) {
      result[x] = new Array(arrB[0].length);
    }

    var arrB_T = matrix.transpose(arrB);
    
    for (var i = 0 ; i < result.length ; i++) {
      for (var j = 0 ; j < result[i].length ; j++) {
        result[i][j] = matrix.dotproduct(arrA[i],arrB_T[j]);
      }
    }
    return result;
  } else {
    throw new Error("Array mismatch");
  }
};


/**
 * Evaluate determinate of matrix.  Matrix must be of dimension
 * 2 or 3.
 *
 * @param {Array} matrix
 * @return {Number} determinant
 */
matrix.determinant = function (m) {
  if ((m.length === 2) && (m[0].length === 2)) {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  } else if ((m.length === 3) && (m[0].length === 3)) {
    return  m[0][0] * m[1][1] * m[2][2] +
            m[0][1] * m[1][2] * m[2][0] +
            m[0][2] * m[1][0] * m[2][1] -
            m[0][2] * m[1][1] * m[2][0] -
            m[0][1] * m[1][0] * m[2][2] -
            m[0][0] * m[1][2] * m[2][1];
  } else {
    throw new Error('Matrix must be dimension 2 x 2 or 3 x 3');
  }
};
