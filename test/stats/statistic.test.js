var assert = require('assert');
var numbers = require('../index.js');
var statistic = numbers.stats;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Statistics Mathematics\033[0m');

  test('mean should return average value amongst integers in an array', function(done) {
    var res = statistic.mean([0, 1, 2]);
    assert.equal(1, res);    
    done();
  });

  test('median should return middle value in array for a sorted array with an even number of values', function(done) {
    var res1 = statistic.median([0, 1, 2]);
    assert.equal(1, res1);
    done();
  });

  test('median should return middle value in array for an unsorted array with an even number of values', function(done) {
    var res1 = statistic.median([1, 0, 2]);
    assert.equal(1, res1);
    done();
  });

  test('median should return average of two middle values in array for a sorted array with an odd number of values', function(done) {
    var res2 = statistic.median([0, 1, 2, 3]);
    assert.equal(1.5, res2);
    done();
  });

  test('median should return average of two middle values in array for an unsorted array with an odd number of values', function(done) {
    var res2 = statistic.median([1, 3, 2, 0]);
    assert.equal(1.5, res2);
    done();
  });

  test('mode should return most common value in array', function(done) {
    var res = statistic.mode([0, 1, 1, 1, 2, 4, 6]);
    assert.equal(1, res);
    done();
  });

  test('randomSample should return an array of random numbers in a certain bound', function(done) {
    var res = statistic.randomSample(5, 100, 5);

    res.forEach(function(val) {
      assert.equal(true, 5 <= val <= 100);
    });

    assert.equal(5, res.length);
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

    assert.equal(0.43413125731182345, res);
    done();
  });

});
