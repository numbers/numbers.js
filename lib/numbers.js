/**
 * numbers.js
 *
 * top level management of numbers extensions
 */
var numbers = exports;


// Expose methods
numbers.basic = require('./numbers/basic');
numbers.calculus = require('./numbers/calculus');
numbers.matrix = require('./numbers/matrix');
numbers.prime = require('./numbers/prime');
numbers.statistic = require('./numbers/statistic');
numbers.useless = require('./numbers/useless');

/** 
 * @property {Number} EPSILON Epsilon (error bound) to be used 
 * in calculations. Can be set and retrieved freely. 
 * 
 * Given the float-point handling by JavaScript, as well as
 * the numbersal proficiency of some methods, it is common 
 * practice to include a bound by which discrepency between 
 * the "true" answer and the returned value is acceptable.
 *
 * If no value is provided, 0.001 is default.
 */
numbers.EPSILON = 0.001;
