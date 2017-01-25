import { assert } from 'chai';
import Histogram from './Histogram.js';

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


export default class InhomogeneousPG  {
  constructor(size, minWeight, maxWeight, timeout, totalIterations) {
    this._hist = new Histogram(size);
    this._weights = this._generateWeights(size, minWeight, maxWeight);
    this._transitionMatrix = this._generateTransitionMatrix(size);
    this._pos = 0;
    this._timeout = timeout;
    this._remainingIterations = totalIterations;
    this.size = size;

    this.updateHistogram();
  }

  updateHistogram() {
    this._hist.inc(this.getPos());
  }

  decRemainingIterations() {
    this._remainingIterations -= 1;
  }

  getRemainingIterations() {
    return this._remainingIterations;
  }

  getTimeout() {
    return this._timeout;
  }

  run(callback) {
    //callback is for relaying data back to the visualization
    //callback will be executed on a timeout
    const self = this;

    if (this.getRemainingIterations()) {
      //run simulation again
      const nextPos = this.getNextPos();

      if (this.shouldMove(this.getPos(), nextPos)) {
        this.setPos(nextPos);
      }

      this.updateHistogram();

      setTimeout(() => {
        callback(self.getHistogram().get());
        self.decRemainingIterations();
        self.run(callback);
      }, this.getTimeout());

    }

  }

  getNextPos() {
    const neighbors = this.getNeighborsAt(this.getPos());
    return neighbors[Math.floor(Math.random()*neighbors.length)];
  }

  setPos(newPos) {
    this._pos = newPos;
  }

  getPos() {
    return this._pos;
  }

  getWeights() {
    return this._weights;
  }

  getWeightAt(index) {
    return this._weights[index];
  }

  shouldMove(from, to) {
    const transitionProb = Math.random();
    return transitionProb <= Math.min(this.getWeightAt(to)/this.getWeightAt(from), 1);
  }

  _generateWeights(boardSize, minWeight, maxWeight) {
    const diff = maxWeight - minWeight;
    let board = new Array(boardSize);

    let i=0;
    for (; i < boardSize; i++) {
      board[i] = minWeight+Math.floor(diff*Math.random());
    }

    return board;
  }

  getNeighborsAt(index) {
    assert.isTrue(index > -1 && index < this.size, "index must be in range");

    return this.getTransitionMatrix()[index];
  }

  getTransitionMatrix() {
    return this._transitionMatrix;
  }

  getHistogram() {
    return this._hist;
  }

  /**
   * returns the moves matrix
   * */
  _generateTransitionMatrix(boardSize) {
    const width = Math.sqrt(boardSize);

    assert.isNumber(boardSize, "must be a number");
    assert.equal(width, Math.round(width),
      "rounded value must be the same as original square root of boardSize");

    let board = new Array(boardSize);
    let currHeight = 0;

    let i=0;
    for (; i < boardSize; i++) {
      //direction: 0, 1, 2, 3 --> N, E, S, W
      board[i] = [
        i+width < boardSize ? i+width : i,
        (i+1)%width !== 0 ? i+1 : i,
        i-width > -1 ? i-width : i,
        i%width !== 0 ? i-1 : i
      ];
    }

    return board;
  }
}
