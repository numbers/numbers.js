var assert = require('assert');
var numbers = require('../index.js');
var dsp = numbers.dsp;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting DSP Tools\033[0m');

  test('segment should return a sample of the input array', function(done) {
    var res = dsp.segment([1, 2, 3, 4, 5, 6, 7, 8, 9], 2, 3), a = [3, 6, 9];
    
    assert.equal(res[0] == a[0] && res[1] == a[1] && res[2] == a[2], true);
    done();
  });

  test('fft should return fourier transform of input array', function(done) {
    var res = dsp.fft([1, 1, 1, 1, 0, 0, 0, 0]);

    assert.equal(res[0].re - numbers.EPSILON < 4 && 4 < res[0].re + numbers.EPSILON, true);
    assert.equal(res[0].im - numbers.EPSILON < 0 && 0 < res[0].im + numbers.EPSILON, true);
    assert.equal(res[2].re - numbers.EPSILON < 1 && 1 < res[2].re + numbers.EPSILON, false);
    assert.equal(res[2].im - numbers.EPSILON < -1 && -1 < res[2].im + numbers.EPSILON, false);
    assert.equal(res[4].re - numbers.EPSILON < 2 && 2 < res[4].re + numbers.EPSILON, false);
    assert.equal(res[4].im - numbers.EPSILON < 0 && 0 < res[4].im + numbers.EPSILON, true);
    done();
  });
});
