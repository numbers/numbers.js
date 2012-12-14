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
 * Evaluate determinate of matrix.  Expect speed
 * degradation for matrices over 4x4. 
 *
 * @param {Array} matrix
 * @return {Number} determinant
 */
matrix.determinant = function (m) {
  var numRow = m.length;
  var numCol = m[0].length;

  if ((numRow === 2) && (numCol === 2)) {
    // If it is a 2*2, run a quick determinant
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  }
  
  // TODO: For matrices of 1 dimension, return a sum of elements

  // For non-2*2 determinants:
  // Uses diagonals to complete the determinant

  var det = 0; // Inititalize a zero determinant

  var row, col; // Intialize indices for the row and column outside the loop
  var diagLeft, diagRight; // Intialize indices for the diagonals 

  for( col=0; col < numCol; col++ ){
    
    // For first row (i.e. row=0)
    diagLeft = m[0][col];
    diagRight = m[0][col];

    for( row=1; row < numRow; row++ ){
      diagRight *= m[row][ ( ( ( col + row ) % numCol ) + numCol ) % numCol ];
      diagLeft *= m[row][ ( ( ( col - row ) % numCol ) + numCol ) % numCol ];
    }
    det += diagRight - diagLeft;


  }
  return det;
};


/**
 * Rotate a two dimensional vector by degree.
 *
 * @param {Array} point 
 * @param {Number} degree
 * @param {String} direction - clockwise or counterclockwise
 * @return {Array} vector
 */
matrix.rotate = function (point, degree, direction) {
  if (point.length === 2) {
    var negate = direction === "clockwise" ? -1 : 1;
    var radians = degree * (Math.PI / 180);

    var transformation = [
      [Math.cos(radians), -1*negate*Math.sin(radians)],
      [negate*Math.sin(radians), Math.cos(radians)]
    ];

    return matrix.multiply(transformation, point);
  } else {
    throw new Error("Only two dimensional operations are supported at this time");
  }
};

/**
 * Scale a two dimensional vector by scale factor x and scale factor y.
 *
 * @param {Array} point 
 * @param {Number} sx
 * @param {Number} sy
 * @return {Array} vector
 */
matrix.scale = function (point, sx, sy) {
  if (point.length === 2) {

    var transformation = [
      [sx, 0],
      [0, sy]
    ];

    return matrix.multiply(transformation, point);
  } else {
    throw new Error("Only two dimensional operations are supported at this time");
  }
};

/**
 * Shear a two dimensional vector by shear factor k.
 *
 * @param {Array} point 
 * @param {Number} k
 * @param {String} direction - xaxis or yaxis
 * @return {Array} vector
 */
matrix.shear = function (point, k, direction) {
  if (point.length === 2) {
    var xplaceholder = direction === "xaxis" ? k : 0;
    var yplaceholder = direction === "yaxis" ? k : 0;

    var transformation = [
      [1, xplaceholder],
      [yplaceholder, 1]
    ];

    return matrix.multiply(transformation, point);
  } else {
    throw new Error("Only two dimensional operations are supported at this time");
  }
};

/**
 * Perform an affine transformation on the given vector.
 *
 * @param {Array} point 
 * @param {Number} tx
 * @param {Number} ty
 * @return {Array} vector
 */
matrix.affine = function (point, tx, ty) {
  if (point.length === 2) {

    var transformation = [
      [1, 0, tx],
      [0, 1, ty],
      [0, 0, 1 ]
    ];

    var newpoint = [
      [point[0][0]],
      [point[1][0]],
      [1]
    ];

    var transformed = matrix.multiply(transformation, newpoint);
    return [
      [transformed[0][0]],
      [transformed[1][0]],
    ];

  } else {
    throw new Error("Only two dimensional operations are supported at this time");
  }
};
