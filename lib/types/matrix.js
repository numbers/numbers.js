var matrix = require('../numbers/matrix');

var Matrix = function (data) {
  if (data) {
    this.data = data;
    this.previousTransformations = [];
    
    //cache row and colCount so .length
    //isn't constantly recalculatd.
    this.colCount = this.data[0].length;
    this.rowCount = this.data.length;
  }
}

Matrix.prototype.toArray = function() {
  return this.data;
}

/**
 * Fill a matrix with an array of arrays.
 *
 * @param {Array} Array of array of numbers.
 * @return {Matrix} Updated/Filled matrix.
 */
Matrix.prototype.fill = function(aoa) {
  for (var i = 0, rowCount = aoa.length, colCount = aoa[0].length; i < rowCount; i++) {
    if (aoa[i].length != colCount) {
        throw new IllegalArgumentException("All rows must have the same length.");
    }
    for (var j = 0; j < colCount; j++) {
        this.data[i][j] = aoa[i][j];    
    }
  }
  
  this.colCount = colCount;
  this.rowCount = rowCount;

  return this;
}

/**
 * Get all columns in matrix.
 *
 * @return {Number} columns
 */
Matrix.prototype.getCols = function() {
  var columns = [];

  for (var i = 0; i < this.colCount; i++) {
    columns.push(this.getCol(i));
  }
  
  return columns;
}

/**
 * Get a specific element. Indexed from left to right.
 * Will return back an number of that column/row.
 *
 * @param {Number} column index
 * @param {Number} row index
 * @return {Number} element
 */
Matrix.prototype.getElement = function(col, row) {
  return this.data[col][row];
};

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

  for (var j = 0; j < this.rowCount; j++) {
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
  return this.colCount;
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
  return this.rowCount;
}


Matrix.prototype.invert = function() {
  if (this.colCount === 2 && this.rowCount === 2) {
    var a = this.data[0][0];
    var b = this.data[0][1];
    var c = this.data[1][0];
    var d = this.data[1][1];
    var newMatrix = new Matrix([
      [d, -1*b],
      [-1*c, a]
    ]);
    
    this.data = newMatrix.scaleBy((1 / (a*d - b*c))).data;
    return this;

  } else {
    throw new Error('Only two by two matrices currently supported');
  }
}

/**
 * Transpose the matrix
 */
Matrix.prototype.transpose = function () {
  var result = [];
  
  for (var i = 0; i < this.colCount; i++) {
    result[i] = [];
    
    for (var j = 0; j < this.rowCount; j++){
      result[i][j] = this.data[j][i];
    }
  }
  
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
  for (var i = 0; i < this.rowCount; i++) {
    for (var j = 0; j < this.colCount; j++) {
      this.data[i][j] *= scalar;
    }
  }

  return this;
}

/**
 * Multiply two matrices. They must abide by standard matching.
 *
 * e.g. A x B = (m x n) x (n x m), where n, m are integers who define
 * the dimensions of matrices A, B.
 *
 * @param {Matrix} matrix
 * @return {Matrix} result of multiplied matrices
 */
Matrix.prototype.multiply = function (matr) {
  if (this.colCount === matr.rowCount) {
    var result = new Array(this.rowCount);
    
    for (var x = 0 ; x < this.rowCount; x++) {
      result[x] = new Array(matr.colCount);
    }

    var t = matr.clone().transpose();
    
    for (var i = 0 ; i < result.length ; i++) {
      for (var j = 0 ; j < result[i].length ; j++) {
        result[i][j] = new Matrix([this.data[i]]).dotproduct(new Matrix([t.data[j]]));
      }
    }

    this.data = result;
    return this;
  } else {
    throw new Error("Array mismatch");
  }
};

/**
 * Evaluate dot product of two vectors.  Vectors must be of same length.
 *
 * @param {Array} vector
 * @return {Array} dot product
 */
Matrix.prototype.dotproduct = function (vector) {
  if (this.colCount === vector.colCount) {
    var result = 0;
    for (var i = 0 ; i < this.colCount ; i++) {
      result += this.data[0][i] * vector.data[0][i];
    }
    return result;
  } else {
    throw new Error("Vector mismatch");
  }
};

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
  else if(!(this.colCount == add.getColumnCount() && this.rowCount == add.getRowCount())) {
    throw new Error('Matrix mismatch');
  }
    
  for (var i = 0; i < this.rowCount; i++) {
    for (var j = 0; j < this.colCount; j++) {
      this.data[i][j] += add.data[i][j];
    }
  }
  
  return this;
};

/**
 * Rotate a two dimensional vector by degree.
 *
 * @param {Number} degree
 * @param {String} direction - clockwise or counterclockwise
 * @return {Matrix} Updated matrix
 */
Matrix.prototype.rotate = function (degree, direction) {
  if (this.data.length === 2) {
    var negate = direction === "clockwise" ? -1 : 1;
    var radians = degree * (Math.PI / 180);

    var transformation = new Matrix([
      [Math.cos(radians), -1*negate*Math.sin(radians)],
      [negate*Math.sin(radians), Math.cos(radians)]
    ]);

    this.previousTransformations.push(transformation.data);
    this.data = transformation.multiply(this).data;
    return this;
  } else {
    throw new Error('Only two dimensional matrices currently supported');
  }
};

/**
 * Scale a two dimensional vector by scale factor x and scale factor y.
 *
 * @param {Number} sx
 * @param {Number} sy
 * @return {Matrix} Updated matrix
 */
Matrix.prototype.scale = function (sx, sy) {
  if (this.rowCount === 2) {

    var transformation = new Matrix([
      [sx, 0],
      [0, sy]
    ]);

    this.previousTransformations.push(transformation.data);
    this.data = transformation.multiply(this).data;
    return this;
  } else {
    throw new Error("Only two dimensional operations are supported");
  }
};

/**
 * Shear a two dimensional vector by shear factor k.
 *
 * @param {Number} k
 * @param {String} direction - xaxis or yaxis
 * @return {Matrix} Updated matrix
 */
Matrix.prototype.shear = function (k, direction) {
  if (this.rowCount === 2) {
    var xplaceholder = direction === "xaxis" ? k : 0;
    var yplaceholder = direction === "yaxis" ? k : 0;

    var transformation = new Matrix([
      [1, xplaceholder],
      [yplaceholder, 1]
    ]);

  this.previousTransformations.push(transformation.data);
  this.data = transformation.multiply(this).data;
  return this;
  } else {
    throw new Error("Only two dimensional operations are supported");
  }
};

/**
 * Perform an affine transformation on the given vector.
 *
 * @param {Number} tx
 * @param {Number} ty
 * @return {Matrix} Updated matrix
 */
Matrix.prototype.affine = function (tx, ty) {
  if (this.rowCount === 2) {

    var transformation = new Matrix([
      [1, 0, tx],
      [0, 1, ty],
      [0, 0, 1 ]
    ]);

    var newpoint = new Matrix([
      [this.data[0][0]],
      [this.data[1][0]],
      [1]
    ]);

    var transformed = transformation.multiply(newpoint);
    this.data = [
      [transformed.data[0][0]],
      [transformed.data[1][0]],
    ];

    return this;
  } else {
    throw new Error("Only two dimensional operations are supported");
  }
};

/**
 * Undo the previous matrix transform. Currently only supports one undo operation.
 *
 * @return {Matrix} Transformed matrix
 */
Matrix.prototype.undo = function () {
  if (this.previousTransformations.length > 0) {
    var inverted = new Matrix(this.previousTransformations.pop()).invert();
    this.data = inverted.multiply(this).data;
  }
  return this;
}

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
  //TODO probably want to also check all elements are numbers
  return arg.getColumnCount() > 1 && arg.getRowCount() > 1;
}

/**
 * Return a copy ("clone") of this Matrix
 * @return {Matrix} The clone
 */ 
Matrix.prototype.clone = function() {
  return new Matrix(this.data);
}

/**
 * Create an identity matrix of dimension n x n.
 *
 * @param {Number} dimension of the identity array to be returned
 * @return {Array} n x n identity matrix.
 */
Matrix.identity = function(n) {
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
