var basic = exports;

/**
 * Determine the summation of numbers in a given array
 *
 * @param {Array} collection of numbers
 * @return {Number} sum of numbers in array
 */
basic.addition = function (arr) {
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
basic.subtraction = function (arr) {
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
basic.product = function (arr) {
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
basic.factorial = function (num) {
  
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
basic.gcd = function (num1, num2) {
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
basic.lcm = function (num1, num2) {
  return Math.abs(num1 * num2) / basic.gcd(num1,num2);
};

/**
 * Retrieve a specified quantity of elements from an array, at random.
 *
 * @param {Array} set of values to select from
 * @param {Number} quantity of elements to retrieve
 * @return {Array} random elements
 */
basic.random = function (arr, quant) {
  if (arr.length <= quant){
    throw new Error('Quantity requested exceeds size of array');
  } else if (arr.length === 0){
    throw new Error('Empty array');
  } else {
    return basic.shuffle(arr).slice(0, quant);
  }
};

/**
 * Shuffle an array, in place
 *
 * @param {Array} array to be shuffled
 * @return {Array} shuffled array
 */
basic.shuffle = function (array) {
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
 * Find maximum value in an array
 *
 * @param {Array} array to be traversed
 * @return {Number} maximum value in the array
 */
basic.max = function (array) {
    return return Math.max.apply(Math, array);
};


/**
 * Find minimum value in an array
 *
 * @param {Array} array to be traversed
 * @return {Number} minimum value in the array
 */
basic.min = function (array) {
    return return Math.min.apply(Math, array);
};
