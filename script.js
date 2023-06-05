const innerBoard = document.querySelectorAll(".inner-board");

let currentPlayer = "p1";
const positionWins = ["123", "456", "789", "159", "147", "258", "369"];
const playedPosition = [];
const p1Positions = [];
const p2Positions = [];
let winOrNot = [];

// Foreach innerBoard clicked, add the position to the player's position arr!
innerBoard.forEach((e) => {
  e.addEventListener("click", () => {
    if (playedPosition.includes(e.id)) {
      return;
    }

    playedPosition.push(e.id);
    if (currentPlayer === "p1") {
      p1Positions.push(e.id);
      currentPlayer = "p2";

      if (checkForWin(p1Positions) === true) {
        console.log("Player 1 wins");
      }
      Positioning();
      return;
    }

    if (currentPlayer === "p2") {
      p2Positions.push(e.id);
      currentPlayer = "p1";

      if (checkForWin(p2Positions) === true) {
        console.log("Player 2 wins");
      }
      Positioning();
      return;
    }
  });
});

// Placing a symbols to the appropriate innerBoard
const Positioning = () => {
  innerBoard.forEach((e) => {
    if (p1Positions.includes(e.id)) {
      e.classList.add("cross");
    }
    if (p2Positions.includes(e.id)) {
      e.classList.add("circle");
    }
  });
};

// Checking if player has wining positioning
const checkForWin = (arr) => {
  for (let i = 0; i < positionWins.length; i++) {
    for (let j = 0; j < positionWins[i].length; j++) {
      for (let k = 0; k < arr.length; k++) {
        if (positionWins[i].includes(arr[k])) {
          winOrNot.push(true);
        }
      }
      if (winOrNot.length > 2) {
        winOrNot = [];
        return true;
      }
      winOrNot = [];
    }
  }
};

// Resetting the entire board
const reset = () => {
  currentPlayer = "p1";
  playedPosition = [];
  p1Positions = [];
  p2Positions = [];
  winOrNot = [];

  innerBoard.forEach((e) => {
    e.classList.remove("circle");
    e.classList.remove("cross");
  });
};
