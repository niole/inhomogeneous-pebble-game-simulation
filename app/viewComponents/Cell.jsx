import React, { PropTypes, Component } from 'react';
import {
  scaleLinear,
  interpolateHcl,
  rgb,
} from 'd3';


const { number, bool } = PropTypes;
const propTypes = {
  value: number.isRequired,
  weight: number.isRequired,
  shouldHighlight: bool.isRequired,
};


export default class Cell extends Component {
  constructor() {
    super();
      this.colorScale = scaleLinear().domain([0, 1])
            .interpolate(interpolateHcl)
            .range([rgb("#007AFF"), rgb('#FFF500')]);
  }

  getCellStyle(value, shouldHighlight) {
    const color = shouldHighlight ? '#c0c446' : 'white';
    return {
      border: `2px solid ${color}`,
      background: this.colorScale(value),
    };
  }

  render() {
    const {
      value,
      weight,
      shouldHighlight,
    } = this.props;

    return (
      <td style={ this.getCellStyle(value, shouldHighlight) }>
        { weight }
      </td>
    );
  }
}

Cell.propTypes = propTypes;
