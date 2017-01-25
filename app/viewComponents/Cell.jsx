import React, { PropTypes, Component } from 'react';
import { colorScale } from '../ColorUtil.js';


const { number, bool } = PropTypes;
const propTypes = {
  value: number.isRequired,
  weight: number.isRequired,
  shouldHighlight: bool.isRequired,
};


export default class Cell extends Component {
  getCellStyle(value, shouldHighlight) {
    const color = shouldHighlight ? '#c0c446' : 'white';
    return {
      border: `2px solid ${color}`,
      background: colorScale(value),
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
        <span className="cell-weight">{ weight }</span>
      </td>
    );
  }
}

Cell.propTypes = propTypes;
