import React, { Component } from 'react';
import { assert } from 'chai';
import InhomogeneousPG from '../inhomogeneousPebbleGame.js';
import Cell from './Cell.jsx';


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

    this.width = Math.sqrt(size);

    this.pg = new InhomogeneousPG(
      size,
      minWeight,
      maxWeight,
      timeout,
      totalIterations
    );

    this.state = {
      histogram: this.pg.getHistogram(),
    };

    this.updateView = this.updateView.bind(this);
  }

  componentDidMount() {
    //kick off pebble game
    this.pg.run(this.updateView);
  }

  updateView(histogram) {
    this.setState({ histogram });
  }

  render() {
    const { histogram } = this.state;

    let board = new Array(this.width);
    let index = 0;

    let i=0;
    for (; i < this.width; i++) {
      let j=0;
      let width = new Array(this.width);
      for (; j < this.width; j++) {
          index = i*this.width+j;
          width[j] = <Cell key={ `cell-${index}` } value={ histogram[index] }/>;
      }

      board[i] = <tr key={ `row-${i}` }>{ width }</tr>;
    }

    return <table><tbody>{ board }</tbody></table>;
  }
}
