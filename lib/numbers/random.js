var basic = require('./basic');
var random = exports;

/**
 * Return a random sample of values over a set of bounds with
 * a specified quantity.
 *
 * @param {Number} lower bound.
 * @param {Number} upper bound.
 * @param {Number} quantity of elements in random sample.
 * @return {Array} random sample.
 */
random.sample = function (lower, upper, n) {
  var sample = [];
  sample.length = n;

  for (var i=0; i<n; i++) {
    sample[i] = lower + (upper - lower) * Math.random();
  }
  return sample;
};

/**
 * A pseudo-random number sampling method for generating pairs of independent,
 * standard, normally distributed (zero expectation, unit variance) random
 * numbers, given a source of uniformly distributed random numbers.
 * http://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
 *
 * @param {Number} mu or mean
 * @param {Number} sigma or standard deviation
 * @return {Number} a value that is part of a normal distribution.
 */
random.boxMullerTransform = function(mu, sigma) {
  if (arguments.length <= 1) sigma = 1;
  if (arguments.length === 0) mu = 0;
  var u = 0,
      v = 0,
      s;

  do {
    u = Math.random() * 2 - 1;
    v = Math.random() * 2 - 1;
    s = u * u + v * v;
  } while (s === 0 || s > 1)

  var c = Math.sqrt(-2 * Math.log(s)/s),
      x = u * c,
      y = v * c,
      x = mu + x * sigma,
      y = mu + y * sigma;
  return [x, y];
};

/**
 * A Random number that is along an irwin hall distribution.
 * http://en.wikipedia.org/wiki/Irwin-Hall_distribution
 *
 * @param {Number} max possible sum
 * @param {Number} number to subtract
 * @return {Number} random number along an irwin hall distribution.
 */
random.irwinHall = function(n, sub) {
  if (arguments.length === 1) sub = 0;
  var sum = 0;
  for (var i = 0; i < n; i++) sum += Math.random();
  return sum - sub;
};

/**
 * Returns a random value along a bates distribution from [a, b] or [0, 1].
 * http://en.wikipedia.org/wiki/Bates_distribution
 *
 * @param {Number} number of times summing
 * @param {Number} random maximum value (default is 1)
 * @param {Number} random minimum value (default is 0)
 * @return {Number} random number along an bates distribution.
 */
random.bates = function(n, b, a) {
  if (arguments.length <= 2) a = 0;
  if (arguments.length === 1) b = 1;
  var sum = 0;
  for (var i = 0; i < n; i++) sum += (b - a)*Math.random() + a;
  return sum/n;
};

random.distribution = {};

/**
 * Returns an array of size n that is an approximate normal distribution
 *
 * @param {Number} n size of returned array
 * @param {Number} mu or mean
 * @param {Number} sigma or standard deviation
 * @return {Array} array of size n of a normal distribution
 */
random.distribution.normal = function(n, mu, sigma) {
  if (arguments.length <= 2) sigma = 1;
  if (arguments.length === 1) mu = 0;

  return random.distribution.boxMuller(n, mu, sigma);
};

/**
 * Returns an array of size n that is an approximate log normal distribution
 *
 * @param {Number} n size of returned array
 * @param {Number} mu or mean
 * @param {Number} sigma or standard deviation
 * @return {Array} array of size n of a log normal distribution
 */
random.distribution.logNormal = function(n, mu, sigma) {
  if (arguments.length <= 2) sigma = 1;
  if (arguments.length === 1) mu = 0;

  var exponential = function(x) {
    return Math.exp(x);
  };

  return random.distribution.boxMuller(n, mu, sigma).map(exponential);
};

/**
 * Returns an array of size n that is a normal distribution
 * leveraging the Box Muller Transform
 * http://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
 *
 * @param {Number} n size of returned array
 * @param {Number} mu or mean
 * @param {Number} sigma or standard deviation
 * @param {Number} determine if the distribution will be polar coordinates.
 * @return {Array} array of size n of a normal distribution
 */
random.distribution.boxMuller = function(n, mu, sigma, rc) {
  if (arguments.length <= 3) rc = false;
  if (arguments.length <= 2) sigma = 1;
  if (arguments.length === 1) mu = 0;
  var results = [];

  for (var i = 0; i < n; i++) {
    var randomBMT = random.boxMullerTransform(mu, sigma);
    results.push((rc) ? randomBMT : randomBMT[0]);
  }

  return results;
};

/**
 * Returns an array of n that is an irwin hall distribution.
 * http://en.wikipedia.org/wiki/Irwin-Hall_distribution
 *
 * @param {Number} length of array
 * @param {Number} irwinHall max sum value (default is n)
 * @param {Number} irwinHall subtraction value (default is 0)
 * @return {Array} irwin hall distribution from [a, b]
 */
random.distribution.irwinHall = function(n, m, sub) {
  if (arguments.length <= 2) sub = 0;
  if (arguments.length === 1) m = n;
  var results = new Array(n);
  for (var i = 0; i < n; i++) {
    results[i] = random.irwinHall(m, sub);
  }

  return results;
};

/**
 * An approach to create a normal distribution,
 * that relies on the central limit theorem,
 * resulting in an approximately standard normal distribution
 * with bounds of (-6, 6)
 *
 * @param {Number} length of array
 * @return {Array} an array of an approximate normal distribution from [-6, 6] of length n.
 */
random.distribution.irwinHallNormal = function(n) {
  return random.distribution.irwinHall(n, 12, 6);
};

/**
 * Returns an array of n that is a bates distribution from
 * http://en.wikipedia.org/wiki/Bates_distribution
 *
 * @param {Number} length of array
 * @param {Number} max bates value (default is n)
 * @param {Number} minimum bound a (default is 0)
 * @return {Array} bates distribution from [a, b]
 */
random.distribution.bates = function(n, b, a) {
  if (arguments.length <= 2) a = 0;
  if (arguments.length === 1) b = n;

  var results = new Array(n);

  for (var i = 0; i < n; i++) {
    results[i] = random.bates(n, b, a);
  }

  return results;
};
