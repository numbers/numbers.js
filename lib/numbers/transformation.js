var transformation = exports;

/**
 * Rotate a two dimensional vector by degree.
 *
 * @param {Array} point 
 * @param {Number} degree
 * @param {String} direction - clockwise or counterclockwise
 * @return {Array} vector
 */
transformation.rotate = function (point, degree, direction) {
  if (point.length === 2) {
    var negate = direction === "clockwise" ? -1 : 1;
    var radians = degree * (Math.PI / 180);

    var transformation = [
      [Math.cos(radians), -1*negate*Math.sin(radians)],
      [negate*Math.sin(radians), Math.cos(radians)]
    ];

    return matrix.multiply(transformation, point);
  } else {
    throw new Error("Only two dimensional operations are supported at this time");
  }
};

/**
 * Scale a two dimensional vector by scale factor x and scale factor y.
 *
 * @param {Array} point 
 * @param {Number} sx
 * @param {Number} sy
 * @return {Array} vector
 */
transformation.scale = function (point, sx, sy) {
  if (point.length === 2) {

    var transformation = [
      [sx, 0],
      [0, sy]
    ];

    return matrix.multiply(transformation, point);
  } else {
    throw new Error("Only two dimensional operations are supported at this time");
  }
};

/**
 * Shear a two dimensional vector by shear factor k.
 *
 * @param {Array} point 
 * @param {Number} k
 * @param {String} direction - xaxis or yaxis
 * @return {Array} vector
 */
transformation.shear = function (point, k, direction) {
  if (point.length === 2) {
    var xplaceholder = direction === "xaxis" ? k : 0;
    var yplaceholder = direction === "yaxis" ? k : 0;

    var transformation = [
      [1, xplaceholder],
      [yplaceholder, 1]
    ];

    return matrix.multiply(transformation, point);
  } else {
    throw new Error("Only two dimensional operations are supported at this time");
  }
};

/**
 * Perform an affine transformation on the given vector.
 *
 * @param {Array} point 
 * @param {Number} tx
 * @param {Number} ty
 * @return {Array} vector
 */
transformation.affine = function (point, tx, ty) {
  if (point.length === 2) {

    var transformation = [
      [1, 0, tx],
      [0, 1, ty],
      [0, 0, 1 ]
    ];

    var newpoint = [
      [point[0][0]],
      [point[1][0]],
      [1]
    ];

    var transformed = matrix.multiply(transformation, newpoint);
    return [
      [transformed[0][0]],
      [transformed[1][0]],
    ];

  } else {
    throw new Error("Only two dimensional operations are supported at this time");
  }
};
