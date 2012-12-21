var assert = require('assert');
var numbers = require('../index.js');
var finance = numbers.finance;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Finance Mathematics\033[0m');

  test('sum should compute the present value', function (done) {
    var res = finance.presentvalue(100,.05, 1);
    assert.equal(res > (95.238 - numbers.EPSILON), true);
    assert.equal(res < (95.238 + numbers.EPSILON), true);
    done();
  });


});

