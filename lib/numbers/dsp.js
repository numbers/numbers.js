var dsp = exports;
var complex = require('./complex.js')

// Returns an array composed of elements from arr, starting at index start
// and counting by step
dsp.segment = function(arr, start, step) {
  var result = [];
  for ( var i = start; i < arr.length; i += step ) {
    result.push(arr[i]);
  }
  return result;
}

// Returns an array of complex numbers representing the frequency spectrum
// of real valued time domain sequence x. (x.length must be integer power of 2)
// Inspired by http://rosettacode.org/wiki/Fast_Fourier_transform#Python
dsp.fft = function(x) {
  var N = x.length;
  if ( N <= 1 )
    return [ new complex.cNum(x[0],0) ];
  // check that N is int pwr of 2
  if (Math.log(N) / Math.LN2 % 1 !== 0)
    // Could eventually 0-pad the input, throw error for now.
    throw new Error ('Array length must be integer power of 2');
  var even = dsp.fft(dsp.segment(x, 0, 2));
  var odd = dsp.fft(dsp.segment(x, 1, 2));
  var res = [], Nby2 = N / 2;
  for ( var k = 0; k < N; k++ ) {
    var tmpPhase = -2*Math.PI*k/N;
    var phasor = new complex.cNum(Math.cos(tmpPhase),Math.sin(tmpPhase));
    if (k < Nby2)
      res[k] = even[k].add(phasor.multiply(odd[k]));
    else
      res[k] = even[k-Nby2].subtract(phasor.multiply(odd[k-Nby2]));
  }
  return res;
}
