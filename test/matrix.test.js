var assert = require('assert');
var numbers = require('../index.js');
var matrix = numbers.matrix;

suite('numbers', function() {

  console.log('\n\n\033[34mTesting Matrix Mathematics\033[0m');

  test('should return a new matrix that has a scaled row for the rowScale function', function(done) {
    var m = [
      [0, 1, 2],
      [3, -1, 5],
      [1, 2, 5]
    ];

    var expected1 = [
      [0, 0, 0],
      [3, -1, 5],
      [1, 2, 5]
      ];
    var res1 = matrix.rowScale(m,0,0);

    assert.deepEqual(res1,expected1);


    var expected2 = [
      [0, 1, 2],
      [-6, 2, -10],
      [1, 2, 5]
      ];
    var res2 = matrix.rowScale( m , 1 , -2 );

    assert.deepEqual( res2 , expected2 );


    done();
  });

   

  test('should return a new matrix that has rows changed with the rowSwitch function', function(done) {
    var m = [
      [0, 1, 2],
      [3, -1, 5],
      [1, 2, 5]
    ];

    var expected1 = [
      [3, -1, 5],
      [0, 1, 2],
      [1, 2, 5]
      ];
    var res1 = matrix.rowSwitch(m,0,1);

    assert.deepEqual(res1,expected1);


    var res2 = matrix.rowScale(m,1,1);

    assert.deepEqual(res2,m);

    
    done();
  });

  test('should return a new matrix that has a multiple of one row added to another using the rowAddMultiple function', function(done) {
    var m = [
      [0, 1, 2],
      [3, -1, 5],
      [1, 2, 5]
    ];

    var expected1 = [
      [0, 1, 2],
      [3, 1, 9],
      [1, 2, 5]
      ];
    var res1 = matrix.rowAddMultiple(m,0,1,2);

    assert.deepEqual(res1,expected1);


    var res2 = matrix.rowScale(m,1,1,0);

    assert.deepEqual(res2,m);

    
    done();
  });

});
