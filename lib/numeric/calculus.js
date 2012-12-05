var calculus = exports;

/**
 * Evaluate some function, either passed in as a function object or
 * as a string that points to a function on the builtin Math object.
 *
 * e.g. evaluate(Math.cos, 5) --> return cos(5)
 * e.g. evaluate('cos(x)', 5) --> return cos(5)
 *
 * @param {String} math function to be evaluated (provided as a string)
 * @param {Number} point to be evaluated
 * @return {Number} result
 */
function evaluate (func, val) {
  if (typeof func == 'string') {
    return Math[func.substring(0,func.indexOf('('))](val);
  }
  return func(val);
}


/**
 * Calculate point differential for a specified function at a
 * specified point.  For functions of one variable.
 *
 * @param {String} math function to be evaluated (provided as a string)
 * @param {Number} point to be evaluated
 * @return {Number} result
 */
calculus.pointDiff = function (func, point) {
  var a = evaluate(func, point - 0.00001);
  var b = evaluate(func, point + 0.00001);

  return (b - a) / (0.00002);
};


/**
 * Calculate riemann sum for a specified, one variable, function
 * from a starting point, to a finishing point, with n divisions.
 *
 * @param {String} math function to be evaluated (@see evaluate)
 * @param {Number} point to initiate evaluation
 * @param {Number} point to complete evaluation
 * @param {Number} quantity of divisions
 * @return {Number} result
 */
calculus.riemann = function (func, start, finish, n) {
  var inc = (finish - start) / n, totalHeight = 0, i;
  
  for (i = start; i < finish; i += inc)
    totalHeight += evaluate(func, i);

  return totalHeight * inc;
};


/**
 * Helper function in calculating integral of a function
 * from a to b using simpson quadrature.
 *
 * @param {String} math function to be evaluated (provided as a string)
 * @param {Number} point to initiate evaluation
 * @param {Number} point to complete evaluation
 * @return {Number} evaluation
 */
function simpsonDef (func, a, b) {
  var c = (a + b) / 2;
  var d = Math.abs(b - a) / 6;
  return d * (evaluate(func, a) + 4 * evaluate(func, c) + evaluate(func, b));
}


/**
 * Helper function in calculating integral of a function
 * from a to b using simpson quadrature.  Manages recursive
 * investigation, handling evaluations within an error bound.
 *
 * @param {String} math function to be evaluated (provided as a string)
 * @param {Number} point to initiate evaluation
 * @param {Number} point to complete evaluation
 * @param {Number} error bound (epsilon)
 * @param {Number} total value
 * @return {Function} recursive evaluation of left and right side
 */
function simpsonRecursive (func, a, b, eps, whole) {
  var c = a + b;
  var left = simpsonDef(func, a, c);
  var right = simpsonDef(func, c, b);
  if (Math.abs(left + right - whole) <= 15 * eps) {
    return left + right + (left + right - whole) / 15;
  } else {
    return simpsonRecursive(func, a, c, eps/2, left) + simpsonRecursive(func, c, b, eps / 2, right);
  }
}


/**
 * Evaluate area under a curve using adaptive simpson quadrature.
 *
 * @param {String} math function to be evaluated (provided as a string)
 * @param {Number} point to initiate evaluation
 * @param {Number} point to complete evaluation
 * @param {Number} error bound (epsilon)
 * @return {Function} area underneath curve
 */
calculus.adaptiveSimpson = function (func, a, b, eps) {
  return simpsonRecursive(func, a, b, eps, simpsonDef(func, a, b));
};


/**
 * Calculate limit of a function at a given point.  Can approach from
 * left, middle, or right.
 *
 * @param {String} math function to be evaluated (provided as a string)
 * @param {Number} point to evaluate
 * @param {String} approach to limit
 * @return {Number} limit
 */
calculus.limit = function (func, point, approach) {
  if (approach === 'left') {
    return evaluate(func, point - 0.001);
  } else if (approach === 'right') {
    return evaluate(func, point + 0.001);
  } else if (approach === 'middle') {
    return (calculus.limit(func, point, 'left') + calculus.limit(func, point, 'right')) / 2;
  } else {
    throw new Error('Approach not provided');
  }
};
