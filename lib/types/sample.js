var util = require('../numbers/util');
var core = require('../numbers/core');

function Sample(data, useCache) {
  var sample = util.parasiticExtend(
        //base object is an array
        [],
              
        //the methods to expose
        [sum, mean, standardDev, correlation, toPlainArray],
        
        //no prop names
        [],

        //reset the constructor function
        Sample);
  
  //set up cache
  util.createCache(sample, useCache);

  //construct
  sample.push.apply(sample, data);
  
  return sample;
}


/******* "STATIC" METHODS *******/

/**
 * Determines whether the object provided is a Sample
 */
Sample.isSample = function(obj) {
  return numbers.util.parasiticIs(obj, Sample);
}

/**
 * Tries to convert the provided argument to a Sample. 
 * 
 * @param {Mixed} The object to convert.
 * @return {Boolean|Sample} False if conversion failed; the Set if it succeeded.
 */
Sample.toSample = function(arg) {
  return Sample.isSample(arg) ? arg : (numbers.util.isArray(arg) ? Sample(arg) : false);
}


/******* PUBLIC METHODS *******/

function sum() {
  if(this._useCache) {
    return this._cacheHas('sum') ? this._cache['sum'] : this._cacheSet('sum', core.sum(arg));
  }

  return core.sum(arg);
}

/**
 * Calculate the mean value of the Sample.
 *
 * @return {Number} mean value
 * @applies-to Statistics
 */
function mean() {
  if(this._useCache) { 
    return this._cacheHas('mean') ? this._cache['mean'] : this._cacheSet('mean', this.sum()/this.length);
  }

  return this.sum()/this.length;
}

/**
 * Calculate the standard deviation of the Sample.
 *
 * @return {Number} standard deviation
 */
function standardDev() {
  var size, mean, squaredArr, res;

  if(this._useCache && this._cacheHas('stdDev')) {
      return this._cache['stdDev'];
  }

  size = this.length;
  mean = this.mean(); 
  squaredArr = [];

  for (var i = 0; i < size; i++) {
    squaredArr[i] = Math.pow((this[i] - mean),2);
  }

  res = Math.sqrt((1 / size) * core.sum(squaredArr));

  return this._useCache ? this._cacheSet('stdDev', res) : res;
};

/**
 * Evaluate the covariance between this Sample and another.
 *
 * @param {Sample} Values to use for covariance check.
 * @return {Number} covariance
 */
 statistic.covariance = function (sample) {
  if((sample = Sample.toSample(sample)) !== false && this.length == sample.length) {
    var n = this.length;
    var total = 0;
    var sum1 = this.sum();
    var sum2 = sample.sum();
    for(var i=0; i<n; i++) {
      total += set1[i]*set2[i];
    }
    return (total - sum1*sum2/n)/n;
  }
  else {
    throw new Error('Argument provided is not a Sample or isn\'t the same size as this Sample.');
  }
}

/**
 * Evaluate the correlation amongst a set of values.
 *
 * @param {Sample} The Sample to correlate with this one.
 * @return {Number} correlation
 */
function correlation(sample) {
  if((sample = Sample.toSample(sample)) !== false && this.length == sample.length) {
    var covarXY = this.covariance(sample);
    var stdDevX = this.standardDev();
    var stdDevY = sample.standardDev();

    return covarXY/(stdDevX*stdDevY);
  }
  else {
    throw new Error('Argument provided is not a Sample or isn\'t the same size as this Sample.');
  }
};

function toPlainArray() {
  util.removeCache(this);
  return util.parasiticRemove(this, Sample);
}

exports.Sample = Sample;