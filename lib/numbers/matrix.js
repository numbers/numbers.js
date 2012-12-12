var matrix = exports;

var Matrix = function(data) {
  
  //Todo: check for data or default to an empty array
  //Or maybe take dimensions in the constructor and set data elsewhere?
  this.data = data;

}

//possible methods? All java-style names, which can be ditched,
//though we should come up with some consistent conventions.
Matrix.prototype.getCols = function() {
  
}

Matrix.prototype.getCol = function(j) {
  
}

Matrix.prototype.getColumnCount = function() {
  return this.data[0].length;
}

Matrix.prototype.getRows = function() {
  return this.data;
}

Matrix.prototype.getRow = function(i) {
  return this.data[i];
}

Matrix.prototype.getRowCount = function() {
  return this.data.length;
}


Matrix.prototype.invert = function() {
  
}

/**
 * Transpose the matrix
 *
 * @return {Matrix} transposed matrix.
 */
Matrix.prototype.transpose = function () {
  var result = new Array(this.data[0].length);
  
  for (var i = 0; i < this.data[0].length; i++) {
    result[i] = new Array(this.data.length);
    
    for (var j = 0; j < this.data.length; j++){
      result[i][j] = this.data[j][i];
    }
  }
  
  //TODO: Desirable?
  this.data = result;
  
  return this;
};

/**
 * Scalar multiplication on the matrix.
 *
 * @param {Array} matrix
 * @param {Number} scalar
 * @return {Matrix} Updated matrix
 */
Matrix.prototype.scaleBy = function(scalar) {
  for (var i = 0; i < this.data.length; i++) {
    for (var j = 0; j < this.data[i].length; j++) {
      this.data[i][j] *= scalar;
    }
  }

  return this;
}

/**
 * Add two matrices together.  Matrices must be of same dimension.
 *
 * @param {Array} matrix to add
 * @return {Matrix} Updated matrix
 */
Matrix.prototype.add = function (add) {
  if(!Matrix.prototype.isMatrix(add)) {
    throw new Error("Invalid Matrix");
  }
  else if(!(this.getColumnCount() == add.getColumnCount() && this.getRowCount() == add.getRowCount())) {
    throw new Error('Matrix mismatch');
  }
    
  for (var i = 0; i < this.getRowCount(); i++) {
    for (var j = 0; j < this.getColumnCount(); j++) {
      this.data[i][j] += add[i][j];
    }
  }
  
  return this;
};

/**
 * Evaluate determinate of matrix.  Matrix must be of dimension
 * 2 or 3.
 *
 * @return {Number} determinant
 */
Matrix.prototype.getDeterminant = function () {
  if (this.getRowCount() === 2 && this.getColumnCount() === 2) {
    return this.data[0][0] * this.data[1][1] - this.data[0][1] * this.data[1][0];
  }
  else if (this.getRowCount() === 3 && this.getColumnCount() === 3) {
    return  this.data[0][0] * this.data[1][1] * this.data[2][2] +
            this.data[0][1] * this.data[1][2] * this.data[2][0] +
            this.data[0][2] * this.data[1][0] * this.data[2][1] -
            this.data[0][2] * this.data[1][1] * this.data[2][0] -
            this.data[0][1] * this.data[1][0] * this.data[2][2] -
            this.data[0][0] * this.data[1][2] * this.data[2][1];
  }
  else {
    throw new Error('Matrix must be dimension 2 x 2 or 3 x 3');
  }
};

/**
 * Check if the provided arg is a Matrix object.
 * I'm guessing this'll be a useful check to abstract out.
 *
 * @param {Mixed} The argument to examine
 * @return {Boolean} If it's a Matrix.
 */
Matrix.prototype.isMatrix = function(arg) {
  
}

/**
 * Create an identity matrix of dimension n x n.
 *
 * @param {Number} dimension of the identity array to be returned
 * @return {Array} n x n identity matrix.
 */
Matrix.generate.identity = function(n) {
  var result = new Array(n);
  for (var i = 0 ; i < n ; i++) {
    result[i] = new Array(n);
    for (var j = 0 ; j < n ; j++) {
      result[i][j] = (i === j) ? 1 : 0;
    }
  }
  return result;
}


/// STUFF BELOW HERE IS TOTALLY UNDONE

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

//export
matrix.Matrix = Matrix;