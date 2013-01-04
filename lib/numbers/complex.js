/**
 * complex.js
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
var basic = numbers.basic;

var Complex = function (re, im) {
  this.re = re;
  this.im = im;
  this.r  = this.magnitude();
  this.t  = this.phase(); // theta = t = arg(z)
};

/**
 * Add a complex number to this one.
 * 
 * @param {Complex} Number to add.
 * @return {Complex} New complex number (sum).
 */
Complex.prototype.add = function(addend) {
  return new Complex(this.re + addend.re, this.im + addend.im);
};

/**
 * Subtract a complex number from this one.
 * 
 * @param {Complex} Number to subtract.
 * @return {Complex} New complex number (difference).
 */
Complex.prototype.subtract = function (subtrahend) {
  return new Complex(this.re - subtrahend.re, this.im - subtrahend.im);
};

/**
 * Multiply a complex number with this one.
 * 
 * @param {Complex} Number to multiply by.
 * @return {Complex} New complex number (product).
 */
Complex.prototype.multiply = function (multiplier) {
  var re = this.re * multiplier.re - this.im * multiplier.im;
  var im = this.im * multiplier.re + this.re * multiplier.im;
  
  return new Complex(re, im);
};

/**
 * Divide this number with another complex number.
 * 
 * @param {Complex} Divisor.
 * @return {Complex} New complex number (quotient).
 */
Complex.prototype.divide = function (divisor) {
  var denominator = divisor.re * divisor.re + divisor.im * divisor.im;
  var re = (this.re * divisor.re + this.im * divisor.im) / denominator;
  var im = (this.im * divisor.re - this.re * divisor.im) / denominator;
  
  return new Complex(re,im);
};

/**
 * Get the magnitude of this number.
 * 
 * @return {Number} Magnitude.
 */
Complex.prototype.magnitude = function () {
  return Math.sqrt(this.re * this.re + this.im * this.im);
};

/**
 * Get the phase of this number.
 * 
 * @return {Number} Phase.
 */
Complex.prototype.phase = function () {
  return Math.atan2(this.im, this.re);
};

/**
 * Conjugate the imaginary part
 *
 * @return {Complex} Conjugated number
 */
Complex.prototype.conjugate = function () {
  return new Complex(this.re, -1 * this.im);
};

/**
 * Raises this complex number to the nth power.
 *
 * @param {number} power to raise this complex number to.
 * @return {Complex} the nth power of this complex number.
 */
Complex.prototype.pow = function(n) {
  var constant = Math.pow(this.magnitude(), n);

  return new Complex(constant * Math.cos(n * this.phase()), constant * Math.sin(n * this.phase()));
};

/**
 * Raises this complex number to given complex power.
 *
 * @param complexN the complex number to raise this complex number to.
 * @return {Complex} this complex number raised to the given complex number.
 */
Complex.prototype.complexPow = function(complexN) {
  var realSqPlusImSq =  Math.pow(this.re, 2) + Math.pow(this.im, 2);
  var multiplier = Math.pow(realSqPlusImSq, complexN.re / 2) * Math.pow(Math.E, -complexN.im * this.phase());
  var theta = complexN.re * this.phase() + .5 * complexN.im * Math.log(realSqPlusImSq);

  return new Complex(multiplier * Math.cos(theta), multiplier * Math.sin(theta));
};

/**
 * Find all the nth roots of this complex number.
 *
 * @param {Number} root of this complex number to take.
 * @return {Array} an array of size n with the roots of this complex number.
 */
Complex.prototype.roots = function(n) {
  var result = new Array(n);

  for(var i = 0; i < n; i++) {
    var theta = (this.phase() + 2*Math.PI*i) / n;
    var radiusConstant = Math.pow(this.magnitude(), 1 / n);

    result[i] = (new Complex(radiusConstant * Math.cos(theta), radiusConstant * Math.sin(theta)))
  }

  return result;
};


/**
 * Returns the sine of this complex number.
 *
 * @return {Complex} the sine of this complex number.
 */
Complex.prototype.sin = function() {
  var E = new Complex(Math.E, 0);
  var i = new Complex(0, 1);
  var negativeI = new Complex(0, -1);
  var numerator = E.complexPow(i.multiply(this)).subtract(E.complexPow(negativeI.multiply(this)));

  return numerator.divide(new Complex(0, 2));
};

/**
 * Returns the cosine of this complex number.
 *
 * @return {Complex} the cosine of this complex number.
 */
Complex.prototype.cos = function() {
  var E = new Complex(Math.E, 0);
  var i = new Complex(0, 1);
  var negativeI = new Complex(0, -1);
  var numerator = E.complexPow(i.multiply(this)).add(E.complexPow(negativeI.multiply(this)));

  return numerator.divide(new Complex(2, 0));
};

/**
 * Returns the tangent of this complex number.
 *
 * @return {Complex} the tangent of this complex number.
 */
Complex.prototype.tan = function() {
  return this.sin().divide(this.cos());
};

/**
 * Checks for equality between this complex number and another
 * within a given range defined by epsilon.
 *
 * @param {Complex} complex number to check this number against.
 * @param {Number} epsilon
 * @return {boolean} true if equal within epsilon, false otherwise
 */
Complex.prototype.equals = function(complex, epsilon) {
  return basic.numbersEqual(this.re, complex.re, epsilon) &&
         basic.numbersEqual(this.im, complex.im, epsilon);
};

module.exports = Complex;
