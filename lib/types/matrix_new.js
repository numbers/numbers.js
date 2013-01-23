/**
 * Constructs a Matrix of numbers. 
 *
 * @param {Array} data (optional) The data of the matrix as an array of arrays.
 * @param {Boolean} useCache See docs.
 * @return {Array} An array with Matrix functionality. 
 */
function Matrix(data, useCache) {
  var matrix = [];

  //expose methods
  matrix.fill     = fill;
  matrix.rows     = rows;
  matrix.cols     = cols;
  matrix.row      = row;
  matrix.rowCount = rowCount;
  matrix.col      = col;
  matrix.colCount = colCount;
  matrix.get      = get;
  matrix.set      = set;
  matrix.exists   = exists;
  matrix.swap     = swap;
  matrix.swapRows = swapRows;
  matrix.equals   = equals;
  matrix.invert   = invert;
  
  //construct
  matrix._useCache = useCache ? true : false;
  matrix._cache    = {};
  
  if (data) {
    matrix.fill(data);
    matrix_.previousTransformations = [];
    
    if(matrix._useCache) {
      matrix._cache.colCount = matrix[0].length;
      matrix._cache.rowCount = matrix.length;
    }
  }
  
  return matrix;
}

/******* "STATIC" METHODS *******/

/**
 * Tries to convert the provided argument to a valid Matrix element.
 * 
 * @param {Mixed} The value to convert.
 * @return {False|Number} False if conversion failed; the element if it succeeded.
 */
Matrix.toElement = function(arg) {
 var x = Number(arg); 

 return x!==NaN ? x : false; 
}

Matrix.toMatrix = function(arg) {
  if(numbers.util.isArray(arg) && arg.length > 0 && numbers.util.isArray(arg[0])) {
    return 
  }
}

/**
 * Fill a matrix with an array of arrays.
 *
 * @param {Array} Array of array of numbers.
 * @return {Matrix} Updated/Filled matrix.
 *
 * @todo rollback applied additions if one new element fails
 */
function fill(aoa) {
  var rowCount = aoa.length, colCount = aoa[0].length, newVal;

  for (var i = 0; i < rowCount; i++) {
    if (aoa[i].length != colCount) {
        throw new Error("All rows must have the same length.");
    }
    for (var j = 0; j < colCount; j++) {
        if((newVal = Matrix.toElement(aoa[i][j])) !== false) {
          this[i][j] = newVal;
        }
        else {
          throw new Error("Invalid element (" + aoa[i][j] + ") at row " + i + ", column " + j + ".");
        }
    }
  }
  
  if(this._useCahce) {
    this._cache.calCount = colCount;
    this._cache.rowCount = rowCount;
  }

  return this;
}

/**
 * Get all rows in the matrix.
 *
 * @return {Array} The rows
 */
function rows() {
  return this;
}

/**
 * Get all columns in matrix.
 *
 * @return {Number} columns
 */
function cols() {
  var columns = [], colCount = this.colCount();

  for (var i = 0; i < colCount; i++) {
    columns.push(this.col(i));
  }
  
  return columns;
}

/**
 * Get the i-th row (zero indexed)
 *
 * @param {Number} row index.
 * @param {Array} row.
 */
function row(i) {
  if(!this.exists(i)) {
    throw new Error("Invalid Row.");
  }

  return this[i];
}

/**
 * Get total number of rows.
 *
 * @return {Number} total number of rows.
 */
function rowCount() {
  return this._useCache ? this._cache.rowCount : this.length;
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
function col(i) {
  var column = [], rowCount = this.rowCount();

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
function colCount() {
  return this._useCache ? this._cache.colCount : this[0].length;
}

/**
 * Get a specific element. Indexed from left to right.
 *
 * @param {Number} row index
 * @param {Number} column index
 * @return {Number} element
 */
function get(row, col) {
  if(!this.exists(row,col)) {
    throw new Error("Invalid element");
  }

  return this[row][col];
};

/**
 * Set a specific element. Indexed from left to right.
 *
 * @param {Number} row index
 * @param {Number} column index
 * @param {Number} value to set the element to
 * @return {Matrix} The updated matrix
 */
function set(row, col, value) {
  if(!this.exists(row,col)) {
    throw new Error("Invalid element");
  }

  this.data[row][col] = value;
  
  return this;
};

/**
 * Returns whether the row, column, or element provided exists
 *
 * Tests for the element if a row and a column are provided.
 * Tests for the row if only a row is provided. 
 * Tests for the column if only a column is provided (by passing null to row).
 * 
 * @param {Number} row index (null to skip)
 * @param {Number} column index
 * @return {Boolean} Does the element exist
 */
function exists(row, col) {
  var validRow = (row===null || (row >= 0 && row < this.rowCount)) ? true : false,
      validCol = (typeof col==="undefined" || (col >= 0 && col < this.colCount)) ? true : false;
  
  return (validRow && validCol);
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
function swap(row1, col1, row2, col2) {
  var elem1, elem2;
  
  if(!(this.exists(row1,col1) && this.exists(row2, col2))) {
    throw new Error("Invalid element");
  }
  
  elem1 = this[row1][col1];
  elem2 = this[row2][col2];

  this[row1][col1] = elem2;
  this[row2][col2] = elem1;

  return this;
};

/**
 * Swap two rows
 *
 * @param {Number} Row 1 index
 * @param {Number} Row 2 index
 * @return {Matix} Updated Matrix
 */
function swapRows(row1, row2){
  if(!this.exists(row1) || !this.exists(row2)) {
    throw new Error("Invalid Row.");
  }
  
  var row1Data = this[row1],
      row2Data = this[row2];
  
  this[row2] = row1Data;
  this[row1] = row2Data;

  return this;
}

/**
 * Determine if this matrix equals the new given matrix
 */
function equals(matrix) {
  if(Matrix.isMatrix(matrix) &&
     this.colCount() === matrix.colCount() &&
     this.rowCount() === matrix.rowCount()) {

    for(var i = this.rowCount; i--;) {
      for(var j = this.colCount; j--;) {
        if(this[i][j] !== matrix[i][j]){
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
function invert() {
  if (this.colCount() === 2 && this.rowCount() === 2) {
    var a = this[0][0];
    var b = this[0][1];
    var c = this[1][0];
    var d = this[1][1];
    
    this.
      set(0, 0, d).set(0, 1, -1*b).
      set(1,0,-1*c).set(1,1,a);
  
    this.scaleBy((1 / (a*d - b*c)));

    return this;

  } else {
    throw new Error('Only two by two matrices currently supported');
  }
}

/**
 * Transpose the matrix
 */
function transpose() {
  var result = [], colCount = this.colCount(), rowCount = this.rowCount();
  
  for (var i = 0; i < colCount; i++) {
    result[i] = [];
    
    for (var j = 0; j < rowCount; j++){
      result[i][j] = this[j][i];
    }
  }
  
  this.length = 0;
  this.fill(result);
  
  if(this._useCache) {
    this._cache.colCount = rowCount;
    this._cache.rowCount = colCount;    
  }

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
 * Apply a callback to every cell in the Matrix
 * 
 * @param {Function} The callback. It is invoked
 * with three arguments: the current element's value,
 * its row index, and its column index.
 * @return {Matrix} The updated Matrix.
 */
 Matrix.prototype.map = function(callback) {
  if(typeof callback !== "function") {
    throw new Error("Callback must be a function.");
  }

   for(var i=0; i < this.rowCount; i++) {
     for(var j=0; j < this.colCount; j++) {
       this.data[i][j] = callback(this.data[i][j], i, j);
     }
   }

   return this;
 }
 
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
  else if(data) {
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

SquareMatrix.prototype.fill = function(data) {
  if(data[0] instanceof Array && data.length === data[0].length) {
    Matrix.prototype.fill.call(this, data);
    
    return this;
  }
  else {
    throw new Error("Invalid (non-square) data.");
  }
}
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
 * @param {Number} ith row element of the matrix
 * @param {Number} jth colum of the matrix
 * @return {SquareMatrix} cofactor matrix
 */
SquareMatrix.prototype.cofactor = function(i, j) {
  var sign, p, q, k, l, C;

  C = [];
  for (p = 0; p < this.rowCount - 1; p++) {
    C.push([]);
    for (q = 0; q < this.rowCount - 1; q++) {
      C[p].push(0);
    }
  }

  C = new SquareMatrix(C);

  sign = ((i + j) % 2) ? -1 : 1;

  for (k = 0; k < this.rowCount - 1; k++) {
    for (l = 0; l < this.rowCount - 1; l++) {
      if (k < i && l < j) {
        C.setElement(k, l, sign * this.getElement(k, l));
      }
      else if (k < i) {
        C.setElement(k, l, sign * this.getElement(k, l + 1));
      }
      else if (l < j) {
        C.setElement(k, l, sign * this.getElement(k + 1, l));
      } else {
        C.setElement(k, l, sign * this.getElement(k + 1, l + 1));
      }
    }
  }

  return C;
}

//export
exports.Matrix       = Matrix;
exports.SquareMatrix = SquareMatrix;