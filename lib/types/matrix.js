var matrix = exports;

var Matrix = function(data) {
  if (!data) {
    throw new Error('must provide valid data');
  }

  this.data = data;
}

/**
 * Get all columns in matrix.
 *
 * @return {Number} columns
 */
Matrix.prototype.getCols = function() {
  var columns = [];

  for (var i = 0; i < this.data[0].length; i++) {
    columns.push(this.getCol(i));
  }
  
  return columns;
}

/**
 * Get a specific column. Indexed from left to right.
 * Will return back an array of that column, where
 * the first element is the top, and the last is the bottom,
 * of the column.
 *
 * @param {Number} column index
 * @return {Array} column
 */
Matrix.prototype.getCol = function(i) {
  var column = [];

  for (var j = 0; j < this.data.length; j++) {
    column.push(this.data[j][i]);
  };

  return column;
};

/**
 * Get total number of columns.
 *
 * @return {Number} total quantity of columns.
 */
Matrix.prototype.getColumnCount = function() {
  return this.data[0].length;
}

/**
 * Get all rows.
 *
 * @return {Array} rows.
 */
Matrix.prototype.getRows = function() {
  return this.data;
}

/**
 * Get a specific row, indexed by i.
 *
 * @param {Number} row index.
 * @param {Array} row.
 */
Matrix.prototype.getRow = function(i) {
  return this.data[i];
}

/**
 * Get total number of rows.
 *
 * @return {Number} total number of rows.
 */
Matrix.prototype.getRowCount = function() {
  return this.data.length;
}


Matrix.prototype.invert = function() {
  // TODO
}

/**
 * Transpose the matrix
 */
Matrix.prototype.transpose = function () {
  var result = new Array(this.data[0].length);
  
  for (var i = 0; i < this.data[0].length; i++) {
    result[i] = new Array(this.data.length);
    
    for (var j = 0; j < this.data.length; j++){
      result[i][j] = this.data[j][i];
    }
  }
  
  this.data = result;
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
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  }

  var det = 0;
  var row, col;
  var diagLeft, diagRight;

  for( col=0; col < numCol; col++ ){
    
    diagLeft = m[0][col];
    diagRight = m[0][col];

    for( row=1; row < numRow; row++ ){
      diagRight *= m[row][(((col + row) % numCol) + numCol) % numCol];
      diagLeft *= m[row][(((col - row) % numCol) + numCol) % numCol];
    }
    det += diagRight - diagLeft;
  }

  return det;
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

//export
matrix.Matrix = Matrix;
