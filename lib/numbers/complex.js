var Complex = function (re,im) {
  this.re = re;
  this.im = im;
}

/**
 * Add a complex number to this one.
 * 
 * @param {Complex} Number to add.
 * @return {Complex} New complex number (sum).
 */
Complex.prototype.add = function(addend) {
  return new Complex( this.re + addend.re, this.im + addend.im );
}

/**
 * Subtract a complex number from this one.
 * 
 * @param {Complex} Number to subtract.
 * @return {Complex} New complex number (difference).
 */
Complex.prototype.subtract = function(subtrahend) {
  return new Complex( this.re - subtrahend.im, this.im - subtrahend.im );
}

/**
 * Multiply a complex number with this one.
 * 
 * @param {Complex} Number to multiply by.
 * @return {Complex} New complex number (product).
 */
Complex.prototype.multiply = function(multiplier) {
  var re = this.re*multiplier.re - this.im*multiplier.im;
  var im = this.im*multiplier.re + this.re*multiplier.im;
  return new Complex(re,im);
}

/**
 * Divide this number with another complex number.
 * 
 * @param {Complex} Divisor.
 * @return {Complex} New complex number (quotient).
 */
Complex.prototype.divide = function(divisor) {
  var denominator = divisor.re*divisor.re+divisor.im*divisor.im;
  var re = (this.re*divisor.re+this.im*divisor.im)/denominator;
  var im = (this.im*divisor.re-this.re*divisor.im)/denominator;
  return new Complex(re,im);
}

/**
 * Get the magnitude of this number.
 * 
 * @return {Number} Magnitude.
 */
Complex.prototype.magnitude = function() {
  return Math.sqrt(this.re*this.re+this.im*this.im);
}

/**
 * Get the phase of this number.
 * 
 * @return {Number} Phase.
 */
Complex.prototype.phase = function() {
  return Math.atan2(this.im,this.re)
}

//export
exports.Complex = Complex;
