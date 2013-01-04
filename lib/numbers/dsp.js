/**
 * dsp.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var numbers = require('../numbers');
var Complex = numbers.complex
var dsp = exports;

/**
 * Returns an array composed of elements from arr, starting at index start
 * and counting by step.
 * 
 * @param {Array} Input array.
 * @param {Number} Starting array index.
 * @param {Number} Step size.
 * @return {Array} Resulting sub-array.
 */
dsp.segment = function (arr, start, step) {
  var result = [];
  
  for (var i = start; i < arr.length; i += step) {
    result.push(arr[i]);
  }

  return result;
};

/**
 * Returns an array of complex numbers representing the frequency spectrum
 * of real valued time domain sequence x. (x.length must be integer power of 2)
 * Inspired by http://rosettacode.org/wiki/Fast_Fourier_transform#Python
 * 
 * @param {Array} Real-valued series input, eg. time-series.
 * @return {Array} Array of complex numbers representing input signal in Fourier domain.
 */
dsp.fft = function (x) {
  var N = x.length;
  
  if (N <= 1) {
    return [new Complex(x[0], 0)];
  }  
  
  if (Math.log(N) / Math.LN2 % 1 !== 0) {
    throw new Error ('Array length must be integer power of 2');
  }
  
  var even = dsp.fft(dsp.segment(x, 0, 2));
  var odd = dsp.fft(dsp.segment(x, 1, 2));
  var res = [], Nby2 = N / 2;
  
  for (var k = 0; k < N; k++) {
    var tmpPhase = -2 * Math.PI * k / N;
    var phasor = new Complex(Math.cos(tmpPhase), Math.sin(tmpPhase));
    if (k < Nby2) {
      res[k] = even[k].add(phasor.multiply(odd[k]));
    } else {
      res[k] = even[k - Nby2].subtract(phasor.multiply(odd[k - Nby2]));
    }
  }
  
  return res;
};
