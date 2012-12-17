var basic = exports;

/**
 * Determine the summation of numbers in a given array
 *
 * @param {Array} collection of numbers
 * @return {Number} sum of numbers in array
 */
basic.sum = function (arr) {
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
    for (var i = 1, length = arr.length; i < length; i++) {
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
 * Return the square of any value.
 *
 * @param {Number} number
 * @return {Number} square of number
 */
basic.square = function (num) {
  return num * num;
};

/**
 * Calculate the binomial coefficient (n choose k)
 *
 * @param {Number} available choices
 * @param {Number} number chosen
 * @return {Number} number of possible choices
 */
basic.binomial = function(n, k) {

  var arr = [];

  function _binomial(n, k) {
    if(n >= 0 && k === 0) return 1;

    if(n === 0 && k > 0) return 0;

    if(arr[n] && arr[n][k] > 0) return arr[n][k];

    if(!arr[n])
      arr[n] = [];

    return arr[n][k] = _binomial(n - 1, k - 1) + _binomial(n - 1, k);
  }

  return _binomial(n, k);
};

/**
 * Factorial for some integer
 *
 * @param {Number} integer
 * @return {Number} result
 */
basic.factorial = function (num){
  var i = 2, o = 1;
  while (i <= num) {
    o *= i++;
  } 
  return o;
};

/**
 * Calculate the greastest common divisor amongst two integers.
 * Taken from Ratio.js https://github.com/LarryBattle/Ratio.js
 * 
 * @param {Number} number A
 * @param {Number} number B
 * @return {Number} greatest common divisor for integers A, B
 */
basic.gcd = function (a, b) {
  var c;
  b = (+b && +a) ? +b : 0;
  a = b ? a : 1;
  while (b) {
      c = a % b;
      a = b;
      b = c;
  }
  return Math.abs(a);
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
 * @param {Boolean} allow the same number to be returned twice
 * @return {Array} random elements
 */
basic.random = function (arr, quant, allowDuplicates) {
  if (arr.length === 0){
    throw new Error('Empty array');
  } else if (quant > arr.length  && !allowDuplicates){
    throw new Error('Quantity requested exceeds size of array');
  }
  
  if(allowDuplicates==true) {
    var result = [], i;
    for(i=0; i<quant; i++) {
      result[i] = arr[Math.floor(Math.random() * arr.length)];
    }
    return result;    
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

/*
 * Find maximum value in an array
 *
 * @param {Array} array to be traversed
 * @return {Number} maximum value in the array
 */
basic.max = function (array) {
    return Math.max.apply(Math, array);
};

/**
 * Find minimum value in an array
 *
 * @param {Array} array to be traversed
 * @return {Number} minimum value in the array
 */
basic.min = function (array) {
    return Math.min.apply(Math, array);
};

/**
 * Create a range of numbers
 *
 * @param {Number} The start of the range
 * @param {Number} The end of the range
 * @return {Array} An array containing numbers within the range
 */
basic.range = function (start,stop,step) {
  var array, i = 0, len;

  if (arguments.length <= 1) {
    stop = start || 0;
    start = 0;
  }

  step = step || 1;

  if (stop < start) {
    step = 0-Math.abs(step);
  }

  len = Math.max(Math.ceil((stop - start) / step) + 1, 0);

  array = new Array(len);

  while (i < len) {
    array[i++] = start;
    start += step;
  }

  return array;
};

/**
  * Determine if the number is an integer
  * @param {Number} the number
  * @return {Boolean} true for int, false for not int.
  */
basic.isInt = function(n) {
  return n % 1 === 0;
}

/**
  * Calculate the divisor and modulus of two integers.
  * @param {Number} int a
  * @param {Number} int b
  * @return {Array} [div, mod]
  */
basic.divMod = function(a, b) {
  if(!basic.isInt(a) || !basic.isInt(b)) return false;
  return [Math.floor(a/b), a%b];
};

/**
  * Calculate:
  * if b >= 1: a^b mod m
  * if b = -1: modInverse(a, m)
  * if b < 1: finds a modular rth root of a such that b = 1/r.
  * @param {Number} Number a
  * @param {Number} Number b
  * @param {Number} Modulo m
  * @return {Number} see the above documentation for return values.
  */
basic.powerMod = function(a, b, m) {
  if (b < -1 || b === 0) throw new Error('Not a valid value of b');
  if (b >= 1) {
    var result = 1;
    while (b > 0) {
       if ((b % 2) == 1) {
           result = (result * a) % m;
       }
       a = (a * a) % m;
       b = floor(b / 2);
    }
    return result;
  }
  if (b === -1) {
    var modI = basic.modInverse(a, m);
    if (modI) {
      return modI;
    } else {
      throw new Error('No inverse '); 
      //could just return modI or throw in modInverse
    }
  }
  if (b < 1) {
    return basic.powerMod(a, Math.pow(b, -1), m); 
    //doesn't work with extremely small values of b.
  }
};

/**
  * Calculate the extended Euclid Algorithm or extended GCD.
  * @param {Number} int a
  * @param {Number} int b
  * @return {Array} [b, x, y] b is the GCD. x and y are the values such that ax + by = gcd(a,b) 
  */
basic.egcd = function(a, b) {
  var x = 0, 
      y = 1, 
      u = 1, 
      v = 0;

  while (a) {
    var dm = basic.divMod(b, a),
        q = dm[0], 
        r = dm[1];

    var m = x - u * q, 
        n = y - v * q;

    b = a;
    a = r;
    x = u;
    y = v;
    u = m;
    v = n;
  } 
  return [b, x, y];
};

/**
  * Calculate the modular inverse of a number
  * @param {Number} Number a
  * @param {Number} Modulo m
  * @return {Number/boolean} if true, return number, else false.
  */
basic.modInverse = function(a, m) {
  var r = basic.egcd(a, m);
  if (r[0] != 1) {
    return false;
  } 
  return r[1] % m;
};
