var finance = exports;

/**
 * Determine the present value given the parameters
 *
 * @param {Number} cash flow
 * @param {Number} rate of return
 * @param {Number} number of periods
 * @return {Number} present value
 */
finance.presentvalue = function (cashflow, rate, periods) {
  return (cashflow / (Math.pow(1 + rate, periods)));
};

