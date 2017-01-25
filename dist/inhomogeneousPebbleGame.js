'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextMoveMatrix = nextMoveMatrix;

var _chai = require('chai');

var _Histogram = require('./Histogram.js');

var _Histogram2 = _interopRequireDefault(_Histogram);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * inhomogeneous detailed balance condition:
 * p(a -> b) = min(1, pi(a)/pi(b))
 *
 * method to generate the matrix of outcomes based on the transition probabilities
 * method to generate random weights for each square in grid -
 * method which determines whether can move to next pos based on detailed balance condition
 *
 * state representing total elements on each square in grid
 * state representing current position
 * state which is stationary probabilities per position
 * state which is the outcomes matrix
 * */

function generateWeights(boardSize, minWeight, maxWeight) {
  var diff = maxWeight - minWeight;
  var board = new Array(boardSize);

  var i = 0;
  for (; i < boardSize; i++) {
    board[i] = minWeight + Math.floor(diff * Math.random());
  }

  return board;
}

/**
 * returns the moves matrix
 * */
function nextMoveMatrix(boardSize) {
  var width = Math.sqrt(boardSize);

  _chai.assert.isNumber(boardSize, "must be a number");
  _chai.assert.equal(width, Math.round(width), "rounded value must be the same as original square root of boardSize");

  var board = new Array(boardSize);
  var currHeight = 0;

  var i = 0;
  for (; i < boardSize; i++) {
    //direction: 0, 1, 2, 3 --> N, E, S, W
    board[i] = [i + width < boardSize ? i + width : i, (i + 1) % width !== 0 ? i + 1 : i, i - width > -1 ? i - width : i, i % width !== 0 ? i - 1 : i];
  }

  return board;
}