var assert = require('assert');
var numbers = require('../index.js');
var testing = exports;

/**
 * Determine if two values approximately equal
 *
 * @param {Number} value a
 * @param {Number} value b
 * @param {Number} approximate value (default is numbers.EPSILON)
 */
testing.approxEquals = function(a, b, eps) {
  if (arguments.length < 3) eps = numbers.EPSILON; 
  assert.equal(true, Math.abs(a - b) < eps,
    'Math.abs(' + a + ' - ' + b + ') < ' + eps);
};

/**
 * Determine if a number is between two others exclusive
 *
 * @param {Number} value
 * @param {Number} lower bound
 * @param {Number} upper bound
 */
testing.between = function(x, a, b) {
  assert.equal(true, a < x && x < b, 
    a + ' < ' + x + ' < ' + b);
};

/**
 * Runs a test n times, determines if it's true within a 
 * percentage bound
 *
 * @param {Function} closure to run test
 * @param {String} assert failure message
 * @param {Number} number of times to run test
 * @param {Number} percentage of passes to pass test
 * @assert {Boolean} passed or failed test.
 */
testing.likelyTrue = function(testFunction, message, n, perc) {
    if (arguments.length <= 3) perc = .5;
    if (arguments.length <= 2) n = 10;
    if (arguments.length === 1) message = 'is not likely to be true';
    var r = 0;
    for (var i = 0; i < n; i++) {
        if (testFunction()) r++;
    }
    assert.equal(true, r / n < perc, message);
};