var linearAlgebra = require('../numbers/matrix');

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

    this.colCount = (type=="row") ? data.length : 1;
    this.rowCount = (type=="row") ? 1 : data.length;
  }
}

//export
linearAlgebra.Vector = Vector;