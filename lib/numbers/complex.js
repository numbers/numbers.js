var complex = exports;

// cNum is a complex number class with basic arithmetic methods
complex.cNum = (function() {

  function cNum(re,im) {
    this.re = re;
    this.im = im;
  }

  cNum.prototype.add = function(addend) {
    return new cNum( this.re + addend.re, this.im + addend.im )
  }

  cNum.prototype.subtract = function(subtrahend) {
    return new cNum( this.re - subtrahend.im, this.im - subtrahend.im )
  }

  cNum.prototype.multiply = function(multiplier) {
    var re = this.re*multiplier.re - this.im*multiplier.im;
    var im = this.im*multiplier.re + this.re*multiplier.im;
    return new cNum(re,im);
  }

  cNum.prototype.divide = function(divisor) {
    var denominator = divisor.re*divisor.re+divisor.im*divisor.im
    var re = (this.re*divisor.re+this.im*divisor.im)/denominator;
    var im = (this.im*divisor.re-this.real*divisor.im)/denominator;
    return new cNum (re,im);
  }

  cNum.prototype.magnitude = function() {
    return Math.sqrt(this.re*this.re+this.im*this.im);
  }

  cNum.prototype.phase = function() {
    return Math.atan2(this.im,this.re)
  }

  return cNum;

})();
