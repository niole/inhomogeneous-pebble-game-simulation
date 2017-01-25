import React, { Component } from 'react';


export default class Cell extends Component {
  render() {
    return (
      <td>
        { this.props.value }
      </td>
    );
  }
}
