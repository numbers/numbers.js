/**
 * calculus.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var numbers = require('../numbers');
var calculus = exports;

/**
 * Calculate point differential for a specified function at a
 * specified point.  For functions of one variable.
 *
 * @param {Function} math function to be evaluated.
 * @param {Number} point to be evaluated.
 * @return {Number} result.
 */
calculus.pointDiff = function (func, point) {
  var a = func(point - 0.001);
  var b = func(point + 0.001);

  return (b - a) / (0.002);
};

/**
 * Calculate riemann sum for a specified, one variable, function
 * from a starting point, to a finishing point, with n divisions.
 *
 * @param {Function} math function to be evaluated.
 * @param {Number} point to initiate evaluation.
 * @param {Number} point to complete evaluation.
 * @param {Number} quantity of divisions.
 * @param {Function} (Optional) Function that returns which value 
 *   to sample on each interval; if none is provided, left endpoints
 *   will be used.
 * @return {Number} result.
 */
calculus.Riemann = function (func, start, finish, n, sampler) {
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
 * @param {Function} math function to be evaluated.
 * @param {Number} point to initiate evaluation.
 * @param {Number} point to complete evaluation.
 * @return {Number} evaluation.
 */
function SimpsonDef (func, a, b) {
  var c = (a + b) / 2;
  var d = Math.abs(b - a) / 6;
  return d * (func(a) + 4 * func(c) + func(b));
}

/**
 * Helper function in calculating integral of a function
 * from a to b using simpson quadrature.  Manages recursive
 * investigation, handling evaluations within an error bound.
 *
 * @param {Function} math function to be evaluated.
 * @param {Number} point to initiate evaluation.
 * @param {Number} point to complete evaluation.
 * @param {Number} total value.
 * @param {Number} Error bound (epsilon).
 * @return {Number} recursive evaluation of left and right side.
 */
function SimpsonRecursive (func, a, b, whole, eps) {
  var c = a + b;
  var left = SimpsonDef(func, a, c);
  var right = SimpsonDef(func, c, b);
  
  if (Math.abs(left + right - whole) <= 15 * eps) {
    return left + right + (left + right - whole) / 15;
  } else {
    return SimpsonRecursive(func, a, c, eps / 2, left) + SimpsonRecursive(func, c, b, eps / 2, right);
  }
}

/**
 * Evaluate area under a curve using adaptive simpson quadrature.
 *
 * @param {Function} math function to be evaluated.
 * @param {Number} point to initiate evaluation.
 * @param {Number} point to complete evaluation.
 * @param {Number} Optional error bound (epsilon); 
 *   global error bound will be used as a fallback.
 * @return {Number} area underneath curve.
 */
calculus.adaptiveSimpson = function (func, a, b, eps) {
  eps = (typeof eps === 'undefined') ? numbers.EPSILON : eps;

  return SimpsonRecursive(func, a, b, SimpsonDef(func, a, b), eps);
};

/**
 * Calculate limit of a function at a given point. Can approach from
 * left, middle, or right.
 *
 * @param {Function} math function to be evaluated.
 * @param {Number} point to evaluate.
 * @param {String} approach to limit.
 * @return {Number} limit.
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
 * Calculate Stirling approximation gamma.
 *
 * @param {Number} number to calculate.
 * @return {Number} gamma.
 */
calculus.StirlingGamma = function (num) {
  return Math.sqrt(2 * Math.PI / num) * Math.pow((num / Math.E), num);
};

/**
 * Calculate Lanczos approximation gamma.
 *
 * @param {Number} number to calculate.
 * @return {Number} gamma.
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
};


/**
 * Calculate the integral of f(x1,x2,...) over intervals 
 * [a1,b1], [a2,b2], ..., using the montecarlo method:
 * 
 * integral of f(x,y) = (1/N)*(b2-a2)*(b1-a1)*sum(f)
 *
 * where N = number of points for f to be evaluated at.
 * The error for this method is about 1/root(N) and will
 * always converge.
 *
 * @param {Function} math function.
 * @param {Number} number of points
 * @param {Array(s)} intervals
 * @return {Number} approximation to integral
 */
calculus.MonteCarlo = function(func, N) {
  //takes an arbitrary number of arguments after N
  //all of the arguments must be arrays which are intervals
  if (arguments.length < 2) {
    throw new Error('Please enter at least one interval.');
  } else if (N <= 0) {
    throw new Error('Please use a positive integer for N.');
  }
  var L = [];
  N = Math.ceil(N);
  for (var i=2; i<arguments.length; i++) {L.push(arguments[i]);}
  
  var coeff = L.map(function(l) { //subtract the endpoints
    return l[1] - l[0];
  }).reduce(function(a,b) { //multiply each endpoint difference
    return a*b;
  }) / N;

  var fvals = numbers.matrix.transpose(L.map(function(l) {
    //generate an array of arrays, each nested array being N
    //random values in each interval - N-by-3 array, and then
    //transpose it to get a 3-by-N array
    return numbers.statistic.randomSample(l[0],l[1],N);
  })).map(function(l) {
    //evaluate func at each set of points
    return func.apply(null, [ l[0],l[1],l[2] ]);
  });

  return coeff * fvals.reduce(function(a,b) {return a+b;});
}