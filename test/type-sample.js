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
});
