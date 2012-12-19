var basic = require('./basic');
var prime = exports;

/**
 * Determine if number is prime.  This is far from high performance.
 *
 * @param {Number} number to evaluate
 * @return {Boolean} return true if value is prime. false otherwise.
 */
prime.simple = function (val) {
  if (val === 1) return false;
  else if (val === 2) return true;
  else if (val !== undefined) {
    var start = 1;
    var valSqrt = Math.ceil(Math.sqrt(val));
    while (++start <= valSqrt) {
      if (val % start === 0) {
        return false;
      }
    }
    return true;
  }
};

/* 
 * Using trial method, evaluate the prime factorization of a value.
 *
 * Note: incredibly slow.
 * 
 * @param {Number} number to evaluate
 * @param {Number} Max number of attempts
 * @return {Array|Boolean} array of prime factors for value; false if no set was found.
 */
prime.factorization = function (num, max) {
  if (num === 1) return [1];
  if (prime.simple(num)) return [num];
  
  var primes = [],
      result = [],
      temp   = [1],
      quant;
   
  for (var i = 0 ; i < num; i++) {
    if (prime.simple(i)) primes.push(i);
  }
  
  while(basic.product(temp) !== num && max > 0) {
    max--;
    quant = Math.ceil(Math.random() * (primes.length-1));
    temp = basic.random(primes, quant, true);
  }
  
  return (max > 0 || basic.product(temp) === num) ? temp : false;
};

/**
  * Determine if a number is prime in Polynomial time, using a randomized algorithm. 
  * http://en.wikipedia.org/wiki/Miller-Rabin_primality_test
  * @param {Number} number to Evaluate
  * @param {Number} number to Determine accuracy rate (number of trials) default value = 20.
  * @return {Boolean} return true if value is prime. false otherwise.
  */
prime.millerRabin = function(n, k) {
  if (arguments.length === 1) k = 20;
  if (n === 2) return true;
  if (!basic.isInt(n) || n <= 1 || n % 2 === 0) return false;

  var s = 0,
      d = n - 1;  
  while(true) {
    var dm = basic.divMod(d, 2),
        quotient = dm[0],
        remainder = dm[1];
    if (remainder === 1) break;
    s += 1;
    d = quotient;
  }

  var tryComposite = function(a) {
    if (basic.powerMod(a, d, n) === 1) return false;
    for (var i = 0; i < s; i ++) {
      if (basic.powerMod(a, Math.pow(2, i) * d, n) === n - 1) return false;
    }
    return true;
  }

  for (var i = 0; i < k; i++) {
    var a = 2 + Math.floor(Math.random() * (n - 2 - 2)); //2 - 2 because you are picking a number in the range [2, n-2].
    if (tryComposite(a)) return false;
  }

  return true;
};

/**
  * Return a list of prime numbers from 1...n, inclusive.
  * @param {Number} upper limit of test n.
  * @return {Array} list of values that are prime up to n.
  */ 
prime.sieve = function(n) {
  if (n < 2) return [];
  var result = [2];
  for (var i = 3; i <= n; i++) {
    var not_multiple = false;
    for (var j in result) { 
      not_multiple = not_multiple || (0 === i % result[j]); 
    }
    if (!not_multiple) {
      result.push(i);
    }
  }
  return result;
};
