var util = exports;

/********************************************** POLYFILLS *****************************************************/

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
    if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) {
      throw new TypeError('Object.keys called on non-object');
    }

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


/*************************************** TYPE-CHECKING & CONVERSION *******************************************/

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


/*************************************** MISC. OBJECT MANIPULATION ********************************************/

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

  //create a new, dummy object that we can use to prototype chain in the SuperClass's
  //prototype while allowing us to bypass its constructor, which would potentially
  //throw errors (if it's missing args) and would drop instance vars onto our prototype.
  function Chainer() { this.constructor = SubClassConstructor; };
  Chainer.prototype = SuperClassConstructor.prototype;
  SubClassConstructor.prototype = new Chainer();

  //Set super as not an prototype property so that it's less susceptible to
  //reassignments of this. e.g. calling SubClass.x() might really produce a call of
  //subType.__proto__.__proto__.x() (i.e. an x on the prototype of the SuperClass),
  //and in that x `this` will point to the SubClass instance, even though the
  //SuperClass's method probably expects it to point to the SuperClass' instance.
  //We could make it an inherited property too (i.e. on SubClassConstructor.prototype),
  //but there's really no need. Any instance that wants to get access to it's parent's
  //prototype can do so with inst.constructor.__super__;
  SubClassConstructor.__super__  = SuperClassConstructor.prototype;
};


/****************************************** PARASITIC INHERITANCE *********************************************/

/**
 * Extends the provided object parasitically.
 *
 * Takes the base object and attaches to it all the provided functions, using each's name as
 * the property it should go on in base. Also sets base's 'constructor' to the one provided,
 * and stores the names of all the methods added to base on constructor._typeMethods, such
 * that an object can later be duck-typed per the methods the constructor expects.
 *
 * @param {Object} base The base object to extend.
 * @param {Array} named_functions An array of named functions (i.e. defined 
 * with an identifier, such that they have a .name property) to add to base.
 * @param {Array} prop_names An array of names of custom properties for the type.
 * @param {Function} constructor The function that's this "type"'s constructor.
 * @returns {Object} The modified base.
 */ 
util.parasiticExtend = function(base, named_functions, prop_names, constructor) {
  var func;
  
  if(!numbers.util.isPlainObject(constructor._typeMethods)) {
    constructor._typeMethods = {};
  }
  if(!numbers.util.isPlainObject(constructor._typeProps)) {
    constructor._typeProps   = {};
  }
  
  for(var i = 0, len = named_functions.length; i < len; i++) {
    func = named_functions[i];

    if(typeof func !== 'function' || !func.name) {
      throw new Error("All provided elements in named_functions must be functions with a name");
    }

    else {
      base[func.name] = func;
      constructor._typeMethods[func.name] = true;
    }
  }
  
  for(i=0, len = prop_names.length; i < len; i++) {
    constructor._typeProps[prop_names[i]] = true;
  }
  
  base.constuctor = constructor;
  return base;
}

/**
 * Parasitically adds a function to an object under a different name it was defined with.
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

/**
 * Checks whether an object is of a given type based on its constructor or
 * whether it has the methods from {@code parasiticExtend}.
 *
 * @param {Object} obj The object to test
 * @param {Function} constructor The constructor representing the type you're checking for
 * @returns {Boolean} Whether {@code obj} is of type {@code constructor}.
 */ 
util.parasiticIs = function(obj, constructor) {
  return
    obj.constructor === constructor ||
    numbers.util.isObjWithMethods(numbers.util.objectKeys(constructor._typeMethods));
}

/**
 * Removes any methods/properties added to the instance by {@code parasiticExtend}
 * and tries to reset the constructor property.
 * @param {Object} obj The object to "de-extend"
 * @param {Function} constructor The constructor function whose properties/methods to remove.
 * @param {Function} new_constructor (Optional) What to set the constructor property to; guessed if omitted.
 * @return {Object} The modified object.
 */ 
util.parasiticRemove = function(obj, constructor, new_constructor) {
  for(var method in constructor._typeMethods) {
    delete this[method];
  }
  for(var prop in constructor._typeProps) {
    delete this[prop];
  }

  this.constructor = new_constructor ? new_constructor : (util.isArray(obj) ? Array : Object);
}


/************************************************* CACHING ****************************************************/

/**
 * Takes an instance and adds a cache object to it.
 *
 * Will add four methods to methodLocation: _cacheHas, _cacheSet, _cacheVoid, & setCaching.
 * Will add an _cache property to instance.
 * 
 * @param {Object} instance The object to add the cache to.
 * @param {Boolean} useCache Whether the cache starts enabled or not.
 * @param {Object} methodLocation (Optional) Where to put the methods for checking,
 * setting, or voiding a member of the cache. If ommited, they'll be added to instance.
 */
util.createCache = function(instance, useCache, methodLocation) {
  methodLocation = methodLocation ? methodLocation : instance;
  
  instance._cache = {};
  methodLocation._cacheHas = util.cacheHas;
  methodLocation._cacheSet = util.cacheSet;
  methodLocation._cacheVoid = util.cacheVoid;
  methodLocation.setCaching = util.setCaching;
}

/**
 * Removes from the given instance any properties added by {@createCache}.
 * @param {Object} instance The object whose cache related properties/methods to remove.
 */ 
util.removeCache = function removeCache(instance) {
  delete instance["_cache"];
  
  //in case the methods were put on the instance
  delete instance["_cacheHas"];
  delete instance["_cacheSet"];
  delete instance["_cacheVoid"];
  delete instance["setCaching"];
}

/**
 * Turn on or off an instance cache creaed by {@code createCache}
 * @param {Boolean} useCaching Whether to turn caching on (true) or off (false).
 */
util.setCaching = function setCaching(useCaching) {
  this._useCache = useCaching;

  return this;
}

/**
 * Set a value in an instance cache created by {@code createCache}
 * @param {String} prop The property name
 * @param {Mixed} val The property's new value
 * @returns {Mixed} The property's new value.
 */ 
util.cacheSet = function cacheSet(prop, val) {
  this._cache[prop] = val;
  return val;
}

/**
 * Whether a cache created by {@code createCache} has a cache of a given property.
 * @param {String} prop The property to check for.
 * @returns {Boolean} Whether this property has a value in the cache.
 */ 
util.cacheHas = function cacheHas(prop) {
  return this._cache[prop] !== undefined; 
}

/**
 * Invalidates a cached property in a cache created by {@code createCache}.
 * @param {String} prop Name of the property to invalidate.
 */ 
util.cacheVoid = function cacheVoid(prop) {
  delete this._cache[prop];
}