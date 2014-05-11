var assert = require('assert');
var numbers = require('../index.js');
var statistic = numbers.statistic;
var basic = numbers.basic;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Statistics Mathematics\033[0m');

  test('mean should return average value amongst integers in an array', function(done) {
    var res = statistic.mean([0, 1, 2]);
    assert.equal(1, res);
    done();
  });

  test('median should return middle value in array for a sorted array with an odd number of values', function(done) {
    var res1 = statistic.median([0, 2, 15]);
    assert.equal(2, res1);
    done();
  });

  test('median should return middle value in array for an unsorted array with an odd number of values', function(done) {
    var res1 = statistic.median([1, 0, 2]);
    assert.equal(1, res1);
    done();
  });

  test('median should return average of two middle values in array for a sorted array with an even number of values', function(done) {
    var res2 = statistic.median([0, 1, 2, 3]);
    assert.equal(1.5, res2);
    done();
  });

  test('median should return average of two middle values in array for an unsorted array with an even number of values', function(done) {
    var res2 = statistic.median([1, 3, 2, 0]);
    assert.equal(1.5, res2);
    done();
  });

  test('mode should return most common value in array', function(done) {
    var res = statistic.mode([0, 1, 1, 1, 2, 4, 6]);
    assert.equal(1, res);
    done();
  });

  test('quantile should return lowest value in array for 0th q-quantile of an unsorted array', function(done) {
    var arr = [5, 2, 4];
    var res = statistic.quantile(arr, 0, 1);
    assert.equal(2, res);
    done();
  });

  test('quantile should return highest value in array for qth q-quantile of an unsorted array', function(done) {
    var arr = [5, 2, 4];
    var res = statistic.quantile(arr, 6, 6);
    assert.equal(5, res);
    done();
  });

  test('quantile should return average of two values in array for an unsorted array\'s length is a multiple of (k / q)', function(done) {
    var res = statistic.quantile([9, 1, 1, 9], 2, 4);
    assert.equal(5, res);
    done();
  });

  test('quantile should return value at 0-based index floor(k/q) in array for an unsorted array\'s length is not a multiple of (k/q)', function(done) {
    var res = statistic.quantile([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], 1, 4);
    assert.equal(7, res);
    done();
  });

  test('should return the standard deviation of an array of numbers', function(done) {
    var res = statistic.standardDev([-5, -4, -1, 0, 5, 100]);
    assert.equal(true, res - numbers.EPSILON < 37.777 < res + numbers.EPSILON);
    done();
  });

  test('should return correlation between two arrays', function(done) {
    var arr1 = [-5, -4, -1, 0, 5, 100];
    var arr2 = [-6, 5, 2, 5, 2, 6];

    var res = statistic.correlation(arr1, arr2);

    assert.equal(0.43413125731182334, res);
    done();
  });

  test('should return a function to calculate the linear regression of a set of points', function (done) {
    var arrX = [1,2,3,4,5,7,8,9];
    var arrY = [1,2,3,4,5,7,7,9];

    var regression_function = statistic.linearRegression(arrX,arrY);

    assert.equal(19.07218683651805, regression_function(20));
    done();
  });

  test('should return a function to calculate the exponential regression of an array of numbers', function (done) {
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

  test('should return an appropriate Coefficient of Determination for a given dataset and regression', function (done) {
    var input = [10,9,8,8,7,7,6,6.5,6.4,6.3,6.2];
    var output = [
      9.077131929916444, 8.66937771538526, 8.279940244595563, 7.907996710352883,
      7.552761266818376, 7.213483369166244, 6.8894461878255076, 6.579965093955639,
      6.284386212956255, 6.002085042954625, 5.732465135352174
    ];

    assert.equal(0.8491729985314136, statistic.rSquared(input, output));
    done();
  });

  test('should return covariance between two arrays', function(done) {
    var arr1 = [-5, -4, -1, 0, 5, 100];
    var arr2 = [-6, 5, 2, 5, 2, 6];

    var res = statistic.covariance(arr1, arr2);

    assert.equal(66.05555555555556, res);
    done();
  });

});
