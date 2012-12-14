var numbers = require('../numbers');
var calculus = exports;


/**
 * Calculate point differential for a specified function at a
 * specified point.  For functions of one variable.
 *
 * @param {Function} math function to be evaluated
 * @param {Number} point to be evaluated
 * @return {Number} result
 */
calculus.pointDiff = function (func, point) {
  var a = func(point - .001);
  var b = func(point + .001);

  return (b - a) / (.002);
};


/**
 * Calculate riemann sum for a specified, one variable, function
 * from a starting point, to a finishing point, with n divisions.
 *
 * @param {Function} math function to be evaluated
 * @param {Number} point to initiate evaluation
 * @param {Number} point to complete evaluation
 * @param {Number} quantity of divisions
 * @param {Function} (Optional) Function that returns which value 
 * to sample on each interval; if none is provided, left endpoints
 * will be used.
 * @return {Number} result
 */
calculus.riemann = function (func, start, finish, n, sampler) {
  var inc = (finish - start) / n;
  var totalHeight = 0;
  var i;
  
  if (typeof sampler === 'function') {
    for (i = start; i < finish; i += inc) {
      totalHeight += func(sampler(i, i + inc));
    }
  } else {
    for (i = start; i < finish; i += inc) {
      totalHeight += func(i);
    }
  }
  
  return totalHeight * inc;
};


/**
 * Helper function in calculating integral of a function
 * from a to b using simpson quadrature.
 *
 * @param {Function} math function to be evaluated
 * @param {Number} point to initiate evaluation
 * @param {Number} point to complete evaluation
 * @return {Number} evaluation
 */
function simpsonDef (func, a, b) {
  var c = (a + b) / 2;
  var d = Math.abs(b - a) / 6;
  return d * (func(a) + 4 * func(c) + func(b));
}


/**
 * Helper function in calculating integral of a function
 * from a to b using simpson quadrature.  Manages recursive
 * investigation, handling evaluations within an error bound.
 *
 * @param {Function} math function to be evaluated
 * @param {Number} point to initiate evaluation
 * @param {Number} point to complete evaluation
 * @param {Number} total value
 * @param {Number} Error bound (epsilon)
 * @return {Number} recursive evaluation of left and right side
 */
function simpsonRecursive (func, a, b, whole, eps) {
  var c = a + b,
      left = simpsonDef(func, a, c),
      right = simpsonDef(func, c, b);
  
  if (Math.abs(left + right - whole) <= 15 * eps) {
    return left + right + (left + right - whole) / 15;
  } else {
    return simpsonRecursive(func, a, c, eps/2, left) + simpsonRecursive(func, c, b, eps / 2, right);
  }
}


/**
 * Evaluate area under a curve using adaptive simpson quadrature.
 *
 * @param {Function} math function to be evaluated
 * @param {Number} point to initiate evaluation
 * @param {Number} point to complete evaluation
 * @param {Number} Optional error bound (epsilon); 
 * global error bound will be used as a fallback.
 * @return {Number} area underneath curve
 */
calculus.adaptiveSimpson = function (func, a, b, eps) {
  eps = (typeof eps === "undefined") ? numbers.EPSILON : eps;

  return simpsonRecursive(func, a, b, simpsonDef(func, a, b), eps);
};


/**
 * Calculate limit of a function at a given point.  Can approach from
 * left, middle, or right.
 *
 * @param {Function} math function to be evaluated
 * @param {Number} point to evaluate
 * @param {String} approach to limit
 * @return {Number} limit
 */
calculus.limit = function (func, point, approach) {
  if (approach === 'left') {
    return func(point - 1e-15);
  } else if (approach === 'right') {
    return func(point + 1e-15);
  } else if (approach === 'middle') {
    return (calculus.limit(func, point, 'left') + calculus.limit(func, point, 'right')) / 2;
  } else {
    throw new Error('Approach not provided');
  }
};


/**
 * Calculate Stirling approximation gamma
 *
 * @param {Number} number to calculate
 * @return {Number} gamma
 */
calculus.StirlingGamma = function (num) {
  return Math.sqrt(2 * Math.PI / num) * Math.pow((num / Math.E), num);
}

/**
 * Calculate Lanczos approximation gamma
 *
 * @param {Number} number to calculate
 * @return {Number} gamma
 */
calculus.LanczosGamma = function (num) {
  var p = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
  ]; 
  var i;
  var g = 7;

  if(num < 0.5) return Math.PI / (Math.sin(Math.PI * num) * calculus.LanczosGamma(1 - num));

  num -= 1;
  
  var a = p[0];
  var t = num + g + 0.5;

  for (i = 1; i < p.length; i++) {
    a += p[i] / (num + i);
  }

  return Math.sqrt(2 * Math.PI) * Math.pow(t, num + 0.5) * Math.exp(-t) * a;
}