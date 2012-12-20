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
 *
 * @param {Number} row index
 * @param {Number} column index
 * @return {Number} element
 */
Matrix.prototype.getElement = function(row, col) {
  if(col < 0 || col > this.colCount-1 || row < 0 || row > this.rowCount - 1) {
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
  if(col < 0 || col > this.colCount-1 || row < 0 || row > this.rowCount - 1) {
    throw new Error("Invalid element");
  }

  this.data[row][col] = value;  
  return this;
};

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
  
  try {
    elem1 = this.getElement(row1, col1),
    elem2 = this.getElement(row2, col2);
  }
  catch(err) {
    throw err;
  }
  
  this.data[row1][col1] = elem2;
  this.data[row2][col2] = elem1;

  return this;
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
 * Get all the data from the Matrix.
 *
 * @return {Array} rows.
 */
Matrix.prototype.getData = function() {
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
    this.colCount = this.data[0].length;
    this.rowCount = this.data.length;
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
 * Evaluate determinant of matrix.  Expect speed
 * degradation for matrices over 4x4. 
 *
 * @return {Number} determinant
 */
Matrix.prototype.determinant = function() {
  
  if(this.colCount !== this.rowCount) {
    throw new Error("Not a square matrix.");
  }

  if(this.rowCount === 1) {
    return this.data[0][0];
  }
  else if (this.rowCount === 2) {
    return this.data[0][0] * this.data[1][1] - this.data[0][1] * this.data[1][0];
  }

  var det = 0,
      row, col,
      diagLeft, diagRight;

  for(col=0; col < this.colCount; col++) {
    
    diagLeft = this.data[0][col];
    diagRight = this.data[0][col];

    for(row=1; row < this.rowCount; row++) {
      diagRight *= this.data[row][(((col + row) % this.colCount) + this.colCount) % this.colCount];
      diagLeft *= this.data[row][(((col - row) % this.colCount) + this.colCount) % this.colCount];
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
  return new Matrix(result);
}



//Minor backwards compatibility layer.
//(we'll see if thse stays in the final)
Matrix.addition = function(arr1, arr2) {
  var m1 = new Matrix(arr1), m2 = new Matrix(arr2);
  return m1.add(m2).getData();
}

Matrix.scalar = function(arr, scalar) {
  return (new Matrix(arr)).scaleBy(scalar).getData();
}

Matrix.dotproduct = function(v1, v2) {
  return new Matrix([v1]).dotproduct(new Matrix([v2]));
}

//export
matrix.Matrix = Matrix;