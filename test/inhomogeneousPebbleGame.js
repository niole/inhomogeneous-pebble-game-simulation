var chai = require('chai');
var InhomogeneousPG = require('../dist/inhomogeneousPebbleGame.js');
var assert = chai.assert;

//TODO these are broken

describe('inhomogeneousPebbleGame', function() {
  var _3 = new InhomogeneousPG(9, 1, 5, 100, 1);
  var _4 = new InhomogeneousPG(16, 1, 5, 100, 1);

  describe('#_generateTransitionMatrix', function() {
    var expectedThreexThree = [
      [3, 1, 0, 0],
      [4, 2, 1, 0],
      [5, 2, 2, 1],
      [6, 4, 0, 3],
      [7, 5, 1, 3],
      [8, 5, 2, 4],
      [6, 7, 3, 6],
      [7, 8, 4, 6],
      [8, 8, 5, 7]
    ];

    var expectedFourxFour = [
      [4,1,0,0],
      [5,2,1,0],
      [6,3,2,1],
      [7,3,3,2],
      [8,5,0,4],
      [9,6,1,4],
      [10,7,2,5],
      [11,7,3,6],
      [12,9,4,8],
      [13,10,5,8],
      [14,11,6,9],
      [15,11,7,10],
      [12,13,8,12],
      [13,14,9,12],
      [14,15,10,13],
      [15,15,11,14]
    ];

    it('should make correct matrix for 3x3 board', function() {
      var actual = _3._generateTransitionMatrix(9);

      assert.deepEqual(actual, expectedThreexThree, "should be the same");
    });

    it('should make correct matrix for 4x4 board', function() {
      var actual = _4._generateTransitionMatrix(16);

      assert.deepEqual(actual, expectedFourxFour, "should be the same");
    });

  });
});

