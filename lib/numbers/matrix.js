/**
 * matrix.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var matrix = exports;

var ERROR_MATRIX_NOT_SQUARE = 'Matrix must be square.',
  ERROR_VECTOR_NOT_2D = 'Only two dimensional operations are supported at this time.';

/**
 * Check to see if a point is 2D. Used in all 2D vector functions.
 * Throw error if it's not.
 *
 * @param {Array} point in question.
 * @return {undefined} nothing is returned.
 */
matrix._check2DVector = function (point) {
  if (point.length !== 2) {
    throw new Error(ERROR_VECTOR_NOT_2D);
  }
};

/**
 * Return a deep copy of the input matrix.
 *
 * @param {Array} matrix to copy.
 * @return {Array} copied matrix.
 */
matrix.deepCopy = function (arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be a matrix.');
  } else if (arr[0][0] === undefined) {
    throw new Error('Input cannot be a vector.');
  }
  var result = new Array(arr.length);

  for (var i = 0; i < arr.length; i++) {
    result[i] = arr[i].slice();
  }

  return result;
};

/**
 * Return true if matrix is square, false otherwise.
 *
 * @param {Array} arr
 * @return {Boolean}
 */
matrix.isSquare = function (arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Input must be a matrix.');
  } else if (arr[0][0] === undefined) {
    throw new Error('Input cannot be a vector.');
  }
  var rows = arr.length;

  for (var i = 0; i < rows; i++) {
    if (arr[i].length !== rows) return false;
  }

  return true;
};

/**
 * Add two matrices together.  Matrices must be of same dimension.
 *
 * @param {Array} matrix A.
 * @param {Array} matrix B.
 * @return {Array} summed matrix.
 */
matrix.addition = function (arrA, arrB) {
  if (arrA.length !== arrB.length || arrA[0].length !== arrB[0].length) {
    throw new Error('Dimension mismatch');
  }

  var result = new Array(arrA.length),
    i;

  if (!arrA[0].length) {
    // The arrays are vectors.
    for (i = 0; i < arrA.length; i++) {
      result[i] = arrA[i] + arrB[i];
    }
  } else {
    for (i = 0; i < arrA.length; i++) {
      result[i] = new Array(arrA[i].length);

      for (var j = 0; j < arrA[i].length; j++) {
        result[i][j] = arrA[i][j] + arrB[i][j];
      }
    }
  }

  return result;
};

/**
 * Subtract one matrix from another (A - B).  Matrices must be of same dimension.
 *
 * @param {Array} matrix A.
 * @param {Array} matrix B.
 * @return {Array} subtracted matrix.
 */
matrix.subtraction = function (arrA, arrB) {
  if (arrA.length !== arrB.length || arrA[0].length !== arrB[0].length) {
    throw new Error("Dimension mismatch");
  }

  var result = new Array(arrA.length),
    i;

  if (!arrA[0].length) {
    // The arrays are vectors.
    for (i = 0; i < arrA.length; i++) {
      result[i] = arrA[i] - arrB[i];
    }
  } else {
    for (i = 0; i < arrA.length; i++) {
      result[i] = new Array(arrA[i].length);

      for (var j = 0; j < arrA[i].length; j++) {
        result[i][j] = arrA[i][j] - arrB[i][j];
      }
    }
  }

  return result;
};

/**
 * Scalar multiplication on an matrix.
 *
 * @param {Array} matrix.
 * @param {Number} scalar.
 * @return {Array} updated matrix.
 */
matrix.scalar = function (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      arr[i][j] = val * arr[i][j];
    }
  }

  return arr;
};

matrix.transposeMatrix = function (arr) {
  var result = new Array(arr[0].length);

  for (var i = 0; i < arr[0].length; i++) {
    result[i] = new Array(arr.length);

    for (var j = 0; j < arr.length; j++) {
      result[i][j] = arr[j][i];
    }
  }

  return result;
};

/**
 * Transpose a row vector.
 *
 * @param {Array} row vector.
 * @return {Array} transposed row vector (column vector).
 */
matrix.transposeRowVector = function (arr) {
  var result = new Array(arr.length);
  for (var i = 0; i < arr.length; i++) {
    result[i] = [arr[i]];
  }
  return result;
};

/**
 * Transpose a column vector.
 *
 * @param {Array} column vector.
 * @return {Array} transposed column vector (row vector).
 */
matrix.transposeColumnVector = function (arr) {
  var result = new Array(arr.length);
  for (var i = 0; i < arr.length; i++) {
    result[i] = arr[i][0];
  }
  return result;
};

/**
 * Transpose a matrix.
 *
 * @param {Array} matrix.
 * @return {Array} transposed matrix.
 */
matrix.transpose = function (arr) {
  if (arr[0].length > 1) {
    return matrix.transposeMatrix(arr);
  } else if (arr[0].length) {
    return matrix.transposeColumnVector(arr);
  } else {
    return matrix.transposeRowVector(arr);
  }
};

/**
 * Create an identity matrix of dimension n x n.
 *
 * @param {Number} dimension of the identity array to be returned.
 * @return {Array} n x n identity matrix.
 */
matrix.identity = function (n) {
  var result = new Array(n);

  for (var i = 0; i < n; i++) {
    result[i] = new Array(n);
    for (var j = 0; j < n; j++) {
      result[i][j] = (i === j) ? 1 : 0;
    }
  }

  return result;
};

/**
 * Evaluate dot product of two vectors.  Vectors must be of same length.
 *
 * @param {Array} vector.
 * @param {Array} vector.
 * @return {Array} dot product.
 */
matrix.dotproduct = function (vectorA, vectorB) {
  if (vectorA.length !== vectorB.length) {
    throw new Error("Vector mismatch");
  }

  var result = 0;
  for (var i = 0; i < vectorA.length; i++) {
    result += vectorA[i] * vectorB[i];
  }
  return result;
};

/**
 * Perform vector-matrix multiplication.
 *
 * e.g. A x B = (m x n) x (n x m), where n, m are integers who define
 * the dimensions of vector A, matrix B.
 *
 * @param {Array} vector.
 * @param {Array} matrix.
 * @return {Array} result.
 */
matrix.multiplyVecMat = function (vec, mat) {
  if (vec.length !== mat.length) {
    throw new Error("Dimension mismatch");
  }

  var result = new Array(mat[0].length);

  var mat_T = matrix.transposeMatrix(mat);

  for (var i = 0; i < result.length; i++) {
    result[i] = matrix.dotproduct(vec, mat_T[i]);
  }
  return result;
};

/**
 * Perform matrix-vector multiplication.
 *
 * e.g. A x B = (m x n) x (n x m), where n, m are integers who define
 * the dimensions of matrix A, vector B.
 *
 * @param {Array} matrix.
 * @param {Array} vector.
 * @return {Array} result.
 */
matrix.multiplyMatVec = function (mat, vec) {
  if (mat[0].length !== vec.length) {
    throw new Error("Dimension mismatch");
  }

  var result = new Array(mat.length);

  var vec_T = matrix.transposeColumnVector(vec);

  for (var i = 0; i < result.length; i++) {
    result[i] = [matrix.dotproduct(mat[i], vec_T)];
  }
  return result;
};

/**
 * Perform matrix-matrix multiplication.
 *
 * e.g. A x B = (m x n) x (n x m), where n, m are integers who define
 * the dimensions of matrices A, B.
 *
 * @param {Array} matrix.
 * @param {Array} matrix.
 * @return {Array} result.
 */
matrix.multiplyMatMat = function (arrA, arrB) {
  if (arrA[0].length !== arrB.length) {
    throw new Error("Dimension mismatch");
  }

  var result = new Array(arrA.length);

  for (var x = 0; x < arrA.length; x++) {
    result[x] = new Array(arrB[0].length);
  }

  var arrB_T = matrix.transposeMatrix(arrB);

  for (var i = 0; i < result.length; i++) {
    for (var j = 0; j < result[i].length; j++) {
      result[i][j] = matrix.dotproduct(arrA[i], arrB_T[j]);
    }
  }
  return result;
};

/**
 * Perform matrix-matrix, matrix-vector or vector-matrix multiplication.
 *
 * e.g. A x B = (m x n) x (n x m), where n, m are integers who define
 * the dimensions of matrices/vectors A, B.
 *
 * @param {Array} matrix / vector.
 * @param {Array} matrix / vector.
 * @return {Array} result.
 */
matrix.multiply = function (arrA, arrB) {
  if (arrA[0].length > 1 && arrB[0].length > 1) {
    return matrix.multiplyMatMat(arrA, arrB);
  } else if (arrA[0].length > 1) {
    return matrix.multiplyMatVec(arrA, arrB);
  } else {
    return matrix.multiplyVecMat(arrA, arrB);
  }
};

/**
 * Evaluate determinate of matrix.  Expect speed
 * degradation for matrices over 4x4.
 *
 * @param {Array} matrix.
 * @return {Number} determinant.
 */
matrix.determinant = function (m) {
  var numRow = m.length;
  var numCol = m[0].length;
  var det = 0;
  var row, col;
  var diagLeft, diagRight;

  if (!matrix.isSquare(m)) {
    throw new Error(ERROR_MATRIX_NOT_SQUARE);
  }

  if (numRow === 1) {
    return m[0][0];
  } else if (numRow === 2) {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  }

  for (col = 0; col < numCol; col++) {
    diagLeft = m[0][col];
    diagRight = m[0][col];

    for (row = 1; row < numRow; row++) {
      diagRight *= m[row][(((col + row) % numCol) + numCol) % numCol];
      diagLeft *= m[row][(((col - row) % numCol) + numCol) % numCol];
    }

    det += diagRight - diagLeft;
  }

  return det;
};

/**
 * Returns a LUP decomposition of the given matrix such that:
 *
 * A*P = L*U
 *
 * Where
 * A is the input matrix
 * P is a pivot matrix
 * L is a lower triangular matrix
 * U is a upper triangular matrix
 *
 * This method returns an array of three matrices such that:
 *
 * matrix.luDecomposition(array) = [L, U, P]
 *
 * @param {Array} arr
 * @return {Array} array of matrices [L, U, P]
 */
matrix.lupDecomposition = function (arr) {
  if (!matrix.isSquare(arr)) {
    throw new Error(ERROR_MATRIX_NOT_SQUARE);
  }

  var size = arr.length;

  var LU = matrix.deepCopy(arr);
  var P = matrix.transpose(matrix.identity(size));
  var currentRow;
  var currentColumn = new Array(size);

  this.getL = function (a) {
    var m = a[0].length;
    var L = matrix.identity(m);

    for (var i = 0; i < m; i++) {
      for (var j = 0; j < m; j++) {
        if (i > j) {
          L[i][j] = a[i][j];
        }
      }
    }

    return L;
  };

  this.getU = function (a) {
    var m = a[0].length;
    var U = matrix.identity(m);

    for (var i = 0; i < m; i++) {
      for (var j = 0; j < m; j++) {
        if (i <= j) {
          U[i][j] = a[i][j];
        }
      }
    }

    return U;
  };

  for (var j = 0; j < size; j++) {
    var i;
    for (i = 0; i < size; i++) {
      currentColumn[i] = LU[i][j];
    }

    for (i = 0; i < size; i++) {
      currentRow = LU[i];

      var minIndex = Math.min(i, j);
      var s = 0;

      for (var k = 0; k < minIndex; k++) {
        s += currentRow[k] * currentColumn[k];
      }

      currentRow[j] = currentColumn[i] -= s;
    }

    //Find pivot
    var pivot = j;
    for (i = j + 1; i < size; i++) {
      if (Math.abs(currentColumn[i]) > Math.abs(currentColumn[pivot])) {
        pivot = i;
      }
    }

    if (pivot !== j) {
      LU = matrix.rowSwitch(LU, pivot, j);
      P = matrix.rowSwitch(P, pivot, j);
    }

    if (j < size && LU[j][j] !== 0) {
      for (i = j + 1; i < size; i++) {
        LU[i][j] /= LU[j][j];
      }
    }
  }

  return [this.getL(LU), this.getU(LU), P];
};

/**
 * Rotate a two dimensional vector by degree.
 *
 * @param {Array} point.
 * @param {Number} degree.
 * @param {String} direction - clockwise or counterclockwise.
 * @return {Array} vector.
 */
matrix.rotate = function (point, degree, direction) {
  matrix._check2DVector(point);

  var negate = direction === 'clockwise' ? -1 : 1;
  var radians = degree * (Math.PI / 180);

  var transformation = [
    [Math.cos(radians), -1 * negate * Math.sin(radians)],
    [negate * Math.sin(radians), Math.cos(radians)]
  ];

  return matrix.multiply(transformation, point);
};

/**
 * Scale a two dimensional vector by scale factor x and scale factor y.
 *
 * @param {Array} point.
 * @param {Number} sx.
 * @param {Number} sy.
 * @return {Array} vector.
 */
matrix.scale = function (point, sx, sy) {
  matrix._check2DVector(point);

  var transformation = [
    [sx, 0],
    [0, sy]
  ];

  return matrix.multiply(transformation, point);
};

/**
 * Shear a two dimensional vector by shear factor k.
 *
 * @param {Array} point.
 * @param {Number} k.
 * @param {String} direction - xaxis or yaxis.
 * @return {Array} vector.
 */
matrix.shear = function (point, k, direction) {
  matrix._check2DVector(point);

  var xplaceholder = direction === 'xaxis' ? k : 0;
  var yplaceholder = direction === 'yaxis' ? k : 0;

  var transformation = [
    [1, xplaceholder],
    [yplaceholder, 1]
  ];

  return matrix.multiply(transformation, point);
};

/**
 * Perform an affine transformation on the given vector.
 *
 * @param {Array} point.
 * @param {Number} tx.
 * @param {Number} ty.
 * @return {Array} vector.
 */
matrix.affine = function (point, tx, ty) {
  matrix._check2DVector(point);
  var transformation = [
    [1, 0, tx],
    [0, 1, ty],
    [0, 0, 1]
  ];

  var newpoint = [
    [point[0][0]],
    [point[1][0]],
    [1]
  ];

  var transformed = matrix.multiply(transformation, newpoint);

  return [
    [transformed[0][0]],
    [transformed[1][0]]
  ];
};

/**
 * Scales a row of a matrix by a factor and returns the updated matrix.
 * Used in row reduction functions.
 *
 * @param {Array} matrix.
 * @param {Number} row.
 * @param {Number} scale.
 */
matrix.rowScale = function (m, row, scale) {
  var result = new Array(m.length);

  for (var i = 0; i < m.length; i++) {
    result[i] = new Array(m[i].length);

    for (var j = 0; j < m[i].length; j++) {
      if (i === row) {
        result[i][j] = scale * m[i][j];
      } else {
        result[i][j] = m[i][j];
      }
    }
  }

  return result;
};

/**
 * Swaps two rows of a matrix  and returns the updated matrix.
 * Used in row reduction functions.
 *
 * @param {Array} matrix.
 * @param {Number} row1.
 * @param {Number} row2.
 */
matrix.rowSwitch = function (m, row1, row2) {
  var result = new Array(m.length);

  for (var i = 0; i < m.length; i++) {
    result[i] = new Array(m[i].length);

    for (var j = 0; j < m[i].length; j++) {
      if (i === row1) {
        result[i][j] = m[row2][j];
      } else if (i === row2) {
        result[i][j] = m[row1][j];
      } else {
        result[i][j] = m[i][j];
      }
    }
  }
  return result;
};

/**
 * Adds a multiple of one row to another row
 * in a matrix and returns the updated matrix.
 * Used in row reduction functions.
 *
 * @param {Array} matrix.
 * @param {Number} row1.
 * @param {Number} row2.
 */
matrix.rowAddMultiple = function (m, from, to, scale) {
  var result = new Array(m.length);

  for (var i = 0; i < m.length; i++) {
    result[i] = new Array(m[i].length);

    for (var j = 0; j < m[i].length; j++) {
      if (i === to) {
        result[to][j] = m[to][j] + scale * m[from][j];
      } else {
        result[i][j] = m[i][j];
      }
    }
  }

  return result;
};

/**
 * Gauss-Jordan Elimination
 *
 * @param {Array} matrix.
 * @param {Number} epsilon.
 * @return {Array} RREF matrix.
 */
matrix.GaussJordanEliminate = function (m, epsilon) {
  // Translated from:
  // http://elonen.iki.fi/code/misc-notes/python-gaussj/index.html
  var eps = (typeof epsilon === 'undefined') ? 1e-10 : epsilon;

  var h = m.length;
  var w = m[0].length;
  var y = -1;
  var y2, x, c;

  while (++y < h) {
    // Pivot.
    var maxrow = y;
    y2 = y;
    while (++y2 < h) {
      if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y]))
        maxrow = y2;
    }
    var tmp = m[y];
    m[y] = m[maxrow];
    m[maxrow] = tmp;

    // Singular
    if (Math.abs(m[y][y]) <= eps) {
      return m;
    }

    // Eliminate column
    y2 = y;
    while (++y2 < h) {
      c = m[y2][y] / m[y][y];
      x = y - 1;
      while (++x < w) {
        m[y2][x] -= m[y][x] * c;
      }
    }
  }

  // Backsubstitute.
  y = h;
  while (--y >= 0) {
    c = m[y][y];
    y2 = -1;
    while (++y2 < y) {
      x = w;
      while (--x >= y) {
        m[y2][x] -= m[y][x] * m[y2][y] / c;
      }
    }
    m[y][y] /= c;

    // Normalize row
    x = h - 1;
    while (++x < w) {
      m[y][x] /= c;
    }
  }

  return m;
};

/**
 * Alias to Gauss-Jordan Elimination
 *
 * @param {Array} matrix.
 * @param {Number} epsilon.
 * @return {Array} RREF matrix.
 */
matrix.rowReduce = function (m, epsilon) {
  return matrix.GaussJordanEliminate(m, epsilon);
};

/**
 * nxn matrix inversion
 *
 * @param {Array} matrix.
 * @return {Array} inverted matrix.
 */
matrix.inverse = function (m) {
  if (!matrix.isSquare(m)) {
    throw new Error(ERROR_MATRIX_NOT_SQUARE);
  }

  var n = m.length,
    identity = matrix.identity(n),
    i;

  // AI
  for (i = 0; i < n; i++) {
    m[i] = m[i].concat(identity[i]);
  }

  // inv(IA)
  m = matrix.GaussJordanEliminate(m);

  // inv(A)
  for (i = 0; i < n; i++) {
    m[i] = m[i].slice(n);
  }

  return m;
};

/**
 * Get a column of a matrix as a vector.
 *
 * @param {Array} matrix
 * @param {Int} column number
 * @return {Array} column
 */
matrix.getCol = function (M, n) {
  var result = new Array(M.length);
  if (n < 0) {
    throw new Error('The specified column must be a positive integer.');
  } else if (n >= M[0].length) {
    throw new Error('The specified column must be between 0 and the number of columns - 1.');
  }
  for (var i = 0; i < M.length; i++) {
    result[i] = M[i][n];
  }
  return result;
};

/**
 * Reorder the rows of a matrix based off an array of numbers.
 *
 * @param {Array} matrix
 * @param {Array} desired re-ordering
 * @return {Array} reordered matrix
 */
matrix.reorderRows = function (M, L) {
  var result = [];
  if (L === undefined) {
    throw new Error('A reordering array must be entered.');
  } else if (L.length !== M.length) {
    throw new Error('The reordered matrix must have the same number of rows as the original matrix.');
  }
  for (var i = 0; i < L.length; i++) {
    if (L[i] < 0) {
      throw new Error('The desired order of the rows must be positive integers.');
    } else if (L[i] >= L.length) {
      throw new Error('The desired order of the rows must start at 0 and end at the number of rows - 1.');
    } else {
      result.push(M[L[i]]);
    }
  }
  return result;
};

/**
 * Reorder the columns of a matrix based off an array of numbers.
 *
 * @param {Array} matrix
 * @param {Array} desired re-ordering
 * @return {Array} reordered matrix
 */
matrix.reorderCols = function (M, L) {
  var result = [];
  if (L === undefined) {
    throw new Error('Please enter a desired reordering array.');
  } else if (L.length !== M[0].length) {
    throw new Error('The reordered matrix must have the same number of columns as the original matrix.');
  }
  for (var i = 0; i < L.length; i++) {
    if (L[i] < 0) {
      throw new Error('The desired order of the columns must be positive integers.');
    } else if (L[i] >= L.length) {
      throw new Error('The desired order of the columns must start at 0 and end at the number of columns - 1.');
    } else {
      result.push(matrix.getCol(M, L[i]));
    }
  }
  return matrix.transpose(result);
};

/**
 * Reverse the rows of a matrix.
 *
 * @param {Array} matrix
 * @return {Array} reversed matrix
 */
matrix.reverseRows = function (M) {
  var L = [];
  for (var i = M.length - 1; i > -1; i--) {
    L.push(i);
  }
  return matrix.reorderRows(M, L);
};

/**
 * Reverse the columns of a matrix.
 *
 * @param {Array} matrix
 * @return {Array} reversed matrix
 */
matrix.reverseCols = function (M) {
  var L = [];
  for (var i = M.length - 1; i > -1; i--) {
    L.push(i);
  }
  return matrix.reorderCols(M, L);
};

/**
 * Create a n x m matrix of zeros.
 *
 * @param {Int} number of rows
 * @param {Int} number of columns
 * @return {Array} matrix
 */
matrix.zeros = function (n, m) {
  var M = new Array(n);
  if (n < 1 || m < 1) {
    throw new Error('The matrix dimensions must be positive integers.');
  }
  n = Math.ceil(n);
  m = Math.ceil(m);
  for (var i = 0; i < n; i++) {
    var empty = new Array(m);
    for (var j = 0; j < m; j++) {
      empty[j] = 0;
    }
    M[i] = empty;
  }
  return M;
};

/**
 * Create a zigzag matrix. point represents the starting corner,
 * dir represents which direction to begin moving in. There are
 * 8 possible permutations for this. Rounds dimension upwards.
 *
 * @param {Int} size of (square) matrix
 * @param {String} corner (TL,TR,BL,BR)
 * @param {String} direction (V,H)
 * @return {Array} zigzag matrix.
 */
matrix.zigzag = function (n, point, dir) {
  if (n <= 1) {
    throw new Error('Matrix size must be at least 2x2.');
  }
  n = Math.ceil(n);
  var mat = matrix.zeros(n, n);

  //create one kind of permutation - all other permutations can be 
  //created from this particular permutation through transformations
  var BRH = function (M) { //starting at bottom right, moving horizontally
    var jump = false,
      tl = n * n,
      br = 1,
      inc = 1,
      row, col, val, i, j;
    M[0][0] = tl;
    M[n - 1][n - 1] = br;

    for (i = 1; i < n; i++) {
      //generate top/bottom row
      if (jump) {
        tl -= 4 * inc;
        br += 4 * inc;
        inc++;
      } else {
        tl--;
        br++;
      }

      M[0][i] = tl;
      M[n - 1][n - 1 - i] = br;
      jump = !jump;
    }

    var dec = true;
    for (i = 1; i < n; i++) {
      //iterate diagonally from top row
      row = 0;
      col = i;
      val = M[row][col];

      for (j = 1; j < i + 1; j++) {
        if (dec) {
          val -= 1;
        } else {
          val += 1;
        }
        row++;
        col--;
        M[row][col] = val;
      }
      dec = !dec;
    }

    if (n % 2 === 0) {
      dec = true;
    } else {
      dec = false;
    }
    for (i = 1; i < n - 1; i++) {
      //iterate diagonally from bottom row
      row = n - 1;
      col = i;
      val = M[row][col];

      for (j = 1; j < n - i; j++) {
        if (dec) {
          val--;
        } else {
          val++;
        }
        row--;
        col++;
        M[row][col] = val;
      }
      dec = !dec;
    }
    return M;
  };

  var BRV = function (M) { //starting at bottom right, moving vertically
    return matrix.transpose(BRH(M));
  };

  var BLH = function (M) { //starting at bottom left, moving horizontally
    return matrix.reverseCols(BRH(M));
  };

  var BLV = function (M) { //starting at bottom left, moving vertically
    return matrix.reverseRows(TLV(BLH(M)));
  };

  var TRH = function (M) { //starting at top right, moving horizontally
    return matrix.reverseRows(BRH(M));
  };

  var TRV = function (M) { //starting at top right, moving vertically
    return matrix.reverseRows(BRV(M));
  };

  var TLH = function (M) { //starting at top left, moving horizontally
    return matrix.reverseCols(matrix.reverseRows(BRH(M)));
  };

  var TLV = function (M) { //starting at top left, moving vertically
    return matrix.transpose(TLH(M));
  };

  if ((point === 'BR') && (dir === 'H')) {
    return (BRH(mat));
  } else if ((point === 'BR') && (dir === 'V')) {
    return (BRV(mat));
  } else if ((point === 'BL') && (dir === 'H')) {
    return (BLH(mat));
  } else if ((point === 'BL') && (dir === 'V')) {
    return (BLV(mat));
  } else if ((point === 'TR') && (dir === 'H')) {
    return (TRH(mat));
  } else if ((point === 'TR') && (dir === 'V')) {
    return (TRV(mat));
  } else if ((point === 'TL') && (dir === 'H')) {
    return (TLH(mat));
  } else if ((point === 'TL') && (dir === 'V')) {
    return (TLV(mat));
  } else {
    throw new Error('Enter the direction (V,H) and corner (BR,BL,TR,TL) correctly.');
  }
};

/**
 * Calculate the p-norm of a vector. Specific cases include:
 *   - Infinity (largest absolute entry)
 *   - -Infinity (smallest absolute entry)
 *
 * @param {Array} vector
 * @param {Number} the value of p (norm order)
 * @return {Number} the p-norm of v
 */
matrix.vectorNorm = function (v, p) {
  // calculate the p'th norm of a vector v
  if (!(Array.isArray(v)) || (v.length === 0)) {
    throw new Error('Vector must be an array of at least length 1.');
  } else if ((typeof p !== 'undefined') && (typeof p !== 'number')) {
    throw new Error('Norm order must be a number.');
  }

  p = (typeof p === 'undefined') ? 2 : p;
  var n = v.length,
    ans = 0,
    term, i;

  switch (p) {

  case Infinity:
    for (i = 0; i < n; i++) {
      term = Math.abs(v[i]);
      if (term > ans) {
        ans = term;
      }
    }
    break;

  case -Infinity:
    ans = Infinity;
    for (i = 0; i < n; i++) {
      term = Math.abs(v[i]);
      if (term < ans) {
        ans = term;
      }
    }
    break;

  default:
    for (i = 0; i < n; i++) {
      ans += Math.pow(Math.abs(v[i]), p);
    }
    ans = Math.pow(ans, 1 / p);
    break;
  }

  return ans;
};

/**
 * Calculate the p-norm of a matrix. Specific cases include:
 *   - Infinity (largest absolute row)
 *   - -Infinity (smallest absolute row)
 *   - 1 (largest absolute column)
 *   - -1 (smallest absolute column)
 *   - 2 (largest singular value)
 *   - -2 (smallest singular value)
 *   - null (Frobenius norm)
 *
 * @param {Array} vector
 * @param {Number} the value of p (norm order)
 * @return {Number} the p-norm of M
 */
matrix.matrixNorm = function (M, p) {
  if (!(Array.isArray(M)) || (M.length === 0) || !Array.isArray(M[0])) {
    throw new Error('Matrix must be an array of at least length 1.');
  } else if ((typeof p !== 'undefined') && (typeof p !== 'number') && (p !== null)) {
    throw new Error('Norm order must be a number or null.');
  }

  p = (typeof p === 'undefined') ? null : p;
  var m = M.length, //number of rows
    n = M[0].length, //number of cols
    ans = 0,
    term, i, j;

  switch (p) {

    // the largest value when absolute-ing and summing each row
  case Infinity:
    for (i = 0; i < m; i++) {
      term = 0;

      for (j = 0; j < n; j++) {
        term += Math.abs(M[i][j]);
      }

      if (term > ans) {
        ans = term;
      }
    }
    break;

    // the smallest value when absolute-ing and summing each row
  case -Infinity:
    ans = Infinity;
    for (i = 0; i < m; i++) {
      term = 0;

      for (j = 0; j < n; j++) {
        term += Math.abs(M[i][j]);
      }

      if (term < ans) {
        ans = term;
      }
    }
    break;

    // the largest value when absolute-ing and summing each column
  case 1:
    for (i = 0; i < n; i++) {
      term = 0;

      for (j = 0; j < m; j++) {
        term += Math.abs(M[j][i]);
      }

      if (term > ans) {
        ans = term;
      }
    }
    break;

    // the smallest value when absolute-ing and summing each column
  case -1:
    ans = Infinity;
    for (i = 0; i < n; i++) {
      term = 0;

      for (j = 0; j < m; j++) {
        term += Math.abs(M[j][i]);
      }

      if (term < ans) {
        ans = term;
      }
    }
    break;

    // the Frobenius norm
  case null:
    for (i = 0; i < m; i++) {
      for (j = 0; j < n; j++) {
        ans += Math.pow(M[i][j], 2);
      }
    }
    ans = Math.pow(ans, 0.5);
    break;

    // largest singular value
  case 2:
    throw new Error("Singular values are not yet supported in numbers.js.");

    // smallest singular value
  case -2:
    throw new Error("Singular values are not yet supported in numbers.js.");

    // entry-wise norm; analogous to that of the entry-wise vector norm.
  default:
    for (i = 0; i < m; i++) {
      for (j = 0; j < n; j++) {
        ans += Math.pow(Math.abs(M[i][j]), p);
      }
    }
    ans = Math.pow(ans, 1 / p);

  }

  return ans;
};

/**
 * Determines if a matrix has an upper bandwidth of q.
 *
 * @param {Array} matrix
 * @param {Number} upper bandwidth
 * @return {Boolean} true if upper bandwidth is q; false otherwise
 */
matrix.isUpperBand = function (M, q) {
  if (!Array.isArray(M) || !Array.isArray(M[0]) || M.length < 2) {
    throw new Error('Matrix must be an array of at least dimension 2.');
  } else if (typeof q !== 'number' || q < 0 || (q % 1) !== 0) {
    throw new Error('Upper bandwidth must be a nonzero integer.');
  }
  var result = true,
    n = M[0].length,
    cnt = 0;

  for (var i = q + 1; i < n; i++) {
    if (M[cnt][i] !== 0) {
      result = false;
      break;
    }
    cnt++;
  }
  return result;
};

/**
 * Determines if a matrix has an lower bandwidth of p.
 *
 * @param {Array} matrix
 * @param {Number} lower bandwidth
 * @return {Boolean} true if lower bandwidth is p; false otherwise
 */
matrix.isLowerBand = function (M, p) {
  if (!Array.isArray(M) || !Array.isArray(M[0]) || M.length < 2) {
    throw new Error('Matrix must be an array of at least dimension 2.');
  } else if (typeof p !== 'number' || p < 0 || (p % 1) !== 0) {
    throw new Error('Lower bandwidth must be a nonzero integer.');
  }
  var result = true,
    m = M.length,
    cnt = 0;

  for (var i = p + 1; i < m; i++) {
    if (M[i][cnt] !== 0) {
      result = false;
      break;
    }
    cnt++;
  }
  return result;
};

/**
 * Add all of the elements in an array together except for the i'th one.
 * This is a helper function for determining diagonal dominance, and it
 * should be noted that each element is passed to Math.abs() beforehand.
 *
 * @param {Array} array
 * @param {Int} index of element to ignore.
 * @return {Number} sum.
 */
var sumNondiagonalElements = function (arr, i) {
  var sum = 0,
    j;

  for (j = 0; j < i; j++) {
    sum += Math.abs(arr[j]);
  }
  for (j = i + 1; j < arr.length; j++) {
    sum += Math.abs(arr[j]);
  }
  return sum;
};

/**
 * Determines if a matrix is (weak) row diagonally-dominant.
 *
 * @param {Array} matrix
 * @return {Boolean} true if so, false otherwise.
 */
matrix.isRowDD = function (M) {
  var n = M.length;
  if (!matrix.isSquare(M)) {
    throw new Error(ERROR_MATRIX_NOT_SQUARE);
  }

  for (var i = 0; i < n; i++) {
    var row = M[i],
      diag = row[i],
      sum = sumNondiagonalElements(row, i);

    if (Math.abs(diag) < sum) {
      return false;
    }
  }
  return true;
};

/**
 * Determines if a matrix is strictly row diagonally-dominant.
 *
 * @param {Array} matrix
 * @return {Boolean} true if so, false otherwise.
 */
matrix.isStrictlyRowDD = function (M) {
  if (!matrix.isSquare(M)) {
    throw new Error(ERROR_MATRIX_NOT_SQUARE);
  }

  var n = M.length;

  for (var i = 0; i < n; i++) {
    var row = M[i],
      diag = row[i],
      sum = sumNondiagonalElements(row, i);

    if (Math.abs(diag) <= sum) {
      return false;
    }
  }
  return true;
};

/**
 * Determines if a matrix is (weak) column diagonally-dominant.
 *
 * @param {Array} matrix
 * @return {Boolean} true if so, false otherwise.
 */
matrix.isColumnDD = function (M) {
  if (!matrix.isSquare) {
    throw new Error(ERROR_MATRIX_NOT_SQUARE);
  }

  var n = M.length;

  for (var i = 0; i < n; i++) {
    var col = matrix.getCol(M, i),
      diag = col[i],
      sum = sumNondiagonalElements(col, i);

    if (Math.abs(diag) < sum) {
      return false;
    }
  }
  return true;
};

/**
 * Determines if a matrix is strictly column diagonally-dominant.
 *
 * @param {Array} matrix
 * @return {Boolean} true if so, false otherwise.
 */
matrix.isStrictlyColumnDD = function (M) {
  if (!matrix.isSquare(M)) {
    throw new Error(ERROR_MATRIX_NOT_SQUARE);
  }

  var n = M.length;

  for (var i = 0; i < n; i++) {
    var col = matrix.getCol(M, i),
      diag = col[i],
      sum = sumNondiagonalElements(col, i);

    if (Math.abs(diag) <= sum) {
      return false;
    }
  }
  return true;
};
