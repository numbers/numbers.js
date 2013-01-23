var core = exports;

/**
 * Tests whether the two values are equal to each other, within a certain
 * tolerance to adjust for floating pount errors.
 * 
 * @param {Number} a A number.
 * @param {Number} b A number.
 * @param {Number} tolerance (optional) tolerance range; falls back to numbers.EPSILON.
 * @return {Boolean} Whether {@code a} and {@code b} are nearly equal.
 */
core.nearlyEquals = function(a, b, tolerance) {
  return Math.abs(a - b) <= (tolerance || numbers.EPSILON);
};