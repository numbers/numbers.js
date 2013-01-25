var basic = require('./core');
var statistic = exports;

/**
 * Calculate the median value of a set of numbers in array.
 *
 * @param {Array} set of values
 * @return {Number} median value
 */
statistic.median = function (arr) {
  return statistic.quantile(arr, 1, 2);
};


/**
 * Calculate the mode value of a set of numbers in array.
 *
 * @param {Array} set of values
 * @return {Number} mode value
 */
statistic.mode = function (arr) {
  var counts = {};
  for (var i = 0, n = arr.length ; i < n ; i++) {
    if (counts[arr[i]] === undefined)
      counts[arr[i]] = 0;
    else
      counts[arr[i]]++;
  }
  var highest;
  for (var number in counts) {
    if (counts.hasOwnProperty(number)) {
      if (highest === undefined || counts[number] > counts[highest])
        highest = number;
    }
  }
  return Number(highest);
};


/**
 * Calculate the kth q-quantile of a set of numbers in an array.
 * As per http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population
 * Ex: Median is 1st 2-quantile
 * Ex: Upper quartile is 3rd 4-quantile
 *
 * @param {Array} set of values
 * @param {Number} index of quantile
 * @param {Number} number of quantiles
 * @return {Number} kth q-quantile of values
 */
statistic.quantile = function (arr, k, q) {
  var sorted, count, index;

  if(k === 0) return Math.min.apply(null, arr);

  if (k === q) return Math.max.apply(null, arr);

  sorted = arr.slice(0);
  sorted.sort(function (a, b) { return a - b; });
  count = sorted.length;
  index = count * k / q;

  if (index % 1 === 0) return 0.5 * sorted[index - 1] + 0.5 * sorted[index];

  return sorted[Math.floor(index)];
};


/**
 * Return a random sample of values over a set of bounds with
 * a specified quantity.
 *
 * @param {Number} lower bound
 * @param {Number} upper bound
 * @param {Number} quantity of elements in random sample
 * @return {Array} random sample
 */
statistic.randomSample = function (lower, upper, n) {
  var sample = [], temp;

  while (sample.length < n) {
    temp = Math.random() * upper;
    if (lower <= temp <= upper) {
      sample.push(temp);
    }
  }

  return sample;
};