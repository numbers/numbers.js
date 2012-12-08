/**
 * numeric.js
 *
 * top level management of numeric extensions
 *
 * (C) 2012 Steve Kaliski
 * MIT License
 *
 */
var numeric = exports;


// Expose methods
numeric.basic = require('./numeric/basic');
numeric.calculus = require('./numeric/calculus');
numeric.matrix = require('./numeric/matrix');
numeric.prime = require('./numeric/prime');
numeric.statistic = require('./numeric/statistic');
numeric.useless = require('./numeric/useless');

// Global vars

/** 
 * @property {Number} EPSILON Epsilon (error bound) to be used 
 * in calculations. Can be set and retrieved freely. 
 * 
 * Given the float-point handling by JavaScript, as well as
 * the numerical proficiency of some methods, it is common 
 * practice to include a bound by which discrepency between 
 * the "true" answer and the returned value is acceptable.
 *
 * If no value is provided, 0.001 is default.
 */
numeric.EPSILON = 0.001;


};