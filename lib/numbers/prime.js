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

/**
  * Determine if a number is prime in Polynomial time, using a deterministic algorithm.
  * http://en.wikipedia.org/wiki/AKS_primality_test
  * Built off of: http://www.southerington.com/souther/projects/aks/RP-3_report.pdf.
  * @param {Number} number to Evaluate
  * @return {Boolean} return true if value is prime. false otherwise.
  */
// TODO Determine how to calculate the polynomial reduction 
// (also note that miller-rabin should be more performant)
// Saving in comments because I want to work on it later. 
// The paper is using a library (LiDIA that I haven't been able to look at thoroughly)
prime.AKS = function(n) {
  if (n <= 1 || n % 2 === 0) return false;
  // 1. If (n = a^b for a ∈ N and b > 1), output COMPOSITE
  if (basic.perfect_power(n)) return false;
  // 2. Find the smallest r such that Or(n) > (logn)**2
  var logn = Math.log(n+0.0),
      logn2 = Math.pow(logn, 2),
      ceil = (q, logn2);
  while (true) {
    var foundR = true;
    for (var i = 1; i <= logn2; i++) {
      if (1 === basic.powerMod(n, j, q, 0)) { //0?
        foundR = false;
        break;
      }  
    }
    if (found_r) {
      r = q;
      break;
    }
    q++;
  }
  // 3. If gcd(a,n) ≠ 1 ∀ a ≤ r, output COMPOSITE
  var found_counter = false;
  for (var a = 2; a <= r; a++) {
    if(1 === basic.gcd(a, n)) found_counter = true;
  }
  if (!found_counter) return false;
  //4. for a = 1 to floor(√r * log(n)) if ((x+ a)^n ≠ x^n + a % (x^r -1, n))
  for (var a = 1; a < Math.floor(Math.sqrt(r)*logn)); a++) {
    if ()
  }
};

/**
  * Determine if a number is prime in Polynomial time, using a randomized algorithm. 
  * http://en.wikipedia.org/wiki/Miller-Rabin_primality_test
  * @param {Number} number to Evaluate
  * @param {Number} number to Determine accuracy rate (number of trials) default value = 20.
  * @return {Boolean} return true if value is prime. false otherwise.
  */
prime.millerRabin = function(n, k) {
  if (arguments.length === 1) var k = 20;
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
    if ((Math.pow(a, d) % n) === 1) return false;
    for (var i = 0; i < s; i ++) {
      if (Math.pow(a, Math.pow(2, i) * d) % n === n - 1) return false;
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
  * Determine if a number is a perfect power.
  * @param {Number} value in question
  * @return {Boolean} true if it is a perfect power.
  */
prime.isPerfectPower = function(n) {

};

/**
  * Determine if a number is a prime power.
  * @param {Number} value in question
  * @return {Boolean} true if it is a prime power.
  */
prime.isPrimePower = function(n) {

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

/* Using trial method, evaluate the prime factorization of a value.
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
