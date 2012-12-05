/**
 * numeric.ly is a JavaScript mathematics library which can be used in the browser
 * by including this script, or used in a node.js application by including this
 * module.
 *
 *
 * It's still in early stages, focusing primarily on array operations, statistics,
 * a fair amount of calculus, and some algebra.
 *
 */


// Variable declaration
var numeric = module.exports = function () {
  this.name = 'numeric';
};


/**
 * Determine the summation of numbers in a given array
 *
 * @param {Array} collection of numbers
 * @return {Number} sum of numbers in array
 */
numeric.prototype.addition = function (arr) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    var total = 0;
    for (var i = 0 ; i < arr.length ; i++) {
      if (typeof(arr[i]) === 'number')
        total = total + arr[i];
      else
        throw new Error('All elements in array must be numbers');
    }
    return total;
  } else {
    throw new Error('Input must be of type Array');
  }
};


/**
 * Subtracts elements from one another in array.
 *
 * e.g [5,3,1,-1] -> 5 - 3 - 1 - (-1) = 2
 *
 * @param {Array} collection of numbers
 * @return {Number} difference
 */
numeric.prototype.subtraction = function (arr) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    var total = arr[arr.length - 1];
    for (var i = arr.length - 2; i >= 0; i--) {
      if (typeof(arr[i]) === 'number')
        total -= arr[i];
      else
        throw new Error('All elements in array must be numbers');
    }
    return total;
  } else {
    throw new Error('Input must be of type Array');
  }
};


/**
 * Product of all elements in an array
 *
 * @param {Array} collection of numbers
 * @return {Number} product
 */
numeric.prototype.product = function (arr) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    var total = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (typeof(arr[i]) === 'number')
        total = total * arr[i];
      else
        throw new Error('All elements in array must be numbers');
    }
    return total;
  } else {
    throw new Error('Input must be of type Array');
  }
};


/**
 * Factorial for some integer
 *
 * @param {Number} integer
 * @return {Number} result
 */
numeric.prototype.factorial = function (num) {
  
  var arr = [];

  function _factorial(n) {
    if (n === 0 || n === 1) return 1;

    if (arr[n] > 0) return arr[n];

    else return arr[n] = _factorial(n - 1) * n;
  }

  return _factorial(num);
};


/**
 * Calculate the greastest common divisor amongst two integers.
 *
 * @param {Number} number A
 * @param {Number} number B
 * @return {Number} greatest common divisor for integers A, B
 */
numeric.prototype.gcd = function (num1, num2) {
  var result;
  if (num1 > num2) {
    for (var i = 0 ; i <= num2 ; i++) {
      if (num2 % i === 0) {
        if (num1 % i === 0) {
          result = i;
        }
      }
    }
    return result;
  } else if (num2 > num1) {
    for (var j = 0 ; j <= num2 ; j++) {
      if (num1 % j === 0) {
        if (num2 % j === 0) {
          result = j;
        }
      }
    }
    return result;
  } else {
    result = num1 * num2 / num1;
    return result;
  }
};


/**
 * Calculate the least common multiple amongst two integers.
 *
 * @param {Number} number A
 * @param {Number} number B
 * @return {Number} least common multiple for integers A, B
 */
numeric.prototype.lcm = function (num1, num2) {
  return Math.abs(num1 * num2) / this.gcd(num1,num2);
};


/**
 * Retrieve a specified quantity of elements from an array, at random.
 *
 * @param {Array} set of values to select from
 * @param {Number} quantity of elements to retrieve
 * @return {Array} random elements
 */
numeric.prototype.random = function (arr, quant) {
  if (arr.length <= quant){
    throw new Error('Quantity requested exceeds size of array');
  } else if (arr.length === 0){
    throw new Error('Empty array');
  } else {
    return this.shuffle(arr).slice(0, quant);
  }
};


/**
 * Shuffle an array, in place
 *
 * @param {Array} array to be shuffled
 * @return {Array} shuffled array
 */
numeric.prototype.shuffle = function (array) {
  var m = array.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};


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
numeric.prototype.pointDiff = function (func, point) {
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
numeric.prototype.riemann = function (func, start, finish, n) {
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
numeric.prototype.adaptiveSimpson = function (func, a, b, eps) {
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
numeric.prototype.limit = function (func, point, approach) {
  if (approach === 'left') {
    return evaluate(func, point - 0.001);
  } else if (approach === 'right') {
    return evaluate(func, point + 0.001);
  } else if (approach === 'middle') {
    return (limit(func, point, 'left') + limit(func, point, 'right')) / 2;
  } else {
    throw new Error('Approach not provided');
  }
};


// Matrix functions
numeric.prototype.matrix = {};


/**
 * Add two matrices together.  Matrices must be of same dimension.
 *
 * @param {Array} matrix A
 * @param {Array} matrix B
 * @return {Array} summed matrix.
 */
numeric.prototype.matrix.addition = function (arrA, arrB) {
  if ((arrA.length === arrB.length) && (arrA[0].length === arrB[0].length)) {
    var result = new Array(arrA.length);
    for (var i = 0; i < arrA.length; i++) {
      result[i] = new Array(arrA[i].length);
      for (var j = 0; j < arrA[i].length; j++) {
        result[i][j] = arrA[i][j] + arrB[i][j];
        console.log(result[i][j]);
      }
    }
    return result;
  } else {
    throw new Error('Matrix mismatch');
  }
};


/**
 * Scalar multiplication on an matrix.
 *
 * @param {Array} matrix
 * @param {Number} scalar
 * @return {Array} updated matrix
 */
numeric.prototype.matrix.scalar = function (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      arr[i][j] = val * arr[i][j];
    }
  }
  return arr;
};


/**
 * Transpose a matrix
 *
 * @param {Array} matrix
 * @return {Array} transposed matrix.
 */
numeric.prototype.matrix.transpose = function (arr) {
  var result = new Array(arr[0].length);
  for (var i = 0; i < arr[0].length; i++) {
    result[i] = new Array(arr.length);
    for (var j = 0; j < arr.length; j++){
      result[i][j] = arr[j][i];
    }
  }
  return result;
};


/**
 * Create an identity matrix of dimension n x n.
 *
 * @param {Number} dimension of the identity array to be returned
 * @return {Array} n x n identity matrix.
 */
numeric.prototype.matrix.identity = function (n) {
  var result = new Array(n);
  for (var i = 0 ; i < n ; i++) {
    result[i] = new Array(n);
    for (var j = 0 ; j < n ; j++) {
      result[i][j] = (i === j) ? 1 : 0;
    }
  }
  return result;
};


/**
 * Evaluate dot product of two vectors.  Vectors must be of same length.
 *
 * @param {Array} vector
 * @param {Array} vector
 * @return {Array} dot product
 */
numeric.prototype.matrix.dotproduct = function (vectorA, vectorB) {
  if (vectorA.length === vectorB.length) {
    var result = 0;
    for (var i = 0 ; i < vectorA.length ; i++) {
      result += vectorA[i]*vectorB[i];
    }
    return result;
  } else {
    throw new Error("Vector mismatch");
  }
};


/**
 * Multiply two matrices. They must abide by standard matching.
 *
 * e.g. A x B = (m x n) x (n x m), where n, m are integers who define
 * the dimensions of matrices A, B.
 *
 * @param {Array} matrix
 * @param {Array} matrix
 * @return {Array} result of multiplied matrices
 */
numeric.prototype.matrix.multiply = function (arrA, arrB) {
  if (arrA[0].length === arrB.length) {
    var result = new Array(arrA.length);
    
    for (var x = 0 ; x < arrA.length ; x++) {
      result[x] = new Array(arrB[0].length);
    }

    var arrB_T = transpose(arrB);
    
    for (var i = 0 ; i < result.length ; i++) {
      for (var j = 0 ; j < result[i].length ; j++) {
        result[i][j] = dotproduct(arrA[i],arrB_T[j]);
      }
    }
    return result;
  } else {
    throw new Error("Array mismatch");
  }
};


/**
 * Evaluate determinate of matrix.  Matrix must be of dimension
 * 2 or 3.
 *
 * @param {Array} matrix
 * @return {Number} determinant
 */
numeric.prototype.matrix.determinant = function (m) {
  if ((m.length === 2) && (m[0].length === 2)) {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  } else if ((m.length === 3) && (m[0].length === 3)) {
    return  m[0][0] * m[1][1] * m[2][2] +
            m[0][1] * m[1][2] * m[2][0] +
            m[0][2] * m[1][0] * m[2][1] -
            m[0][2] * m[1][1] * m[2][0] -
            m[0][1] * m[1][0] * m[2][2] -
            m[0][0] * m[1][2] * m[2][1];
  } else {
    throw new Error('Matrix must be dimension 2 x 2 or 3 x 3');
  }
};


// Prime number functions
numeric.prototype.prime = {};


/**
 * Determine if number is prime.  This is far from high performance.
 *
 * @param {Number} number to evaluate
 * @return {Boolean} return true if value is prime. false otherwise.
 */
numeric.prototype.prime.simple = function (val) {
  if (val == 1) return false;
  else if (val == 2) return true;
  else if (val !== undefined) {
    var start = 2;
    var result = true;
    while (start < val) {
      if (val % start === 0) {
        result = false;
        break;
      } else {
        start++;
      }
    }
    return result;
  }
};


/**
 * Using trial method, evaluate the prime factorization of a value.
 *
 * @param {Number} number to evaluate
 * @return {Array} array of prime factors for value
 */
numeric.prototype.prime.factorization = function (num) {
  if (num === 1) return [1];
  var primes = [],
      result = [];
  loadPrimes(num, function(p) {
    trial(num);
  });

  function loadPrimes (n, callback) {
    for (var i = 0 ; i < n ; i++) {
      if (numeric.prime.simple(i)) primes.push(i);
    }

    callback(primes);
  }

  function trial (n) {
    var quant = Math.floor(Math.random() * primes.length),
        temp = numeric.random(primes, quant);
    if (numeric.product(temp) === num) {
      console.log(temp);
      return temp;
    } else {
      trial(n);
    }
  }
};


// Statistic methods
numeric.prototype.statistic = {};


/**
 * Calculate the mean value of a set of numbers in array.
 *
 * @param {Array} set of values
 * @return {Number} mean value
 */
numeric.prototype.statistic.mean = function (arr) {
  var count = arr.length;
  var sum = this.addition(arr);
  return sum/count;
};


/**
 * Calculate the median value of a set of numbers in array.
 *
 * @param {Array} set of values
 * @return {Number} median value
 */
numeric.prototype.statistic.median = function (arr) {
  var count = arr.length;
  var middle;
  if (count % 2 === 0) {
    return (arr[count/2] + arr[(count/2 - 1)])/2;
  } else {
    return arr[Math.floor(count / 2)];
  }
};


/**
 * Calculate the mode value of a set of numbers in array.
 *
 * @param {Array} set of values
 * @return {Number} mode value
 */
numeric.prototype.statistic.mode = function (arr) {
  //sort array
  var maxIndex = 0, maxOccurence = 0, tempIndex = 0, tempOccurence = 0;
  arr = arr.sort();
  while (tempIndex < arr.length) {
    for (var j = tempIndex; j < arr.length; j++) {
      if (arr[j] == arr[tempIndex]) {
        tempOccurence++;
      } else {
        break;
      }
    }
    if (tempOccurence > maxOccurence) {
      maxOccurence = tempOccurence;
      maxIndex = tempIndex;
    }

    tempIndex = j;
    tempOccurence = 0;
  }
  return arr[maxIndex];
};


/**
 * Return a random sample of values over a set of bounds with
 * a specified quantity.
 *
 * @param {Number} lower bound
 * @param {Number} upper bound
 * @param {Number} quantity of elements in random sample
 * @return {Array} random sample
 */
numeric.prototype.statistic.randomSample = function (lower, upper, n) {
  var sample = [],
      temp = 0;
  for (var i = 0 ; i < n ; i++) {
    temp = Math.random()*upper;
    if (temp > lower)
      sample[i] = temp;
  }
  return sample;
};


/**
 * Evaluate the standard deviation for a set of values.
 *
 * @param {Array} set of values
 * @return {Number} standard deviation
 */
numeric.prototype.statistic.standardDev = function (arr) {
  var count = arr.length;
  var mean = mean(arr);
  var squaredArr = [];
  for (var i = 0; i < arr.length; i++) {
    squaredArr[i] = Math.pow((arr[i] - mean),2);
  }
  return Math.sqrt((1/count) * this.addition(squaredArr));
};


/**
 * Evaluate the correlation amongst a set of values.
 *
 * @param {Array} set of values
 * @return {Number} correlation
 */
numeric.prototype.statistic.correlation = function (arrX, arrY) {
  if (arrX.length == arrY.length) {
    var numerator = 0;
    var denominator = (arrX.length) * (this.statistic.standardDev(arrX)) * (this.statistic.standardDev(arrY));
    var xMean = mean(arrX);
    var yMean = mean(arrY);
    for (var i = 0 ; i < arrX.length ; i++) {
      numerator += (arrX[i] - xMean) * (arrY[i] - yMean);
    }
    return numerator / denominator;
  } else {
    throw new Error('Array mismatch');
  }
};


// Useless methods
numeric.prototype.useless = {};

/**
 * Populate the given array with a Collatz Sequence
 * @param {Number} first number
 * @param {Array} arrary to be populated
 */
 numeric.prototype.useless.collatz = function (n, result) {
  result.push(n);
  if (n == 1) return;
  else if (n % 2 === 0) this.useless.collatz(n/2, result);
  else this.useless.collatz(3 * n + 1, result);
};