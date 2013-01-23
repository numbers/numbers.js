/**
 * Constructs a set. 
 *
 * A set can hold numbers or other Sets. All members must be unique.
 *
 * @param {Number|Array} (optional) values to add to initial Set object.
 */
function Set(data, useCache) {
  var set = [];

  //exposed methods
  set.has = has;
  set.size = size;
  set.add = add;
  set['delete'] = remove;
  set.clone = clone;
  sset.toPlainArray = toPlainArray;
  set.union = union;
  set.difference = difference;
  set.intersection = intersection;
  set.symmetricDifference = symmetricDifference;
  set.isSuperSet = isSuperSet;
  set.isSubSet = isSubSet;

  //override "parent" array methods
  set.push = add;
  
  //construct
  set.union(data);
  set.constructor = Set;

  return set;
}

/** List of set methods for checking if an Object is a Set and for turning a set back to a plain Array */
var setMethods = [
  'has', 'size', 'add','delete',  'clone', 'toPlainArray', 'push',
  'union', 'difference', 'intersection', 'symmetricDifference', 'isSuperSet', 'isSubSet'
  ];

/******* "STATIC" METHODS *******/

/**
 * Determines whether the object provided is a Set
 * 
 * Note: this method is not exposed on each Set instance.
 */
Set.isSet = function(obj) {
  return (obj.constructor == Set) || numbers.util.isObjWithMethods(this, setMethods);
}

/**
 * Tries to convert the provided argument to a Set. 
 * 
 * @param {Mixed} The object to convert.
 * @return {Boolean|Set} False if conversion failed; the Set if it succeeded.
 */
Set.toSet = function(arg) {
  return Set.isSet(arg) ? arg : (numbers.util.isArray(arg) ? Set(arg) : false);
}

/**
 * Tries to convert the provided argument to a Set member.
 * 
 * @param {Mixed} The object to convert.
 * @return {Boolean|Set|Number} False if conversion failed; the member if it succeeded.
 */
Set.toMember = function(arg) {
 if(numbers.util.isObject(arg)) { return false; }

 //convert arrays to proper sets (if they aren't alread); 
 //any other primitive to a nubmer. @TODO What about functions?
 return numbers.util.isArray(arg) ? Set.toSet(arg) : Number(arg); 
}


/******* PUBLIC METHODS *******/

/**
 * Determine if the Set has a given value
 *
 * @param {Number} Value to search for
 * @return {Boolean} If value exists
 */
function has(value) {
  return (numbers.util.inArray(value, this) !== -1);  
}

/**
 * Get the size of this Set
 *
 * @return {Integer} Number of Members in the Set.
 */
function size() {
  return this.length;
}

/**
 * Add a value (number or Set/Array) to the Set.
 *
 * To add multiple values at once, use union().
 *
 * @param {Number|Array|Set} Member to add
 * @return {Set} Updated Set
 */
function add(member) {
  if((member = Set.toMember(member)) === false) {
    throw new Error("Element you're trying to add is not a valid member.");
  }
  
  //add the element if it doesn't yet exist
  if(!this.has(member)) {
    this[this.length] = member;
  }

  return this;
}

/**
 * Remove a value (number or Set/Array) from this Set.
 *
 * @param {Number|Array} Value to remove from set
 * @return {Set} Updated Set
 */
function remove(member) {
  if((member = Set.toMember(member)) === false) {
    throw new Error("Element you're trying to add is not a valid member.");
  }
  var index = numbers.util.inArray(member, this);
  
  if(index !== -1) {
    this.splice(index, 1);
  }

  return this;
};

/**
 * Create a copy of the Set.
 *
 * @return {Set} an exact copy of this set.
 */
function clone() {
  return numbers.util.cloneArray(this);
};

/**
 * Remove all the Set functionality to get back a plain Array
 * 
 * Sets extend Arrays so usually you can just pass a Set to a 
 * 3rd-party library and it'll work like an Array. But, occasionally,
 * the methods added to the Array to make it behave like a Set 
 * confuse the other library. This method removes all those Set 
 * methods, but the object returned is the same one (===) in memory.
 * 
 * @return {Array} The same object with all its Set methods removed.
 */
function toPlainArray() {
  for(var method in setMethods) {
    delete this[method];
  }
  
  this.constructor = Array;
} 

/**
 * Add any elements from B that are not already in this set.
 * (A | B)
 *
 * @param {Set|Array} the set or data to create a set from
 * @return {Set} Updated Set
 */
function union(B) {
  if ((B = Set.toSet(B)) === false) {
    throw new Error("B must be a set or an array.");
  }

  for(var i=0, len = B.length; i<len; i++) {
    this.add(B[i]);
  }

  return this;
};

/**
 * Removes from this set all elements that are in Set B.
 * (A - B)
 *
 * @param {Set|Array} the set or data to create a set from
 * @return {Set} Updated Set
 */
function difference(B) {
  if ((B = Set.toSet(B)) === false) {
    throw new Error("B must be a set or an array.");
  }

  for(var i=0, len = B.length; i<len; i++) {
    this.remove(B[i]);
  }

  return this;
};

/**
 * Determine if all values in B are in this set.
 *
 * @param {Set|Array} Set or array to compare
 * @return {Boolean} true for superset
 */
function isSuperSet(B) {
  if ((B = Set.toSet(B)) === false) {
    throw new Error("B must be a set or an array.");
  }

  for(var i=0, len = B.length; i<len; i++) {
    if(!this.has(B[i])) {
      return false;
    }
  }

  return true;
};

/**
 * Determine if all values in this set are in B.
 *
 * @param {Set|Array} Set B or array to create set from
 * @return {}
 */
function isSubSet(B) {
  if ((B = Set.toSet(B)) === false) {
    throw new Error("B must be a set or an array.");
  }

  for(var i=0, len = this.length; i<len; i++) {
    if(!B.has(this[i])) {
      return false;
    }
  }
 
  return true;
};

/**
 * Creates an updated set containing elements which are both in this and in B.
 * (A & B)
 *
 * @param {Set|Array} the set or data to create a set from
 * @return {Set} Updated Set
 */
function intersection(B) {
  if ((B = Set.toSet(B)) === false) {
    throw new Error("B must be a set or an array.");
  }

  var len = this.length;
  while(len--) {
    if(!B.has(this[len])) {
      this.splice(len, 1);
    }
  }
  
  return this;
};

/**
 * Update set to only include elements not in A and not in B.
 * (A | B) - (A & B)
 *
 * @param {Set|Array} the set or data to create a set from
 * @return {Set} Updated Set
 */
function symmetricDifference(B) {
  if ((B = Set.toSet(B)) === false) {
    throw new Error("B must be a set or an array.");
  }
  var BAdded = B.difference(this.clone().intersection(B));
  this.difference(this.clone().intersection(B));
  return this.union(BAdded);
};
