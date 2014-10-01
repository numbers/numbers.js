var assert = require('assert');
var numbers = require('../index.js');
var basic = numbers.basic;

suite('numbers', function() {

    console.log('\n\n\033[34mTesting Standard Mathematics\033[0m');

    // longList is used by basic.max() and basic.min()
    // to test for `Maximum call stack size exceeded` exception.
    var longList = [],
        len = 1e7,
        sign;
    while (0 < len--) {
        sign = (Math.random() < 0.5) ? -1 : 1;
        longList.push(sign * Math.floor(Math.random() * 1e5));
    }
    longList.push(1e6);
    longList.push(-1e6);

    // basic.sum
    test('sum should return the sum of items in an array', function(done) {
        assert.equal(basic.sum([0, 1, 2, 3]), 6);
        assert.equal(basic.sum([0, -3, 5, -2]), 0);
        done();
    });

    test('sum should throw an exception when given anything but an array', function(done) {
        assert.throws(
            function() {
                basic.sum(1);
            },
            /Input must be of type Array/
        );
        done();
    });

    test('sum should throw an exception when given anything objects other than numbers', function(done) {
        assert.throws(
            function() {
                basic.sum([1, 2, "error"]);
            },
            /All elements in array must be numbers/
        );
        done();
    });

    // basic.substraction
    test('subtraction should return the difference of items in an array', function(done) {
        assert.equal(basic.subtraction([5, 3, 1, -1]), 2);
        done();
    });

    test('subtraction should throw an exception when given anything but an array', function(done) {
        assert.throws(
            function() {
                basic.subtraction(1);
            },
            /Input must be of type Array/
        );
        done();
    });

    test('subtraction should throw an exception when given anything objects other than numbers', function(done) {
        assert.throws(
            function() {
                basic.subtraction(["test", 1, 1, 2]);
            },
            /All elements in array must be numbers/
        );
        done();
    });

    test('subtraction should throw an exception last element is not a number', function(done) {
        assert.throws(
            function() {
                basic.subtraction([1, 1, 2, "test"]);
            },
            /All elements in array must be numbers/
        );
        done();
    });

    // basic.product
    test('product should return the product of items in an array', function(done) {
        assert.equal(basic.product([1, 2, 3, 4]), 24);
        assert.equal(basic.product([-3, 2]), -6);
        done();
    });

    test('product should throw an exception when given anything but an array', function(done) {
        assert.throws(
            function() {
                basic.product(1);
            },
            /Input must be of type Array/
        );
        done();
    });

    test('product should throw an exception when given anything objects other than numbers', function(done) {
        assert.throws(
            function() {
                basic.product([1, 2, "error"]);
            },
            /All elements in array must be numbers/
        );
        done();
    });

    test('product should throw an exception when given anything objects other than numbers', function(done) {
        assert.throws(
            function() {
                basic.product(["error", 1, 2]);
            },
            /All elements in array must be numbers/
        );
        done();
    });

    test('square should return the square of a number', function(done) {
        assert.equal(basic.square(4), 16);
        done();
    });

    // basic.binomial
    test('binomial should return the binomial coefficient (n choose k) of two numbers', function(done) {
        assert.equal(basic.binomial(5, 3), 10);
        done();
    });

    // basic.factorial
    test('factorial should return the product of n * (n - 1) * (n - 2) * ... * 1', function(done) {
        assert.equal(basic.factorial(4), 24);
        assert.equal(basic.factorial(5), 120);
        done();
    });

    // basic.gcd
    test('gcd should throw an exception when given a decimal', function(done) {
        assert.throws(
            function() {
                basic.gcd(0.2, 1);
            },
            /Can only operate on integers/
        );
        done();
    });
    test('gcd should return the greatest common denominator of two integers', function(done) {
        assert.equal(basic.gcd(1254, 0), 1254);
        assert.equal(basic.gcd(0, -5298), 5298);
        assert.equal(basic.gcd(0, -Infinity), Infinity);
        assert.equal(basic.gcd(4430, -Infinity), Infinity);
        assert.equal(basic.gcd(-1254, -5298), 6);
        assert.equal(basic.gcd(1254, 5298), 6);
        assert.equal(basic.gcd(78699786, 78978965), 1);
        done();
    });

    // basic.lcm
    test('lcm should return the least common multiple of two integers', function(done) {
        assert.equal(basic.lcm(4, 0), 0);
        assert.equal(basic.lcm(0, 4), 0);
        assert.equal(isNaN(basic.lcm(4, Infinity)), true);
        assert.equal(isNaN(basic.lcm(Infinity, 4)), true);
        assert.equal(basic.lcm(4, 5), 20);
        assert.equal(basic.lcm(3, 4), 12);
        assert.equal(basic.lcm(4, 6), 12);
        assert.equal(basic.lcm(21, 6), 42);
        assert.equal(basic.lcm(12, 80), 240);
        done();
    });

    // basic.max
    test('basic.max will throw an exception if argument is not an array.', function(done) {
        assert.throws(
            function() {
                basic.max(65, 40);
            },
            /Input must be of type Array/
        );
        done();
    });

    test('max should return the biggest number in an array', function(done) {
        assert.equal(basic.max([1, 2, 3, 42]), 42);
        assert.equal(basic.max([-1, -2, -3, -42]), -1);
        assert.equal(basic.max([1, Infinity]), Infinity);
        assert.equal(basic.max(longList), 1000000);
        done();
    });

    // basic.min
    test('basic.min will throw an exception if argument is not an array.', function(done) {
        assert.throws(
            function() {
                basic.min(65, 40);
            },
            /Input must be of type Array/
        );
        done();
    });

    test('min should return the smallest number in an array', function(done) {
        assert.equal(basic.min([1, 2, 3, 42]), 1);
        assert.equal(basic.min([-1, -2, -3, -42]), -42);
        assert.equal(basic.min([1, -Infinity]), -Infinity);
        assert.equal(basic.min(longList), -1000000);
        done();
    });

    // basic.range
    test('range should return an appropriate range for the given start, stop, and step parameters', function(done) {
        assert.deepEqual(basic.range(1, 10), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        assert.deepEqual(basic.range(10, 1), [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
        assert.deepEqual(basic.range(1, 5, 0.5), [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]);
        assert.deepEqual(basic.range(5, 1, 0.5), [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1]);
        done();

    });

    // basic.isInt
    test('isInt checks for an integer', function(done) {
        assert.equal(basic.isInt(2.32), false);
        assert.equal(basic.isInt('true'), false);
        assert.equal(basic.isInt('2'), true); //based off impelementation change
        assert.equal(basic.isInt(2), true);
        done();
    });

    // basic.divMod
    test('divMod should return an array of both the division and modulus values of two integers', function(done) {
        assert.deepEqual(basic.divMod(12, 6), [2, 0]);
        assert.deepEqual(basic.divMod(10, 3), [3, 1]);
        done();
    });

    // basic.egcd
    test('egcd should throw an exception when given a decimal', function(done) {
        assert.throws(
            function() {
                basic.egcd(0.2, 1);
            },
            /Can only operate on integers/
        );
        done();
    });
    test('egcd should return the array [a, x, y] which is the solved linear equation for GCD', function(done) {
        assert.equal(basic.egcd('ten', 1).toString(), 'NaN,NaN,NaN');
        assert.deepEqual(basic.egcd(1, Infinity), [Infinity, Infinity, Infinity]);
        assert.deepEqual(basic.egcd(3, 0), [3, 1, 0]);
        assert.deepEqual(basic.egcd(0, 3), [3, 0, 1]);
        assert.deepEqual(basic.egcd(-2, -6), [2, -1, 0]);
        assert.deepEqual(basic.egcd(-2, 5), [1, 2, 1]);
        assert.deepEqual(basic.egcd(65, 40), [5, -3, 5]);
        assert.deepEqual(basic.egcd(40, 65), [5, 5, -3]);
        assert.deepEqual(basic.egcd(1239, 735), [21, -16, 27]);
        assert.deepEqual(basic.egcd(105, 252), [21, 5, -2]);
        assert.deepEqual(basic.egcd(252, 105), [21, -2, 5]);
        done();
    });

    // basic.modInverse
    test('modInverse will return the modulo m inverse of a', function(done) {
        assert.equal(basic.modInverse(1, 5), 1);
        done();
    });

    test('modInverse will throw an exception if no modular inverse exists', function(done) {
        assert.throws(
            function() {
                basic.modInverse(65, 40);
            },
            /No modular inverse exists/
        );
        done();
    });

    // basic.powerMod
    test('powerMod should return the answer to a^b mod m', function(done) {
        assert.equal(basic.powerMod(1, -1, 5), 1);
        assert.equal(basic.powerMod(2, 10, 3), 1);
        assert.equal(basic.powerMod(2, Math.pow(10, 9), 18), 16);
        assert.equal(basic.powerMod(6, 0.5, 10), 6);
        assert.equal(basic.powerMod(4, 13, 497), 445);
        done();
    });


    test('should be able to check equality of two floating point numbers', function(done) {
        assert.equal(basic.numbersEqual(5, 5, numbers.EPSILON), true);
        assert.equal(basic.numbersEqual(5.0001, 5.0000001, numbers.EPSILON), true);
        assert.equal(basic.numbersEqual(-5, 5, numbers.EPSILON), false);
        assert.equal(basic.numbersEqual(5, 5.1, numbers.EPSILON), false);
        assert.equal(basic.numbersEqual(5, 5.001, numbers.EPSILON), false);
        done();
    });

    // basic.fallingFactorial
    test('fallingFactorial should return correct answers', function(done) {
        var func = basic.fallingFactorial;

        assert.equal(func(0, 0), 1); //allows n=0
        assert.equal(func(7, 0), 1); //k = 0 returns 1.
        assert.equal(func(2, 4), 0); //nonsensical k returns 0

        assert.equal(func(7, 7), 5040); //n=k returns n!
        assert.equal(func(7, 4), 840);

        assert.throws(
            function() {
                func(-2, 5);
            },
            /negative/
        );

        done();
    });

});
