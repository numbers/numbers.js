var util = exports;

/**
 * Checks if an element is in an array.
 * Borrowed from jQuery. Uses the native indexOf if available.
 *
 * @param {Mixed} elem The element to search for
 * @param {Array} arr The array to search
 * @param {Integer} i (Optional) The index to start searching from
 * @return {Integer} The index at which the element was found; -1 if it wasn't.
 */ 
util.inArray = function(elem, arr, i) {
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

util.objectKeys = Object.keys ? Object.keys : (function () {
  var hasOwnProperty = Object.prototype.hasOwnProperty,
      hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
      dontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
      ],
      dontEnumsLength = dontEnums.length;

  return function (obj) {
    if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

    var result = [];

    for (var prop in obj) {
      if (hasOwnProperty.call(obj, prop)) result.push(prop);
    }

    if (hasDontEnumBug) {
      for (var i=0; i < dontEnumsLength; i++) {
        if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
      }
    }
    return result;
  }
})();

/**
 * Tests whether the provided argument is a native Array object
 *
 * @param {Mixed} arg The argument to test
 * @return {Boolean} Whether arg is an Array.
 */
util.isArray = function(arg) {
  return Object.prototype.toString.call(arg) === "[object Array]";
};
  
/**
 * Tests whether the provided argument is a javascript Object.  
 * Uses Object.prototype.toString; does not count Arrays, Functions, etc.
 *
 * @param {Mixed} arg The argument to test
 * @return {Boolean} Whether arg is an Object.
 */
util.isObject = function(arg) {
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
util.isPlainObject = function(arg) {
    return (util.isObject(arg) && !arg.nodeType);
};

/** 
 * Tests whether the argument is an object or array with a given set of methods.
 *
 * @param {Mixed} arg The argument to test
 * @param {Array} methods An array of method names that the arg should have.
 * @return {Boolean} Whether arg is an object or array and has all the requested methods.
 */ 
util.isObjWithMethods = function(arg, methods) {
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
 * Tests whether the argument is a number.
 * @param {Mixed} arg The argument to test
 * @param {Boolean} allowNaN Whether to count NaN as a number
 * @return {Boolean} Whether the arg is a number
 */ 
util.isNumber = function(arg, allowNaN) {
  return (typeof arg === 'number') && (allowNaN || arg !== NaN);
}

/**
 * Tries to convert the provided arg to a primitive number.
 *
 * @param {Mixed} The arg to convert
 * @return {Number|False} The argument as a number, or false if conversion failed.
 */ 
util.toNumber = function(arg) {
  var x = Number(arg);

  return x !== NaN ? x : false; 
}


/**
 * Makes a deep clone of an object or array.
 * Adapted from jQuery; equivalent to jQuery.extend(true, []/{}, object);
 *
 * @param {Object|Array} The object or array to clone
 * @return {Object|Array} The clone
 */
util.deepClone = function(object) {

  var name, src, copy, copyIsArray, clone, 
      target = util.isArray(object) ? [] : {};

  //Extend the base object
  for (name in object) {
    src = target[ name ];
    copy = object[ name ];

    // Prevent never-ending loop
    if(target === copy) {
      continue;
    }

    //Clone and recurse if we're merging plain objects or arrays
    if( copy && (util.isPlainObject(copy) || (copyIsArray = util.isArray(copy))) ) {
      if ( copyIsArray ) {
        copyIsArray = false;
        clone = src && util.isArray(src) ? src : [];
      } 
      else {
        clone = src && util.isPlainObject(src) ? src : {};
      }

      // Never move original objects, clone them
      target[ name ] = util.deepClone(copy, clone);
    }
      
    //Otherwise, just copy over the value unless it's undefined
    else if ( copy !== undefined ) {
      target[ name ] = copy;
    }
  }

  //Return the clone
  return target;
}

/**
 * Set up a sub class, with SubClassConstructor.__super__
 * pointing to SuperClassConstructor.prototype.
 *
 * @param {Function} The constructor function of the sub class
 * @param {Function} The constructor function of the super class.
 */
util.extend = function(SubClassConstructor, SuperClassConstructor) {

  //create a new, dummy object that we can use to prototype chain in the
  //superClass's prototype while allowing us to bypass its constructor,
  //which would potentially throw errors (if it's missing args)
  //and would drop instance vars onto our prototype.
  function Chainer() { this.constructor = SubClassConstructor; };
  Chainer.prototype = SuperClassConstructor.prototype;
  SubClassConstructor.prototype = new Chainer();

  //Set super as not an prototype property so that it's less susceptible
  //to reassignments of this. e.g. calling SubClass.x() might really 
  //produce a call of subType.__proto__.__proto__.x()
  //(i.e. an x on the prototype of the SuperClass), and in that x `this`
  //will point to the SubClass instance, even though the SuperClass's method
  //probably expects it to point to the SuperClass' instance. We could make
  //it an inherited property too (i.e. on SubClassConstructor.prototype),
  //but there's really no need. Any instance that wants to get access to
  //it's parent's prototype can do so with inst.constructor.__super__;
  SubClassConstructor.__super__  = SuperClassConstructor.prototype;

};

/**
 * Extends the provided object parasitically.
 *
 * Takes the base object and attaches to it all the provided functions,
 * using each's name as the property it should go on in base. Also sets
 * base's 'constructor' to the one provided, and stores the names of all
 * the methods added to base on constructor._typeMethods, such that an
 * object can later be duck-typed per the methods the constructor expects.
 *
 * @param {Object} base The base object to extend.
 * @param {Array} named_functions An array of named functions (i.e. defined 
 * with an identifier, such that they have a .name property) to add to base.
 * @param {Function} constructor The function that's this "type"'s constructor.
 */ 
util.parasiticExtend = function(base, named_functions, constructor) {
  var func;
  
  if(!numbers.util.isPlainObject(constructor._typeMethods)) { constructor._typeMethods = {}; }
  
  for(var i = 0, len = named_functions.length; i < len; i++) {
    func = named_functions[i];

    if(typeof func !== 'function' || !func.name) {
      throw new Error("All provided methods must be functions and have a name");
    }

    else {
      base[func.name] = func;
      constructor._typeMethods[func.name] = true;
    }
  }
  
  base.constuctor = constructor;
  return base;
}

/**
 * Parasitically adds one method to an object, but under a different name than the function was originally defined with.
 *
 * @param {Object} base The base object to extend.
 * @param {Function} func The function to add
 * @param {String} name The property name under which this function should be added.
 * @param {Function} constructor The function that's this "type"'s constructor.
 */ 
util.parasiticAddRenamedMethod = function(base, func, name, constructor) {
  base[name] = func;

  if(!numbers.util.isPlainObject(constructor._typeMethods)) { constructor._typeMethods = {}; }
  constructor._typeMethods[name] = true;

  return base;
}

util.parasiticIs = function(obj, constructor) {
  return obj.constructor === constructor || numbers.util.isObjWithMethods(numbers.util.objectKeys(constructor._typeMethods));
}