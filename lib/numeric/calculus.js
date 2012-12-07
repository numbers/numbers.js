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
  var a = func(point - 0.00001);
  var b = func(point + 0.00001);

  return (b - a) / (0.00002);
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
  var inc = (finish - start) / n, totalHeight = 0, i;
  
  if(typeof sampler==="function") {
    for(i=start; i < finish; i += inc) {
      totalHeight += func(sampler(i, i+inc));
    }
  } else {
    for(i = start; i < finish; i += inc) {
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
 * @param {Function} math function to be evaluated
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
 * @param {Function} math function to be evaluated
 * @param {Number} point to evaluate
 * @param {String} approach to limit
 * @return {Number} limit
 */
calculus.limit = function (func, point, approach) {
  if (approach === 'left') {
    return func(point - 0.001);
  } else if (approach === 'right') {
    return func(point + 0.001);
  } else if (approach === 'middle') {
    return (calculus.limit(func, point, 'left') + calculus.limit(func, point, 'right')) / 2;
  } else {
    throw new Error('Approach not provided');
  }
};
