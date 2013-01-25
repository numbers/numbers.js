var assert = require('assert');
var numbers = require('../index.js');

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Sample Type\033[0m');

  test('Factory method should exist for this type', function(done) {

    assert.equal(typeof numbers.createSample, "function");

    done();
  });
  
  test('Sample should extend array ', function(done) {

    assert.equal(numbers.util.isArray(numbers.createSample()), true);

    done();
  });

  test('Sample should use caching when directed', function(done) {

    var sample = numbers.createSample([], true);

    //@todo this is an awful way to test it
    var cached_orig = sample._cache['mean'];
    sample.mean();
    var cached_now = sample._cache['mean'];
    
    assert.notEqual(cached_now, cached_orig);
    done();
  });

  test('mean should return average value amongst integers in a sample', function(done) {
    assert.equal(1, numbers.createSample([0,1,2]).mean());
    done();
  });
  
  test('should return the standard deviation of a sample of numbers', function(done) {
    var res = numbers.createSample([-5, -4, -1, 0, 5, 100]).standardDev();
    assert.equal(true, numbers.nearlyEquals(37.777, res));
    done();
  });
  
  test('should return covariance between two samples', function(done) {
    var arr1 = [-5, -4, -1, 0, 5, 100];
    var arr2 = [-6, 5, 2, 5, 2, 6];

    var res = numbers.createSample(arr1).covariance(arr2);

    assert.equal(numbers.nearlyEquals(66.05555555555556, res), true);
    done();
  });

  test('should return correlation between two samples', function(done) {
    var arr1 = [-5, -4, -1, 0, 5, 100];
    var arr2 = [-6, 5, 2, 5, 2, 6];

    var res = numbers.createSample(arr1).correlation(arr2);

    assert.equal(true, numbers.nearlyEquals(0.43413125731182334, res));
    done();
  });
  
  test('should return a function to calculate the linear regression of a set of points', function (done) {
    var arrX = [1,2,3,4,5,7,8,9];
    var arrY = [1,2,3,4,5,7,7,9];

    var regression_function = numbers.createSample(arrX).linearRegression(arrY);

    assert.equal(true, numbers.nearlyEquals(19.0721868365, regression_function(20)));
    done();
  });
  
  test.skip('should return a function to calculate the exponential regression of an array of numbers', function (done) {
    var input = [10,9,8,8,7,7,6,6.5,6.4,6.3,6.2];
    var output = [
      9.077131929916444, 8.66937771538526, 8.279940244595563, 7.907996710352883,
      7.552761266818376, 7.213483369166244, 6.8894461878255076, 6.579965093955639,
      6.284386212956255, 6.002085042954625, 5.732465135352174
    ];

    var regression_function = statistic.exponentialRegression(input);

    assert.equal(0.8491729985314136, regression_function.rSquared);

    assert.deepEqual(output, regression_function(basic.range(1, input.length)));
    assert.equal(9.077131929916444, regression_function(1));
    assert.equal(4.769782016165231, regression_function(15));
    done();
  });

  test.skip('should return an appropriate Coefficient of Determination for a given dataset and regression', function (done) {
    var input = [10,9,8,8,7,7,6,6.5,6.4,6.3,6.2];
    var output = [
      9.077131929916444, 8.66937771538526, 8.279940244595563, 7.907996710352883,
      7.552761266818376, 7.213483369166244, 6.8894461878255076, 6.579965093955639,
      6.284386212956255, 6.002085042954625, 5.732465135352174
    ];

    assert.equal(0.8491729985314136, statistic.rSquared(input, output));
    done();
  });
});
