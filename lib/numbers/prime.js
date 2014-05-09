/**
 * prime.js
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


var basic = require('./basic');
var prime = exports;

/**
 * Determine if number is prime.  This is far from high performance.
 *
 * @param {Number} number to evaluate.
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
 * Returns the prime factors of a number.
 * More info (http://bateru.com/news/2012/05/code-of-the-day-javascript-prime-factors-of-a-number/)
 * Taken from Ratio.js
 *
 * @param {Number} num
 * @return {Array} an array of numbers
 * @example prime.factorization(20).join(',') === "2,2,5"
 **/
prime.factorization = function (num) {
  num = Math.floor(num);
  var root;
  var factors = [];
  var x;
  var sqrt = Math.sqrt;
  var doLoop = 1 < num && isFinite(num);
  
  while (doLoop) {
    root = sqrt(num);
    x = 2;
    if (num % x) {
      x = 3;
      while ((num % x) && ((x += 2) < root)) {}
    }
    
    x = (root < x) ? num : x;
    factors.push(x);
    doLoop = (x !== num);
    num /= x;
  }

  return factors;
};

/**
 * Determine if a number is prime in Polynomial time, using a randomized algorithm. 
 * http://en.wikipedia.org/wiki/Miller-Rabin_primality_test
 *
 * @param {Number} number to Evaluate.
 * @param {Number} number to Determine accuracy rate (number of trials) default value = 20.
 * @return {Boolean} return true if value is prime. false otherwise.
 */
prime.millerRabin = function(n, k) {
  if (arguments.length === 1) k = 20;
  if (n === 2) return true;
  if (!basic.isInt(n) || n <= 1 || n % 2 === 0) return false;

  var s = 0;
  var d = n - 1;

  while (true) {
    var dm = basic.divMod(d, 2);
    var quotient = dm[0];
    var remainder = dm[1];

    if (remainder === 1) break;

    s += 1;
    d = quotient;
  }

  var tryComposite = function (a) {
    if (basic.powerMod(a, d, n) === 1) return false;
    
    for (var i = 0; i < s; i ++) {
      if (basic.powerMod(a, Math.pow(2, i) * d, n) === n - 1) return false;
    }
    
    return true;
  }

  for (var i = 0; i < k; i++) {
    var a = 2 + Math.floor(Math.random() * (n - 2 - 2));
    if (tryComposite(a)) return false;
  }

  return true;
};

/**
 * Return a list of prime numbers from 1...n, inclusive.
 *
 * @param {Number} upper limit of test n.
 * @return {Array} list of values that are prime up to n.
 */ 
prime.sieve = function (n) {
  if (n < 2) return [];
  var result = [2];
  for (var i = 3; i <= n; i++) {
    var notMultiple = false;
    
    for (var j in result) { 
      notMultiple = notMultiple || (0 === i % result[j]); 
    }

    if (!notMultiple) {
      result.push(i);
    }
  }

  return result;
};

/**
 * Determine if two numbers are coprime.
 *
 * @param {Number} number.
 * @param {Number} number.
 * @return {Boolean} whether the values are coprime or not.
 */
prime.coprime = function (a, b) {
  return basic.gcd(a, b) === 1;
};

/**
 * Determine if a number is a perfect power.
 * Please note that this method does not find the minimal value of k where
 * m^k = n
 * http://en.wikipedia.org/wiki/Perfect_power
 *
 * @param {Number} value in question
 * @return {Array|Boolean} [m, k] if it is a perfect power, false otherwise
 */
prime.getPerfectPower = function(n) {
  var test = prime.getPrimePower(n);
  if (test && test[1] > 1) return test;
  return false;
};

/**
 * Determine if a number is a prime power and return the prime and the power.
 * http://en.wikipedia.org/wiki/Prime_power
 *
 * @param {Number} value in question
 * @return {Array|Boolean}  if it is a prime power, return [prime, power].
 */
prime.getPrimePower = function(n) {
  if (n < 2) return false;
  if (prime.millerRabin(n)) return [n, 1]; 
  if (n % 2 === 0) return [2, n.toString(2).length - 1];

  var factors = prime.factorization(n);

  if (!factors) return false;
  
  var len = factors.length;
  
  for (var i = 0; i < len; i++) {
    var t = 0, p = 0;

    while (t <= n) {
      t = Math.pow(factors[i], p);
      if (t / n === 1) return [factors[i], p];
      p++; 
    }
  }

  return false;
};
