var numbers = require('../index');

// Let's consider some really basic examples.

// Adding up elements in an array. But wait! First we need an array...
// Let's get a random sample of 50 values, in the range 0, 100.
var random = numbers.statistic.randomSample(0, 100, 50);

// Add them up...
var sum = numbers.basic.sum(random);

// We can do some other cool stuff as well. Like find the GCD between
// two integers.
var gcd = numbers.basic.gcd(100, 10);