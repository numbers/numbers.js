var assert = require('assert');
var numbers = require('../index.js');
var statistic = numbers.statistic;
var basic = numbers.basic;
var random = numbers.random;
var testing = require('./testing.js');
var seedrandom = require("seedrandom");

suite('numbers', function() {
  console.log('\n\n\033[34mTesting Random Mathematics\033[0m');

  // seed random number generator for predictablity.
  random.setGenerator( seedrandom("this SEED value should be random enough...") );  

  // random.sample
  test('random.sample should return an array of random numbers in a certain bound', function(done) {
    var res = random.sample(5, 100, 5);

    res.forEach(function(val) {
      testing.between(val, 5, 100);
    });
    assert.equal(res.length, 5);
    done();
  });

  // random.boxMullerTransform
  test('random.boxMullerTransform should return an array of two numbers that are random within a normal distribution', function(done) {
    var test1, mu, sigma;
    test1 = random.boxMullerTransform();
    assert.ok(typeof test1[0] === 'number' && typeof test1[1] === 'number' && test1.length === 2);
    test1 = random.boxMullerTransform(2);
    assert.ok(typeof test1[0] === 'number' && typeof test1[1] === 'number' && test1.length === 2);
    test1 = random.boxMullerTransform(2, 3);
    assert.ok(typeof test1[0] === 'number' && typeof test1[1] === 'number' && test1.length === 2);
    done();
  });

  // random.irwinHall
  test('random.irwinHall should return a number from [0, a] with a normal distribution for probability', function(done) {
    var test1, mu, sigma;
    test1 = random.irwinHall(10);
    testing.between(test1, 0, 10);
    test1 = random.irwinHall(20, 10);
    testing.between(test1, -10, 10);
    done();
  });

  // random.bates
  test('random.bates should return a number from [0,1] within a bates distribution', function(done) {
    var test1, mu, sigma;
    test1 = random.bates(10);
    testing.between(test1, 0, 1);
    test1 = random.bates(20, 20, 10);
    testing.between(test1, 10, 20);
    done();
  });

  // random.distribution.normal
  test('random.distribution.normal should return a normal distribution of length n', function(done) {
    var t = numbers.EPSILON,
        test1, mu, sigma;
    numbers.EPSILON = 0.01;
    //lower error considering the issue with Math.random()
    test1 = random.distribution.normal(100000);
    mu = statistic.mean(test1);
    sigma = statistic.standardDev(test1);
    testing.approxEquals(mu, 0);
    testing.approxEquals(sigma, 1);

    test1 = random.distribution.normal(100000, 20);
    mu = statistic.mean(test1);
    sigma = statistic.standardDev(test1);
    testing.approxEquals(mu, 20);
    testing.approxEquals(sigma, 1);
    for (var i = 0; i <= 4; i+=2) {
      for (var j = 0; j <= 1; j+=0.5) {
        var n = Math.floor(Math.random()*100)+100000;
        test1 = random.distribution.normal(n, i, j);
        mu = statistic.mean(test1);
        sigma = statistic.standardDev(test1);
        assert.equal(test1.length, n);
        testing.approxEquals(mu, i);
        testing.approxEquals(sigma, j);
      }
    }
    numbers.EPSILON = t;
    done();
  });

  // random.distribution.logNormal
  test('random.distribution.logNormal should return a log normal distribution of length n', function(done) {
    var t = numbers.EPSILON,
        test1, mu, sigma;
    numbers.EPSILON = 0.1;
    test1 = random.distribution.logNormal(100000);
    mu = statistic.mean(test1);
    sigma = statistic.standardDev(test1);
    var expectedMu = Math.exp((0 + Math.pow(1, 2))/2),
        expectedSigma = Math.sqrt((Math.exp(Math.pow(1, 2)) - 1) * Math.exp(2 * 0 + Math.pow(1, 2)));
    testing.approxEquals(mu, expectedMu);
    testing.approxEquals(sigma, expectedSigma);
    numbers.EPSILON = t;
    done();
  });

  // random.distribution.boxMuller
  test('random.distribution.boxMuller should return a n-sample of a normal distribution', function(done) {
    var t = numbers.EPSILON,
        test1, mu, sigma;
    numbers.EPSILON = 0.1;
    //lower error considering the issue with Math.random()
    test1 = random.distribution.boxMuller(100000);
    mu = statistic.mean(test1);
    sigma = statistic.standardDev(test1);
    testing.approxEquals(mu, 0);
    testing.approxEquals(sigma, 1);

    test1 = random.distribution.boxMuller(100000, 20);
    mu = statistic.mean(test1);
    sigma = statistic.standardDev(test1);
    testing.approxEquals(mu, 20);
    testing.approxEquals(sigma, 1);
    for (var i = 0; i <= 4; i+=2) {
      for (var j = 0; j <= 1; j+=0.5) {
        var n = Math.floor(Math.random()*100)+100000;
        test1 = random.distribution.boxMuller(n, i, j);
        mu = statistic.mean(test1);
        sigma = statistic.standardDev(test1);
        assert.equal(test1.length, n);
        testing.approxEquals(mu, i);
        testing.approxEquals(sigma, j);
      }
    }
    numbers.EPSILON = t;
    done();
  });

  // random.distribution.irwinHall
  test('random.distribution.irwinHall should return a normal distribution of length n within bounds of (m/2 - sub, m/2)', function(done) {
    var test1;
    test1 = random.distribution.irwinHall(100);
    testing.approxEquals(statistic.mean(test1), 100 / 2, 2);
    testing.approxEquals(statistic.standardDev(test1), Math.sqrt(100 / 12), 5);

    test1 = random.distribution.irwinHall(100, 500);
    testing.approxEquals(statistic.mean(test1), 500 / 2, 10);
    testing.approxEquals(statistic.standardDev(test1), Math.sqrt(500 / 12), 5);

    test1 = random.distribution.irwinHall(100, 500, 4);
    testing.approxEquals(statistic.mean(test1), (500 - 4) / 2, 10);
    testing.approxEquals(statistic.standardDev(test1), Math.sqrt((500 - 4) / 12), 5);

    done();
  });

  // random.distribution.irwinHallNormal
  test('random.distribution.irwinHallNormal should return a n-sample of a normal distribution with a bound of (-6, 6)', function(done) {
    var test1;
    test1 = random.distribution.irwinHallNormal(50);
    testing.approxEquals(statistic.mean(test1), 0, 0.5);
    testing.approxEquals(statistic.standardDev(test1), 1, 0.3);
    done();
  });

  // random.distribution.bates
  test('random.distribution.bates should return a n-sample of a bates distribution', function(done) {
    var test1;
    test1 = random.distribution.bates(100, 2);
    testing.approxEquals(statistic.mean(test1), 1, 0.5);
    testing.approxEquals(statistic.standardDev(test1), Math.sqrt((Math.pow(2 - 0, 2) / (12 * 100))), 0.5);

    test1 = random.distribution.bates(100, 20, 10);
    testing.approxEquals(statistic.mean(test1), 15, 0.5);
    testing.approxEquals(statistic.standardDev(test1), Math.sqrt((Math.pow(20 - 10, 2) / (12 * 100))), 0.5);

    done();
  });

});
