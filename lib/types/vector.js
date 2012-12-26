var Matrix = require('./matrix');

/**
 * Vector constructor
 *
 * @param {Array} The data; an array of numbers
 * @param {String} (Optional) Type of vector: "row" or "column".
 * Defaults to column.
 */
var Vector = function (data, type) {
  
  if(!type) {
    type = "column";
  }
  else if(type !== 'row' && type !== 'column') {
    throw new Error("Type must be 'row' or 'column'.");
  }
  
  this.type = type;
  
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

/**
 * Evaluate Euclidean distance between this vector and another.
 *
 * @param {Vector} another vector.
 * @return {Number} scalar distance.
 */
Vector.prototype.distanceFrom = function(vector) {
  if (this.getLength() === vector.getLength()) {  
    var distanceSquared = 0;
    for (var i = 0; i < this.getLength(); i++) {
      distanceSquared += Math.pow(this.getElement(i) - vector.getElement(i), 2);
    }
    return Math.sqrt(distanceSquared);
  } else {
    throw new Error("Vector mismatch");
  }
}

/** @todo Extend Matrix and get this method from there */
Vector.prototype.getData = function() {
  return this.data;
}

/**
 * Apply a callback to every cell in the Vector.
 * 
 * @param {Function} The callback. It is invoked
 * with the current element's value and its index.
 * @return {Matrix} The updated Vector.
 */
Vector.prototype.map = function(callback) {
  if(typeof callback !== "function") {
    throw new Error("Callback must be a function.");
  }
  
  for(var i=0; i < this.length; i++) {
    this.data[i] = callback(this.data[i], i);
  }

  return this;
}

//export
exports.Vector = Vector;
