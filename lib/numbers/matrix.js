var matrix = exports;

/**
 * Abstraction of a Javascript matrix.
 * This provides several benefits:
 *  - Easier manipulation and instantiation.
 *  - Ensures no jagged arrays, which Javascript
 *    array of arrays provide no protection against.
 *
 * TODO: More thoroughly check data initializer to ensure safe.
 * TODO: Override fill() method in SquareMatrix.
 *
 */


/** Matrix initializer. */
var Matrix = function(m, n, data) {

  /**
   * Initialize a default matrix with 0.
   *
   * @param {Number} row count.
   * @param {Number} column count.
   * @param {Number} initialization value, if any.
   * @return {Array} array of arrays representing matrix data.
   */
  var initializeMatrix = function(m, n, data) {
    var initial;
    if (typeof data === "number") { initial = data; } 
    else                          { initial = 0; }

    var tmp = new Array(m);
    for (var i = 0; i < tmp.length; i++) {
     tmp[i] = Array(n);
     var l = n;
     while (l--) tmp[i][l] = initial;
    }
    return tmp;
  }

  /** Class fields. */
  this.m    = m,
  this.n    = n,
  this.data = data instanceof Array ? data : initializeMatrix(m, n, data);
};


/**
 * Return a matrix that is the sum of this, plus a specified Matrix.
 *
 * @param {Matrix} matrix B
 * @return {Matrix} summed Matrix.
 */
Matrix.prototype.add = function(other) {
  if (this.cols() === other.cols() && this.rows() === other.rows()) {
    var summed = new Matrix(other.rows(), other.cols());
    for (var i = 0; i < other.rows(); i++) {
      for (var j = 0; j < other.cols(); j++) {
        summed.set(i, j, this.get(i,j) + this.get(i,j));
      }  
    }
    return summed;
  } else {
    throw new IllegalArgumentException("Matrices must be of same dimension.");
  }
};

/**
 * Return a matrix that is the specified scalar multiple.
 *
 * @param {Number} a scalar.
 * @return {Matrix} a scaled matrix.
 */
Matrix.prototype.scale = function(scalar) {
  var scaled = new Matrix(this.rows(), this.cols());

  for (var i = 0; i < this.rows(); i++) {
    for (var j = 0; j < this.cols(); j++) {
      scaled.set(i, j, scalar * this.get(i, j));
    }
  }

  return scaled;
};

/**
 * Get the height of this matrix in rows.
 *
 * @return {Number} number of rows.
 */
Matrix.prototype.rows = function() {
  return this.m;
};

/**
 * Get a particular row as a matrix.
 *
 * @return {Matrix}
 */
Matrix.prototype.row = function(i) {
  return new Matrix(1, this.cols(), this.data[i]);
};

/**
 * Get the length of this matrix in columns.
 *
 * @return {Number} number of columns.
 */
Matrix.prototype.cols = function() {
  return this.n;
};

/**
 * Get a particular column as a matrix.
 *
 * @return {Matrix}
 */
Matrix.prototype.col = function(j) {
  var col = [];
  for (var i = 0; i < this.rows(); i++) { col.push(this.data[i]); }
  return new Matrix(this.rows(), 1, col);
}

/**
 * Get the element at row i and column j.
 *
 * @return {Number} element at row i and column j.
 */
Matrix.prototype.get = function(i, j) {
  return this.data[i][j];
}

/**
 * Set an element at row i and column j.
 *
 * @param {Number} value to set.
 */
Matrix.prototype.set = function(i, j, val) {
  this.data[i][j] = val;
}

/**
 * Fill a matrix with an array of arrays. Must be of size M x N, consistent
 * with the size of this matrix.
 *
 * @param {Array} Array of array of numbers.
 * @return {Matrix} Filled matrix.
 */
Matrix.prototype.fill = function(aoa) {
  if (aoa.length != this.m) {
    throw new IllegalArgumentException("Columns must be of length m.");
  } else {
    for (var i = 0; i < aoa.length; i++) {
      if (aoa[0].length != this.n) {
        throw new IllegalArgumentException("All rows must have the same length.");
      }
      for (var j = 0; j < aoa[0].length; j++) {
        this.data[i][j] = aoa[i][j];    
      }
    }
  }
  return this;
}

/**
 * Return this matrix as an array of arrays.
 *
 * @return {Array} array of arrays of numbers.
 */
Matrix.prototype.toArray = function() {
  return this.data;
}

/**
 * Transpose the matrix.
 *
 * @return {Matrix} transposed matrix.
 */
Matrix.prototype.transpose = function() {
  var result = new Matrix(this.n, this.m);
  for (var j = 0; j < this.cols(); j++) {
    for (var i = 0; i < this.rows(); i++) {
      result.set(i, j, this.get(j, i));  
    }
  }
  return result;
}

/**
 * Pretty print the matrix to console.
 * Uses tabs.
 */
Matrix.prototype.print = function() {
  for (var i = 0; i < this.rows(); i++) {
    var row = "";
    for (var j = 0; j < this.cols(); j++) {
      row += this.get(i,j) + "\t";
    }
    console.log(row);
  }
}

// =============================================================================

/** Instantiate a new square matrix. */
var SquareMatrix = function(n, data) {
  Matrix.call(this, n, n, data);
}

/** "Inherit" members of Matrix. */
SquareMatrix.prototype = new Matrix();

/** Set SquareMatrix constructor to SquareMatrix. */
SquareMatrix.prototype.constructor = SquareMatrix;

/**
 * Determine the determinant of a square matrix.
 * Beware of effect increased matrix dimensions on efficiency.
 *
 * @return {Number} determinant.
 */
SquareMatrix.prototype.determinant = function() {
  var numRow = this.rows();
  var numCol = this.cols();

  if ((numRow === 2) && (numCol === 2)) {
    return this.get(0,0) * this.get(1,1) - this.get(0,1) * this.get(1,0);
  }
  
  var det = 0,
      row, col,
      diagLeft, diagRight;

  for (col = 0; col < numCol; col++) {
    diagLeft  = this.get(0,col);
    diagRight = this.get(0,col);

    for (row = 1; row < numRow; row++) {
      diagRight *=  this.get(row, ( ( ( col + row ) % numCol ) + numCol ) % numCol);
      diagLeft  *=  this.get(row, ( ( ( col - row ) % numCol ) + numCol ) % numCol);
    }
    det += diagRight - diagLeft;
  }

  return det;
};


//export
matrix.Matrix = Matrix;
