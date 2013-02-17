/**
 * numbers.js
 *
 * top level management of numbers extensions
 *
 * (C) 2013 Steve Kaliski
 * MIT License
 *
 */
 
var numbers = exports;

// Add basic methods to their proper namespaces.
numbers.core = require('./numbers/core');
numbers.util = require('./numbers/util');

// Alias core and util on numbers directly.
addGlobalMethods(numbers.core);
addGlobalMethods(numbers.util);

// Add the types.
numbers.types = {};
numbers.types.matrix = require('./types/matrix');
numbers.types.sample = require('./types/sample');

// Add a "createX" method for each type.
for (var ns in numbers.types) {
  for( var type in numbers.types[ns]) {
    numbers['create' + type] = (function (constructor) {
      return function () {
        //new operator not needed because the objects
        //extend built-ins rather than modify "this"
        return constructor.apply(undefined, arguments);
      };
    }(numbers.types[ns][type]));
  }
}

// Expose methods.
numbers.calculus  = require('./numbers/calculus');
numbers.linear    = require('./numbers/linear');
numbers.prime     = require('./numbers/prime');
numbers.statistic = require('./numbers/statistic');
numbers.useless   = require('./numbers/useless');

/**
 * Bind core and util methods to numbers global namespace.
 *
 * @param {Object} module.
 */
function addGlobalMethods(module) {
  for (var method in module) {
    numbers[method] = module[method];
  }
};

/** 
 * @property {Number} EPSILON Epsilon (error bound) to be used 
 * in calculations. Can be set and retrieved freely. 
 * 
 * Given the float-point handling by JavaScript, as well as
 * the numbersal proficiency of some methods, it is common 
 * practice to include a bound by which discrepency between 
 * the "true" answer and the returned value is acceptable.
 *
 * If no value is provided, 0.001 is default.
 */
numbers.EPSILON = 0.001;
