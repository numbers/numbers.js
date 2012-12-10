var useless = exports;

/**
 * Populate the given array with a Collatz Sequence
 *
 * @param {Number} first number
 * @param {Array} arrary to be populated
 */
useless.collatz = function (n, result) {
  result.push(n);
  
  if (n == 1) {
    return;
  } else if (n % 2 === 0) {
    useless.collatz(n/2, result);
  } else {
    useless.collatz(3 * n + 1, result);
  }
};
