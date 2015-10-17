/**
 * generators.js
 * http://github.com/sjkaliski/numbers.js
 *
 * Copyright 2012 Stephen Kaliski, Kartik Talwar
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


var generate = exports;

/**
 * Fast Fibonacci Implementation
 *
 * @param {number} The nth Fibonacci number to calculate
 * @return {number|undefined} The nth Fibonacci number
 */
generate.fibonacci = function (n) {
  // Adapted from
  // http://bosker.wordpress.com/2011/04/29/the-worst-algorithm-in-the-world/

  if (!isNaN(n)){
    var bitSystem = function (n) {
      var bit, bits = [];

      while (n > 0) {
        bit = (n < 2) ? n : n % 2;
        n = Math.floor(n / 2);
        bits.unshift(bit);
      }

      return bits;
    };

    var a = 1;
    var b = 0;
    var c = 1;
    var system = bitSystem(n);
    var temp;

    for (var i = 0; i < system.length; i++) {
      var bit = system[i];
      if (bit) {
        temp = [(a + c) * b, (b * b) + (c * c)];
        a = temp[0];
        b = temp[1];
      } else {
        temp = [(a * a) + (b * b), (a + c) * b];
        a = temp[0];
        b = temp[1];
      }

      c = a + b;
    }

    return b;
  }
};

/**
 * Build an array of numbers in a Collatz sequence
 *
 * @param {number} The number for which to build a Collatz sequence
 * @return {Array|undefined} An array of numbers in a Collatz sequence
 */
generate.collatz = function (n) {
  if (!isNaN(n)){
    var sequence = [];

    sequence.push(n);

    (function makeSequence(n) {
      if (n !== 1) {
        if (n % 2 === 0) {
          sequence.push(n / 2);
        } else {
          sequence.push(3 * n + 1);
        }
        makeSequence(sequence[sequence.length - 1]);
      }
    })(n);

    return sequence;
  }
};
