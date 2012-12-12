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


// TODO: The maximum call stack size exceeds on this call. Either resolve this
// or abolish the call.
/**
 * Using trial method, evaluate the prime factorization of a value.
 *
 * @param {Number} number to evaluate
 * @return {Array} array of prime factors for value
 */
// prime.factorization = function (num) {
//   if (num === 1) return [1];
//   var primes = [],
//       result = [];
//   loadPrimes(num, function(p) {
//     trial(num);
//   });

//   function loadPrimes (n, callback) {
//     for (var i = 0 ; i < n ; i++) {
//       if (prime.simple(i)) primes.push(i);
//     }

//     callback(primes);
//   }

//   function trial (n) {
//     var quant = Math.floor(Math.random() * primes.length),
//         temp = basic.random(primes, quant);
//     if (basic.product(temp) === num) {
//       return temp;
//     } else {
//       trial(n);
//     }
//   }
// };
