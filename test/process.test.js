var assert = require('assert');
var numbers = require('../index.js');
var process = numbers.process;
var basic = numbers.basic;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Process Calculations\033[0m');

  // cpl
  test('cpl should be > 0 if values are > limit, cpl should be < 0 if values < limit, & cpl should be around 0 if values are very close to limit', function(done) {
    var arr = [],
        max = 1000000,
        min = 1;
    for (var i = min; i <= max; i++){
        arr.push((i % 2) + 1); // values are 1 or 2
    }
    assert.equal(1, process.cpl(arr, 0));
    assert.equal(-1, process.cpl(arr, 3));
    assert.equal(0.3333333333333333, process.cpl(arr, 1));
    done();
  });

  // cpu
  test('cpu should be > 0 if values are < limit, cpu should be < 0 if values > limit, & cpu should be around 0 if values are very close to limit', function(done) {
    var arr = [],
        max = 1000000,
        min = 1;
    for (var i = min; i <= max; i++){
        arr.push((i % 2) + 1); // values are 1 or 2
    }
    assert.equal(-1, process.cpu(arr, 0));
    assert.equal(1, process.cpu(arr, 3));
    assert.equal(0.3333333333333333, process.cpu(arr, 2));
    done();
  });

  // cpk
  test('cpk should be > 0 if values are between limits, cpk should be < 0 if values are outside limits, & cpk should be around 0 if values are very close to limits', function(done) {
    var arr = [],
        max = 1000000,
        min = 1;
    for (var i = min; i <= max; i++){
        arr.push((i % 2) + 1); // values are 1 or 2
    }
    assert.equal(1, process.cpk(arr, 0, 3));
    assert.equal(-1, process.cpk(arr, 3, 6));
    assert.equal(0.3333333333333333, process.cpk(arr, 1, 3));
    done();
  });

  // cp
  test('cp should be > 0 if values are between limits, cp should be < 0 if values are outside limits, & cp should be around 0 if values are very close to limits', function(done) {
    var arr = [],
        max = 1000000,
        min = 1;
    for (var i = min; i <= max; i++){
        arr.push((i % 2) + 1); // values are 1 or 2
    }
    assert.equal(1, process.cp(arr, 0, 3));
    assert.equal(1, process.cp(arr, 3, 6));
    assert.equal(0.6666666666666666, process.cp(arr, 1, 3));
    done();
  });
});
