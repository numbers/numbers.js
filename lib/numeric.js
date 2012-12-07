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
numeric.ERROR_BOUND = 0.001;

/** 
 * Set epsilon (error bound) to be used in calculations.
 * Given the float-point handling by JavaScript, as well as
 * the numerical proficiency of some methods, it is common practice
 * to include a bound by which discrepency between the "true" answer
 * and the returned value is acceptable.
 *
 * If no value is provided, 0.001 is default.
 *
 * @param {Number} error bound
 */
numeric.epsilon = function(eps) {
  numeric.ERROR_BOUND = eps;
};