var basic = require('./basic');
var statistic = exports;

/**
 * Calculate the mean value of a set of numbers in array.
 *
 * @param {Array} set of values
 * @return {Number} mean value
 */
statistic.mean = function (arr) {
  var count = arr.length;
  var sum = basic.addition(arr);
  return sum / count;
};


/**
 * Calculate the median value of a set of numbers in array.
 *
 * @param {Array} set of values
 * @return {Number} median value
 */
statistic.median = function (arr) {
  var sorted = arr.slice(0);
  sorted.sort();
  var count = sorted.length;
  var middle;
  if (count % 2 === 0) {
    return (sorted[count/2] + sorted[(count/2 - 1)])/2;
  } else {
    return sorted[Math.floor(count / 2)];
  }
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
 * Return a random sample of values over a set of bounds with
 * a specified quantity.
 *
 * @param {Number} lower bound
 * @param {Number} upper bound
 * @param {Number} quantity of elements in random sample
 * @return {Array} random sample
 */
statistic.randomSample = function (lower, upper, n) {
  var sample = [];
  var temp = 0;

  for (var i = 0 ; i < n ; i++) {
    temp = Math.random() * upper;
    if (temp > lower)
      sample[i] = temp;
  }

  return sample;
};


/**
 * Evaluate the standard deviation for a set of values.
 *
 * @param {Array} set of values
 * @return {Number} standard deviation
 */
statistic.standardDev = function (arr) {
  var count = arr.length;
  var mean = statistic.mean(arr);
  var squaredArr = [];

  for (var i = 0; i < arr.length; i++) {
    squaredArr[i] = Math.pow((arr[i] - mean),2);
  }

  return Math.sqrt((1 / count) * basic.addition(squaredArr));
};


/**
 * Evaluate the correlation amongst a set of values.
 *
 * @param {Array} set of values
 * @return {Number} correlation
 */
statistic.correlation = function (arrX, arrY) {
  if (arrX.length == arrY.length) {
    var numerator = 0;
    var denominator = (arrX.length) * (statistic.standardDev(arrX)) * (statistic.standardDev(arrY));
    var xMean = statistic.mean(arrX);
    var yMean = statistic.mean(arrY);

    for (var i = 0 ; i < arrX.length ; i++) {
      numerator += (arrX[i] - xMean) * (arrY[i] - yMean);
    }

    return numerator / denominator;
  } else {
    throw new Error('Array mismatch');
  }
};

/**
 * Create a function to calculate the exponential regression of a dataset.
 *
 * @param {Array} set of values
 * @return {Function} function to accept X values and return corresponding regression Y values
 */
statistic.exponentialRegression = function (arrY) {
  var n = arrY.length;
  var arrX = basic.range(1,n);

  var xSum = basic.addition(arrX);
  var ySum = basic.addition(arrY);
  var yMean = statistic.mean(arrY);
  var yLog = arrY.map(function(d){ return Math.log(d); });
  var xSquared = arrX.map(function(d){ return d*d; });
  var xSquaredSum = basic.addition(xSquared);
  var yLogSum = basic.addition(yLog);
  var xyLog = arrX.map(function(d, i){ return d*yLog[i]; });
  var xyLogSum = basic.addition(xyLog);

  var a = (yLogSum * xSquaredSum - xSum * xyLogSum) /
          (n * xSquaredSum - (xSum * xSum));

  var b = (n * xyLogSum - xSum * yLogSum) /
          (n * xSquaredSum - (xSum * xSum));

  return function(x) {
    if (typeof x == 'number') {
      return Math.exp(a) * Math.exp(b * x);
    } else {
      // If not number, assume array
      return x.map(function (d) {
        return Math.exp(a) * Math.exp(b * d);
      });
    }
  }
}
