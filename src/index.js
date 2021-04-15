import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Board from "./board.jsx";
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      lastMove: [],
      sortAscending: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const lastMove = this.state.lastMove.concat(i);
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      lastMove: lastMove,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
      lastMove: this.state.lastMove.slice(0, step),
    });
  }
  sortMoves(){
    this.setState({
      sortAscending: !this.state.sortAscending
    });
    const sortBtn = document.getElementById('sortBtn');
    sortBtn.textContent = this.state.sortAscending ? '⬆️' : '⬇️'; 
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      let movePos = move ? this.state.lastMove[move - 1] : 0;
      const movePosColRow = {
        col: movePos % 3,
        row: Math.floor(movePos / 3),
      };
      const desc = move
        ? `Go to move # ${move} (${movePosColRow.col},${movePosColRow.row})`
        : "Go to game start";
      if (!(isNaN(movePosColRow.col) || isNaN(movePosColRow.row))) {
        return (
          <li key={move}>
            <button
              onClick={() => this.jumpTo(move)}
              style={
                move === history.length - 1
                  ? { fontWeight: "bold" }
                  : { fontWeight: "normal" }
              }
            >
              {desc}
            </button>
          </li>
        );
      } else return null;
    });
    const movesReversed = this.state.sortAscending ? moves : [...moves].reverse();
    
    let status;
    if (winner) {
      status = "Winner: " + current.squares[winner[0]];
    } else if (!winner && movesReversed.length > 9 ){
      status = "Match Nul";
    }else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winners={winner}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{movesReversed}</ol>
        </div>
        <div className="sort">
          <button id = "sortBtn" onClick ={() => this.sortMoves()}>⬇️</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a,b,c];
    }
  }
  return null;
}
