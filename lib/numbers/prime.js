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
  * Determine if a number is prime in Polynomial time, using a deterministic algorithm.
  * http://en.wikipedia.org/wiki/AKS_primality_test
  * Built off of improvements to the AKS test made by Lenstra & Pomerance.
  * @param {Number} number to Evaluate
  * @return {Boolean} return true if value is prime. false otherwise.
  */
// TODO Determine how to calculate the polynomial reduction (also note that miller-rabin should be more performant)
// prime.AKS = function(n) {
//   if (n <= 1 || n % 2 === 0) return false;
//   // 1. If (n = a^b for a ∈ N and b > 1), output COMPOSITE
//   if (basic.perfect_power(n)) return false;

//   // 2. Find the smallest r such that Or(n) > (logn)**2
//   var logn = Math.log(n+0.0),
//       logn2 = Math.pow(logn, 2),
//       ceil = (q, logn2);

//   while (true) {
//     var found_r = true;
//     for (var i = 1; i <= logn2; i++) {
//       if (1 === basic.power_mod(n, j, q, 0)) { //0?
//         found_r = false;
//         break;
//       }  
//     }
//     if (found_r) {
//       r = q;
//       break;
//     }
//     q++;
//   }

//   // 3. If gcd(a,n) ≠ 1 ∀ a ≤ r, output COMPOSITE
//   var found_counter = false;
//   for (var a = 2; a <= r; a++) {
//     if(1 === basic.gcd(a, n)) found_counter = true;
//   }
//   if (!found_counter) return false;

//   //4. for a = 1 to floor(√r * log(n)) if ()
//   for (var a = 1; a < Math.floor(Math.sqrt(r)*logn)); a++) {
//     if ()
//   }

// };



/**
  * Determine if a number is prime in Polynomial time, using a randomized algorithm. 
  * http://en.wikipedia.org/wiki/Miller-Rabin_primality_test
  * @param {Number} number to Evaluate
  * @param {Number} number to Determine accuracy rate (number of trials) default value = 20.
  * @return {Boolean} return true if value is prime. false otherwise.
  */
prime.miller_rabin = function(n, k) {
  if (arguments.length === 1) var k = 20;
  if (n === 2) return true;
  if (!basic.is_int(n) || n <= 1 || n % 2 === 0) return false;

  var s = 0,
      d = n - 1;  
  while(true) {
    var dm = basic.divmod(d, 2),
        quotient = dm[0],
        remainder = dm[1];
    if (remainder === 1) break;
    s += 1;
    d = quotient;
  }

  var try_composite = function(a) {
    if ((Math.pow(a, d) % n) === 1) return false;
    for (var i = 0; i < s; i ++) {
      if (Math.pow(a, Math.pow(2, i) * d) % n === n - 1) return false;
    }
    return true;
  }

  for (var i = 0; i < k; i++) {
    var a = 2 + Math.floor(Math.random() * (n - 2 - 2)); //2 - 2 because you are picking a number in the range [2, n-2].
    if (try_composite(a)) return false;
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
      //add break to increase speed slightly
    }
    if (!not_multiple) {
      result.push(i);
    }
  }
  return result;
}

// TODO: The maximum call stack size exceeds on this call. Either resolve this
// or abolish the call.
/** 
  * Using a method, evaluate the prime factorization of a value.
  * @param {Number} value to evaluate.
  * @param {Function} method to use. Defaults value = prime.miller_rabin
  * @return {Array} array of prime factors of the number.
  */
// prime.factorization = function(val, determine_method) {
//   if (arguments.length === 1) var determine_method = prime.miller_rabin;
//   if (num === 1) return [1]; //based off of algorithm implementations above. 1 is not prime.
//   var primes = [],
//       result = [];
//   loadPrimes(num, function(p) {
//     trial(num);
//   });
// 
//   function loadPrimes (n, callback) {
//     for (var i = 0 ; i < n ; i++) {
//       if (determine_method(i)) primes.push(i);
//     }
//     callback(primes);
//   }
// 
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
