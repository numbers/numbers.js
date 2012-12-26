var assert = require('assert');
var numbers = require('../index.js');
var matrix = numbers.matrix;
var Vector = numbers.linear.Vector;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Vector Type Mathematics\033[0m');

  test('map should also work on vectors', function(done) {
    var v = new Vector([6,8,10]);
    
    function cb(value, i) {
      return value*i;
    }
    
    v.map(cb);
    
    var res1 = [0,8,20];
    
    assert.deepEqual(v.getData(), res1);
    done();
  });

  test('should return dot product of two vectors', function(done) {
    var vectorA = new Vector([0, 1, 2, 3]);
    var vectorB = new Vector([-1, 2, 4, 6]);

    var res = vectorA.dotproduct(vectorB);

    assert.equal(28, res);
    done();
  });

  test('should calculate distance between two vectors', function(done) {
    var vectorA = new Vector([1,2,3]);
    var vectorB = new Vector([1,3,2]);
    var res = vectorA.distanceFrom(vectorB);
    assert.equal(Math.sqrt(2), res);
    
    var vectorAA = new Vector([1]);
    var vectorBB = new Vector([1]);
    var res = vectorAA.distanceFrom(vectorBB);
    assert.equal(0, res);
    
    var vectorAAA = new Vector([1,2,3,41]);
    var vectorBBB = new Vector([11,2,3,2]);
    var res = vectorAAA.distanceFrom(vectorBBB);
    assert.equal(Math.sqrt(1621), res);

    done();
  });

});
