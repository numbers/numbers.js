var matrix = exports;

/**
 * Scales a row of a matrix by a factor and returns the updated matrix. 
 * Used in row reduction functions.
 * 
 * @param {Array} matrix
 * @param {Number} row
 * @param {Number} scale
 */
matrix.rowScale = function ( m, row, scale ){
  var result = new Array(m.length);
    
  for (var i = 0; i < m.length; i++) {
    result[i] = new Array(m[i].length);
  
    for (var j = 0; j < m[i].length; j++) {
      if( i === row ){
        result[i][j] = scale * m[i][j]; 
      }
      else{
        result[i][j] = m[i][j];
      }
    }
  }
  return result;
}

/**
 * Swaps two rows of a matrix  and returns the updated matrix. 
 * Used in row reduction functions.
 * 
 * @param {Array} matrix
 * @param {Number} row1
 * @param {Number} row2
 */
matrix.rowSwitch = function( m, row1, row2 ){
  var result = new Array(m.length);
  
  for (var i = 0; i < m.length; i++) {
    result[i] = new Array(m[i].length);
  
    for (var j = 0; j < m[i].length; j++) {
      if( i === row1 ){
        result[i][j] = m[row2][j]; 
      }
      else if ( i === row2){
        result[i][j] = m[row1][j];
      }
      else{
        result[i][j] = m[i][j];
      }
    }
  }
  return result;
}

/**
 * Adds a multiple of one row to another row
 * in a matrix and returns the updated matrix. 
 * Used in row reduction functions.
 * 
 * @param {Array} matrix
 * @param {Number} row1
 * @param {Number} row2
 */
matrix.rowAddMultiple = function(m, from, to, scale){
  var result = new Array(m.length);
  
  for (var i = 0; i < m.length; i++) {
    result[i] = new Array(m[i].length);
  
    for (var j = 0; j < m[i].length; j++) {
      if( i === to ){
        result[to][j] = m[to][j] + scale * m[from][j];
      }
      else{
        result[i][j] = m[i][j];
      }
    }
  }
  return result;
}
