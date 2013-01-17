var utils = exports;

/**
 * Checks if an element is in an array.
 * Borrowed from jQuery. Uses the native indexOf if available.
 *
 * @param {Mixed} elem The element to search for
 * @param {Array} arr The array to search
 * @param {Integer} i (Optional) The index to start searching from
 * @return {Integer} The index at which the element was found; -1 if it wasn't.
 */ 
utils.inArray = function(elem, arr, i) {
  var len;
  
  if (arr) {
    if (Array.prototype.indexOf) {
      return Array.prototype.indexOf.call(arr, elem, i);
    }
  
    len = arr.length;
    i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;
  
    for ( ; i < len; i++ ) {
       // Skip accessing in sparse arrays
      if (i in arr && arr[ i ] === elem) {
        return i;
      }
    }
  }
  
  return -1;
};

/**
 * Tests whether the provided argument is a native Array object
 *
 * @param {Mixed} arg The argument to test
 * @param {Boolean} Whether arg is an Array.
 */
utils.isArray = function(arg) {
  return Object.prototype.toString.call(arg) === "[object Array]";
};
  
/**
 * Tests whether the provided argument is a javascript Object.  
 * Uses Object.prototype.toString; does not count Arrays, Functions, etc.
 *
 * @param {Mixed} arg The argument to test
 * @param {Boolean} Whether arg is an Object.
 */
utils.isObject = function(arg) {
  return Object.prototype.toString.call(arg) === "[object Object]";
};
  
/**
 * Tests whether the arg is an object and (likely) not at DOM node. 
 *
 * A highly stripped down verion of jQuery's is plain object. 
 * Doesn't try very hard to filter out DOM nodes, host objects, etc.,
 * which we can reasonably assume won't be in numbers code.
 *
 * @param {Mixed} arg The arg to test
 * @return {Boolean} Whether the arg is an object and (likely) not a DOM node.
 */
utils.isPlainObject = function(arg) {
    return (utils.isObject(arg) && !arg.nodeType);
};

/** 
 * Tests whether the argument is an object or array with a given set of methods.
 *
 * @param {Mixed} arg The argument to test
 * @param {Array} methods An array of method names that the arg should have.
 * @return {Boolean} Whether arg is an object or array and has all the requested methods.
utils.isObjWithMethods: function(arg, methods) {
    //allows objects or arrays
    if(typeof arg !== "object") {
      return false;
    }

    for (var i = 0, len = methods.length; i < len; i++) {
      if(typeof arg[methods[i]] !== "function") {
        return false;
      }
    }
  
    return true;
  }

/**
 * Makes a deep clone of an object or array.
 * Adapted from jQuery; equivalent to jQuery.extend(true, []/{}, object);
 *
 * @param {Object|Array} The object or array to clone
 * @param {Object|Array} The clone
 */
utils.deepClone = function(object) {

  var name, src, copy, copyIsArray, clone, 
      target = utils.isArray(object) ? [] : {};

  //Extend the base object
  for (name in object) {
    src = target[ name ];
    copy = object[ name ];

    // Prevent never-ending loop
    if(target === copy) {
      continue;
    }

    //Clone and recurse if we're merging plain objects or arrays
    if( copy && (utils.isPlainObject(copy) || (copyIsArray = utils.isArray(copy))) ) {
      if ( copyIsArray ) {
        copyIsArray = false;
        clone = src && utils.isArray(src) ? src : [];
      } 
      else {
        clone = src && utils.isPlainObject(src) ? src : {};
      }

      // Never move original objects, clone them
      target[ name ] = utils.deepClone(copy, clone);
    }
      
    //Otherwise, just copy over the value unless it's undefined
    else if ( copy !== undefined ) {
      target[ name ] = copy;
    }
  }

  //Return the clone
  return target;
}
