import React, { Component } from 'react';
import Board from './Board.jsx';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      size: null,
      minWeight: null,
      maxWeight: null,
      timeout: null,
      totalIterations: null,
    };

    this.setProperties = this.setProperties.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  canRenderBoard(state) {
    const s = state || this.state;
    let key;
    for (key in s) {
      if (typeof s[key] !== "number") {
        return false;
      }
    }
    return true;
  }

  resetState() {
    this.setState({
      size: null,
      minWeight: null,
      maxWeight: null,
      timeout: null,
      totalIterations: null,
    });
  }

  setProperties(event) {
    event.preventDefault();
    const size = Number(this.refs.boardsize.value);
    const minWeight = Number(this.refs.minweight.value);
    const maxWeight = Number(this.refs.maxweight.value);
    const timeout = Number(this.refs.timeout.value);
    const totalIterations = Number(this.refs.totaliter.value);

    const nextState = {
      size,
      minWeight,
      maxWeight,
      timeout,
      totalIterations,
    };

    if (this.canRenderBoard(nextState)) {
      this.refs.boardsize = "";
      this.refs.minweight = "";
      this.refs.maxweight = "";
      this.refs.timeout = "";
      this.refs.totaliter = "";

      this.setState(nextState);
    }

  }

  render() {
    const {
      size,
      minWeight,
      maxWeight,
      timeout,
      totalIterations,
    } = this.state;
    const canRender = this.canRenderBoard();

    return (
      <div id="app-container">
        { !canRender &&
          <form>
            <div>
              board size: <input type="text" ref="boardsize" defaultValue="9" placeholder="must be a perfect square"/>
            </div>
            <div>
              min weight: <input type="text" ref="minweight" defaultValue=".1" placeholder="smallest weight for any cell"/>
            </div>
            <div>
              max weight: <input type="text" ref="maxweight" defaultValue="10" placeholder="largest weight for any cell"/>
            </div>
            <div>
              timeout (ms): <input type="text" ref="timeout" defaultValue="100" placeholder="time taken per iteration"/>
            </div>
            <div>
              total iterations: <input type="text" defaultValue="1000" ref="totaliter" placeholder="total number of times to run simulation"/>
            </div>
            <button onClick={ this.setProperties }>Run Simulation</button>
          </form>
        }
        { canRender &&
          <Board
            resetState={ this.resetState }
            size={ size }
            minWeight={ minWeight }
            maxWeight={ maxWeight }
            timeout={ timeout }
            totalIterations={ totalIterations }
          /> }
      </div>
    );
  }

}
