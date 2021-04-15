import React from "react";
import PropTypes from "prop-types";
const Square = (props) => {
  return (
    <button
      className="square"
      onClick={props.onClick}
      style={props.winner ? { color: "green" } : { color: "black" }}
    >
      {props.value}
    </button>
  );
};
Square.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  winner: PropTypes.bool
};
export default Square;
