import React from "react";
import PropTypes from "prop-types";
import Square from "./square";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    // const boardSquares = () => {
    //   let boardRows = [];
    //   let squaresRow = Array(3).fill(null);
    //   // let temp;
    //   for (let i = 0; i < 3; i++) {
    //     squaresRow.map(() => {
    //       // el = this.renderSquare(i);
    //       return (<div>M</div>);
    //     });
    //     boardRows[i] = squaresRow;
    //     squaresRow = Array(3).fill(null);
    //   }
    //   return boardRows;
    // };
    // console.log(boardSquares());
    // return <div>{boardSquares()}</div>;
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
  static propTypes = {
    squares: PropTypes.array,
    onClick: PropTypes.func,
  };
}

export default Board;
