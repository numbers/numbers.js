var Matrix = require('./matrix');

/**
 * Vector constructor
 *
 * @param {Array} The data; an array of numbers
 * @param {String} Type of vector. "row" or "column"
 */
var Vector = function (data, type) {
  
  if(type) {
    if(type !== 'row' && type !== 'column') {
      throw new Error("Type must be 'row' or 'column'.");
    }
    
    this.type = type;
  }
  
  if (data) {
    this.data = data;

    this.length   = data.length;
    this.colCount = (type=="row") ? this.length : 1;
    this.rowCount = (type=="row") ? 1 : this.length;
  }
}

/**
 * Get the number of cells in the vector.
 *
 * @return {Number} Number of cells in the vector.
 */
Vector.prototype.getLength = function() {
  return this.length;
};

Vector.prototype.getElement = function(i) {
  return this.data[i];
};

/**
 * Evaluate dot product of two vectors.  Vectors must be of same length.
 *
 * @param {Array} vector
 * @return {Array} dot product
 */
Vector.prototype.dotproduct = function (vector) {
  if (this.length === vector.getLength()) {
    var result = 0;
    for (var i = 0 ; i < this.length ; i++) {
      result += this.data[i] * vector.getElement(i);
    }
    return result;
  } else {
    throw new Error("Vector mismatch");
  }
};

//export
exports.Vector = Vector;