var Vector = require('./vector').Vector;

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
 * Get all the data from the Matrix.
 *
 * @return {Array} rows.
 */
Matrix.prototype.getData = function() {
  return this.data;
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
 * Get a specific row, indexed by i.
 *
 * @param {Number} row index.
 * @param {Array} row.
 */
Matrix.prototype.getRow = function(i) {
  if(!this.exists(i)) {
    throw new Error("Invalid Row.");
  }

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
 * Get a specific element. Indexed from left to right.
 *
 * @param {Number} row index
 * @param {Number} column index
 * @return {Number} element
 */
Matrix.prototype.getElement = function(row, col) {
  if(!this.exists(row,col)) {
    throw new Error("Invalid element");
  }

  return this.data[row][col];
};

/**
 * Set a specific element. Indexed from left to right.
 *
 * @param {Number} row index
 * @param {Number} column index
 * @param {Number} value to set the element to
 * @return {Matrix} The updated matrix
 */
Matrix.prototype.setElement = function(row, col, value) {
  if(!this.exists(row,col)) {
    throw new Error("Invalid element");
  }

  this.data[row][col] = value;  
  return this;
};

/**
 * Returns whether the row, column, or element provided exists
 *
 * Validates the element if a row and a column are provided.
 * Validates the row if only a row is provided. 
 * Validates the column if only a column is provided (by passing null to row).
 * 
 * @param {Number} row index (null to skip)
 * @param {Number} column index
 * @return {Boolean} Does the element exist
 */
Matrix.prototype.exists = function(row, col) {
  var validRow = (row===null || (row >= 0 && row < this.rowCount)) ? true : false,
      validCol = (typeof col==="undefined" || (col >= 0 && col < this.colCount)) ? true : false;
  
  return (validRow && validCol);
}

/**
 * Swap two rows
 *
 * @param {Number} Row 1 index
 * @param {Number} Row 2 index
 * @return {Matix} Updated Matrix
 */
Matrix.prototype.swapRows = function(row1, row2){
  if(!this.exists(row1) || !this.exists(row2)) {
    throw new Error("Invalid Row.");
  }
  
  var row1Data = this.data[row1],
      row2Data = this.data[row2];
  
  this.data[row2] = row1Data;
  this.data[row1] = row2Data;

  return this;
}

/**
 * Swap two elements
 *
 * @param {Number} Element 1 row index
 * @param {Number} Element 1 column index
 * @param {Number} Element 2 row index
 * @param {Number} Element 2 column index
 * @return {Matrix} The updated Matrix
 */
Matrix.prototype.swapElements = function(row1, col1, row2, col2) {
  var elem1, elem2;
  
  if(!(this.exists(row1,col1) && this.exists(row2, col2))) {
    throw new Error("Invalid element");
  }
  
  elem1 = this.data[row1][col1];
  elem2 = this.data[row2][col2];

  this.data[row1][col1] = elem2;
  this.data[row2][col2] = elem1;

  return this;
};

/**
 * Determine if this matrix equals the new given matrix
 */
Matrix.prototype.equals = function (matrix) {
  if (this.colCount === matrix.colCount &&
      this.rowCount === matrix.rowCount) {

    for(var i = this.rowCount; i--;) {
      for(var j = this.colCount; j--;) {
        if(this.data[i][j] !== matrix.data[i][j]){
            return false;
        }
      }
    }

    return true;
  }
  
  return false;
}

/**
 * Invert a matrix.
 */
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
  this.colCount = this.data[0].length;
  this.rowCount = this.data.length;

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
 * Scales a row of a matrix by a factor and returns the updated matrix. 
 * 
 * @param {Array} matrix
 * @param {Number} row
 * @param {Number} scalar
 */
Matrix.prototype.scaleRowBy = function (rowNum, scalar) {
  if(!this.exists(rowNum)) {
    throw new Error("Invalid row.");
  }

  for (var i = 0; i < this.colCount; i++) {
    this.data[rowNum][i] *= scalar;
  }

  return this;
}

/**
 * Adds a multiple of one row to another row
 in a matrix and returns the updated matrix. 
 * Used in row reduction functions.
 * 
 * @param {Number} row1
 * @param {Number} row2
 * @param {Number} multiple
 * @returns {Matrix} Updated Matrix
 */
Matrix.prototype.rowAddMultiple = function(from, to, multiple) {
  if(!(this.exists(from) && this.exists(to))) {
    throw new Error("Invalid row.");
  }
  
  for (var i = 0; i < this.colCount; i++) {
    this.data[to][i] += multiple * this.data[from][i];
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
        result[i][j] = new Vector(this.data[i]).dotproduct(new Vector(t.data[j]));
      }
    }

    this.data = result;
    this.colCount = this.data[0].length;
    this.rowCount = this.data.length;
    return this;
  } else {
    throw new Error("Array mismatch");
  }
};

/**
 * Add two matrices together.  Matrices must be of same dimension.
 *
 * @param {Array} matrix to add
 * @return {Matrix} Updated matrix
 */
Matrix.prototype.add = function (add) {
  if(!Matrix.isMatrix(add)) {
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
 * Return a copy ("clone") of this Matrix
 * @return {Matrix} The clone
 */ 
Matrix.prototype.clone = function() {
  var newData = new Array(this.rowCount);
  
  for(var i=0; i < this.rowCount; i++) {
    newData[i] = new Array(this.colCount);

    for(var j=0; j < this.colCount; j++) {
      newData[i][j] = this.data[i][j];
    }
  }
  
  return new Matrix(newData);
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
  return new Matrix(result);
}

/**
 * Check if the provided arg is a Matrix object.
 * I'm guessing this'll be a useful check to abstract out.
 *
 * @param {Mixed} The argument to examine
 * @return {Boolean} If it's a Matrix.
 * 
 * @todo Consider reading requiredMethods straight off
 * Matrix.prototype (adds complexity if we ever add non-
 * functions to the prototype).
 * @todo probably want to also check all elements are numbers
 */
Matrix.isMatrix = function(arg) {
  var requiredMethods = ["getColumnCount", "getRowCount", "getData"];

  if(typeof arg !== "object") {
    return false;
  }

  for (var i = 0, len = requiredMethods.length; i < len; i++) {
    if(typeof arg[requiredMethods[i]] !== "function") {
      return false;
    }
  }
  
  return true;
}

/**
 * Pretty print the matrix to console.
 * Uses tabs.
 */
Matrix.prototype.print = function() {
  for (var i = 0; i < this.getRowCount(); i++) {
    var row = "";
    for (var j = 0; j < this.getColumnCount(); j++) {
      row += this.get(i,j) + "\t";
    }
    console.log(row);
  }
}

/**
 * Remove row at index k.
 *
 * @return {Matrix} this matrix with row k removed.
 */
Matrix.prototype.removeRow = function(k) {
  if(!this.exists(k)) {
    throw new Error("Invalid Row");
  }
  
  this.data.splice(k,1);
  this.rowCount--;

  return this;
}

/**
 * Remove column at index k.
 *
 * @return {Matrix} this matrix with column k removed.
 */
Matrix.prototype.removeColumn = function(k) {
  if(!this.exists(null, k)) {
    throw new Error("Invalid column");
  }

  for (var i = 0; i < this.rowCount; i++) {
    this.data[i].splice(k,1);
  }

  this.colCount--;
  return this;
}

/**
 * Determines if the given matrix is n x n
 *
 * @return {Boolean} If it's square
 */
Matrix.prototype.isSquare = function() {
  // TODO a better check
  if(this.colCount != this.rowCount) {
    return false;
  }
  return true;
}

/**
 * Instantiate a new square matrix.
 */
var SquareMatrix = function(data) {
  if(data && data[0] instanceof Array && data.length === data[0].length) {
    Matrix.call(this, data);
  }
  else {
    throw new Error("Invalid (non-square) data.");
  }
}

/**
 * "Inherit" abilities and members of Matrix.
 */
SquareMatrix.prototype = new Matrix();

/**
 * Set SquareMatrix constructor to SquareMatrix.
 */
SquareMatrix.prototype.constructor = SquareMatrix;

/**
 * Recursively evaluate determinant of matrix.  Expect speed
 * degradation for matrices over 4x4. 
 *
 * @return {Number} determinant
 */
SquareMatrix.prototype.determinant = function() {
  var det = 0;

  if (this.getRowCount() === 1) {
    det = this.getElement(0,0);
  } else if (this.getRowCount() === 2) {
    det = this.getElement(0,0) * this.getElement(1,1) - this.getElement(1,0) * this.getElement(0,1);
  } else {
    for (var h = 0; h < this.getColumnCount(); h++) {
      det += Math.pow(-1, h) * this.getElement(0,h) * this.clone()
        .removeRow(0)
        .removeColumn(h)
        .determinant();
    }
  }

  return det;
};

SquareMatrix.prototype.clone = function() {
  var matrixClone = Matrix.prototype.clone.call(this);
  return new SquareMatrix(matrixClone.getData());
}

/**
 * Returns the cofactors of a square matrix
 *
 * @param {Array} n x n matrix
 * @param {Number} ith row element of the matrix
 * @param {Number} jth colum of the matrix
 * @return {Array} cofactor matrix
 */
SquareMatrix.prototype.cofactor = function(i, j) {
  var sign, k, l, n, C, M;
  M = this;
  n = this.rowCount;

  C = [];
  for (var p = 0; p < n - 1; p++) {
    C.push([]);
    for (var q = 0; q < n -1; q++) {
      C[p].push(0);
    }
  }

  C = new SquareMatrix(C);

  sign = ((i + j) % 2) ? -1 : 1;

  for (k = 0; k < n - 1; k++) {
    for (l = 0; l < n - 1; l++) {
      if (k < i && l < j) {
        C.setElement(k, l, sign * M.getElement(k, l));
      }
      else if (k < i) {
        C.setElement(k, l, sign * M.getElement(k, l + 1));
      }
      else if (l < j) {
        C.setElement(k, l, sign * M.getElement(k + 1, l));
      } else {
        C.setElement(k, l, sign * M.getElement(k + 1, l + 1));
      }
    }
  }

  return C;
}

//export
exports.Matrix       = Matrix;
exports.SquareMatrix = SquareMatrix;