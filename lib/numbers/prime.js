/**
 * numbers.js
 *
 * top level management of numbers extensions
 *
 * (C) 2013 Steve Kaliski
 * MIT License
 *
 */
 
var basic = require('./core');
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


/**
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
