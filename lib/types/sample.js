/**
 * numbers.js
 *
 * top level management of numbers extensions
 *
 * (C) 2013 Steve Kaliski
 * MIT License
 *
 */

var util = require('../numbers/util');
var core = require('../numbers/core');

// Define the Sample "class."
util.parasiticClassDefine(
  Sample,

  // The methods to expose.
  [sum, mean, standardDev, covariance, correlation,
   linearRegression, //exponentialRegression, rSquared,
   toPlainArray, clone],

  //no prop names
  []  
);


/**
 * Constructs a Sample, i.e. a collection of measurements or data points.
 *
 * Samples can hold numbers or anything that can be converted to a number.
 *
 * @param {Number|Array} data (optional) values to add to Sample off the bat.
 * @param {Boolean} useCache See docs.
 * @returns {Sample} The Sample instance.
 */
function Sample (data, useCache) {
  // Sample is an array that "inherits" from Sample's "class definition."
  var sample = util.parasiticInherit([], Sample);
  
  // Set up cache.
  util.createCache(sample, useCache);

  // Construct.
  sample.push.apply(sample, data);
  
  return sample;
}


/******* "STATIC" METHODS *******/

/**
 * Determines whether the object provided is a Sample
 */
Sample.isSample = function (obj) {
  return util.parasiticIs(obj, Sample);
}

/**
 * Tries to convert the provided argument to a Sample. 
 * 
 * @param {Mixed} The object to convert.
 * @return {Boolean|Sample} False if conversion failed; the Set if it succeeded.
 */
Sample.toSample = function(arg) {
  return Sample.isSample(arg) ? arg : (util.isArray(arg) ? Sample(arg) : false);
}


/******* PUBLIC METHODS *******/

function sum() {
  if (this._useCache) {
    return this._cacheHas('sum') ? this._cache['sum'] : this._cacheSet('sum', core.sum(this));
  }

  return core.sum(this);
}

/**
 * Calculate the mean value of the Sample.
 *
 * @return {Number} mean value.
 * @applies-to Statistics.
 */
function mean () {
  if (this._useCache) { 
    return this._cacheHas('mean') ? this._cache['mean'] : this._cacheSet('mean', this.sum() / this.length);
  }

  return this.sum() / this.length;
}

/**
 * Calculate the standard deviation of the Sample.
 *
 * @return {Number} standard deviation.
 */
function standardDev () {
  var size, mean, squaredArr, res;

  if(this._useCache && this._cacheHas('stdDev')) {
    return this._cache['stdDev'];
  }

  size = this.length;
  mean = this.mean(); 
  squaredArr = [];

  for (var i = 0; i < size; i++) {
    squaredArr[i] = Math.pow((this[i] - mean), 2);
  }

  res = Math.sqrt((1 / size) * core.sum(squaredArr));

  return this._useCache ? this._cacheSet('stdDev', res) : res;
};

/**
 * Evaluate the covariance between this Sample and another.
 *
 * @param {Sample} Values to use for covariance check.
 * @return {Number} covariance.
 */
function covariance (sample) {
  if ((sample = Sample.toSample(sample)) !== false && this.length == sample.length) {
    var n = this.length;
    var total = 0;
    var sum1 = this.sum();
    var sum2 = sample.sum();
    
    for (var i=0; i < n; i++) {
      total += this[i] * sample[i];
    }

    return (total - sum1 * sum2 / n) / n;
  }
  else {
    throw new Error('Argument provided is not a Sample or isn\'t the same size as this Sample.');
  }
}

/**
 * Evaluate the correlation amongst a set of values.
 *
 * @param {Sample} The Sample to correlate with this one.
 * @return {Number} correlation.
 */
function correlation (sample) {
  if((sample = Sample.toSample(sample)) !== false && this.length == sample.length) {
    var covarXY = this.covariance(sample);
    var stdDevX = this.standardDev();
    var stdDevY = sample.standardDev();

    return covarXY / (stdDevX * stdDevY);
  }
  else {
    throw new Error('Argument provided is not a Sample or isn\'t the same size as this Sample.');
  }
};

/**
 * Create a function to calculate the linear regression of a dataset.
 *
 * @param {Array} X array
 * @param {Array} Y array
 * @return {Function} A function which given X or array of X values will return Y
 */
function linearRegression (sample) {
  if ((sample = Sample.toSample(sample)) === false) {
    throw new Error("Argument provided is not a valid Sample and couldn't be converted to one.");
  }

  var n           = sample.length,
      xClone      = this.clone(),
      xSum        = this.sum(),
      ySum        = sample.sum(),
      xySum       = core.sum(xClone.map(function(d, i) { return d * sample[i]; })),
      xSquaredSum = core.sum(xClone.map(core.square)),
      xMean       = this.mean(),
      yMean       = sample.mean(),
      
      b = (xySum - 1 / n * xSum * ySum) / (xSquaredSum - 1 / n * (xSum * xSum)),
      a = yMean - b * xMean;

  return function(x) {
    if (typeof x === 'number') {
      return a + b * x;
    } else if(typeof x.map === "function") {
      // If not a number, assume array
      return x.map(function(d){
        return a + b * d;
      });
    }
    else {
      throw new Error("x must be a number or an object with a 'map' function (Not supported in IE < 9.");
    }
  };
}
/**
 * @TODO Fix exponentialRegression and rSquared below to work with Sample and to have a consistent
 * interface with linearRegression (right now their APIs are very different).
 */

/**
 * Create a function to calculate the exponential regression of a dataset.
 *
 * @param {Array} set of values
 * @return {Function} function to accept X values and return corresponding regression Y values

function exponentialRegression(arrY) {
  var n = arrY.length;
  var arrX = basic.range(1,n);

  var xSum = basic.sum(arrX);
  var ySum = basic.sum(arrY);
  var yMean = statistic.mean(arrY);
  var yLog = arrY.map(function(d) { return Math.log(d); });
  var xSquared = arrX.map(function(d) { return d * d; });
  var xSquaredSum = basic.sum(xSquared);
  var yLogSum = basic.sum(yLog);
  var xyLog = arrX.map(function(d, i) { return d* yLog[i]; });
  var xyLogSum = basic.sum(xyLog);

  var a = (yLogSum * xSquaredSum - xSum * xyLogSum) / (n * xSquaredSum - (xSum * xSum));
  var b = (n * xyLogSum - xSum * yLogSum) / (n * xSquaredSum - (xSum * xSum));

  var fn = function(x) {
    if (typeof x === 'number') {
      return Math.exp(a) * Math.exp(b * x);
    } else {
      // If not number, assume array
      return x.map(function (d) {
        return Math.exp(a) * Math.exp(b * d);
      });
    }
  };

  fn.rSquared = statistic.rSquared(arrY, arrX.map(fn));

  return fn;
}

/**
 * Calculate the Coefficient of Determination of a dataset and regression line.
 *
 * @param {Array} Source data
 * @param {Array} Regression data
 * @return {Number} A number between 0 and 1.0 that represents how well the regression line fits the data.
 
function rSquared(source,regression) {
  var residualSumOfSquares = basic.sum(source.map(function(d,i) {
    return basic.square(d - regression[i]);
  }));

  var totalSumOfSquares = basic.sum(source.map(function(d) {
    return basic.square(d - statistic.mean(source));
  }));
  
  return 1 - (residualSumOfSquares / totalSumOfSquares);
}
*/

function toPlainArray() {
  util.removeCache(this);
  return util.parasiticRemove(this, Sample);
}

/**
 * Create a copy of the Set.
 *
 * @return {Sample} an exact copy of this Sample.
 */
function clone() {
  return util.deepClone(this);
};

exports.Sample = Sample;
