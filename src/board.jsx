import React from "react";
import PropTypes from "prop-types";
import Square from "./square";

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        winner={this.props.winners ? this.props.winners.includes(i) : false}
      />
    );
  }

  render() {
    let board = [];
    for (let i = 0; i < 3; i++) {
      let squares = [];
      for(let j = 0; j < 3; j++){
        squares.push(this.renderSquare(j + (i * 3)));
      }
      board.push(<div className= "board-row">{squares}</div>);
    }
    return (<div>
      { board }
    </div>);
  }
  static propTypes = {
    squares: PropTypes.array,
    onClick: PropTypes.func,
    winners: PropTypes.array,
  };
  static defaultProps = {
    winners: [],
  };
}

export default Board;
