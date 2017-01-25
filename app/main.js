import React from 'react';
import ReactDOM from 'react-dom';
import Board from './viewComponents/Board.jsx';


document.addEventListener("DOMContentLoaded", () => {
  console.log('loaded');
  ReactDOM.render(
    <Board
      size={ 9 }
      minWeight={ .25 }
      maxWeight={ 5 }
      timeout={ 100 }
      totalIterations={ 1000 }
    />,
    document.getElementById('app')
  );
});
