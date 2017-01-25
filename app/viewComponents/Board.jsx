import React, { PropTypes, Component } from 'react';
import { assert } from 'chai';
import InhomogeneousPG from '../inhomogeneousPebbleGame.js';
import Cell from './Cell.jsx';


const { number, func } = PropTypes;
const propTypes = {
  size: number.isRequired,
  minWeight: number.isRequired,
  maxWeight: number.isRequired,
  timeout: number.isRequired,
  totalIterations: number.isRequired,
  resetState: func.isRequired,
};


export default class Board extends Component {
  constructor(props) {
    super(props);
    const {
      size,
      minWeight,
      maxWeight,
      timeout,
      totalIterations,
    } = props;

    this.pg = new InhomogeneousPG(
      size,
      minWeight,
      maxWeight,
      timeout,
      totalIterations
    );

    this.width = Math.sqrt(size);
    this.weights = this.pg.getWeights();

    this.state = {
      histogram: this.pg.getHistogram(),
      lastUpdatedIndex: this.pg.getPos(),
    };

    this.updateView = this.updateView.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentDidMount() {
    //kick off pebble game
    this.pg.run(this.updateView);
  }

  resetState() {
    this.pg.stop();
    this.props.resetState();
  }

  updateView(histogram, index) {
    this.setState({
      histogram,
      lastUpdatedIndex: index,
    });
  }

  render() {
    const { totalIterations } = this.props;
    const {
      histogram,
      lastUpdatedIndex,
    } = this.state;

    let board = new Array(this.width);
    let index = 0;

    let i=0;
    for (; i < this.width; i++) {
      let j=0;
      let width = new Array(this.width);
      for (; j < this.width; j++) {
          index = i*this.width+j;
          width[j] = (
            <Cell
              key={ `cell-${index}` }
              value={ histogram[index]/totalIterations }
              weight={ this.weights[index] }
              shouldHighlight={ index === lastUpdatedIndex }
            />
          );
      }

      board[i] = <tr key={ `row-${i}` }>{ width }</tr>;
    }

    return (
      <div>
        <button className="reset-btn" onClick={ this.resetState }>Reset</button>
        <table><tbody>{ board }</tbody></table>
      </div>
    );
  }
}

Board.propTypes = propTypes;
