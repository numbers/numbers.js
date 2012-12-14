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
 * Returns the prime factors of a number. <br/>
 * More info (http://bateru.com/news/2012/05/code-of-the-day-javascript-prime-factors-of-a-number/)
 * Taken from https://github.com/LarryBattle/Ratio.js
 *
 * @param {Number} num
 * @return {Array} an array of numbers
 * @example
prime.factorization(20).join(',') === "2,2,5"
 **/
prime.factorization = function (num) {
  num = Math.floor(num);
	var root,
	factors = [],
	x,
	sqrt = Math.sqrt,
	doLoop = 1 < num && isFinite(num);
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
