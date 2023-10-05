import React, { useState } from "react";
import Board from "./Board";
import styles from "./TicTacToePage.module.css";

// TODO: needs a restart button

// TODO: I'm putting this here, because I want it calculated just once.
// If it goes in the component, it'll get called several times.
// I think each time the component is rerendered?
// However, I don't like that it's global.
// I could useEffect(){}[], to make it happen just once,
// but is that an appropriate use of useEffect?
// Or useMemo?

// Check for a complete line vertically, horizontally, and diagonally.
// Each array contains the indicies of the boxes we want to check.
const lines = [    // diagonal lines
  [0, 4, 8],
  [2, 4, 6],
];
[0, 3, 6].forEach(j => {    // horizontal lines
  let arr = [0, 1, 2].map(i => i + j);
  lines.push(arr);
});
[0, 1, 2].forEach(j => {    // vertical lines
  let arr = [0, 3, 6].map(i => i + j);
  lines.push(arr);
});
console.log(lines);

const getWinner = (boxes) => {
  for (let line of lines) {
    const [x, y, z] = line.map((i) => boxes[i]);
    if (x && x === y && y === z) {
      return x;
    }
  }
  return null;
};

// TODO: Is it better to put this function inside the component,
// just outside the component, or in an external file?
const getMessage = (boxes, currentPlayer) => {
  let winner = getWinner(boxes);
  if (winner) {
    return winner + " wins!";
  } else {
    return currentPlayer + "'s turn";
  }
};

export default function TicTacToePage() {
  const [boxes, setBoxes] = useState(new Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const onBoxClick = (i) => {
    // if the game is over or the box is already filled, then return
    if (getWinner(boxes) || boxes[i]) {
      return;
    }
    
    // record the marked box
    boxes[i] = currentPlayer;
    setBoxes(boxes);

    let nextPlayer = (currentPlayer === "X") ? "O" : "X";

    /* TODO: STUDY: This is not guaranteed to happen right away! */
    setCurrentPlayer(nextPlayer);
  };

  console.log("In TicTacToePage");

  return (
    <div className={styles.page}>
      <h1>Tic Tac Toe</h1>
      <div className={styles.message}>{getMessage( boxes, currentPlayer)}</div>
      <Board onClick={onBoxClick} boxes={boxes} />
    </div>
  );
}
