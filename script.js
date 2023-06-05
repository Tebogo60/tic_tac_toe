const innerBoard = document.querySelectorAll(".inner-board");
const startBg = document.querySelector(".bg-start");
const startBtn = document.querySelector(".start-btn");
const playerBoard = document.querySelector(".player-board");

let currentPlayer = "p1";
const possibleWins = ["123", "456", "789", "159", "147", "258", "369"];
let playedPosition = [];
let p1Positions = [];
let p2Positions = [];
let winOrNot = [];

startBtn.addEventListener("click", () => {
  reset();
  playerBoard.classList.remove("display");
  playerBoard.innerHTML = "Player 1 - [X]";
});

// For each innerBoard clicked, add the position to the player's position arr!
innerBoard.forEach((e) => {
  e.addEventListener("click", () => {
    if (playedPosition.includes(e.id)) {
      return;
    } else {
      playedPosition.push(e.id);

      if (currentPlayer === "p1") {
        p1Positions.push(e.id);
        checkForTurn();

        if (checkForWin(p1Positions) === true) {
          playerBoard.innerHTML = "Player 1 Wins";
          reset();
        }
        Positioning();
        return;
      }

      if (currentPlayer === "p2") {
        p2Positions.push(e.id);
        checkForTurn();

        if (checkForWin(p2Positions) === true) {
          playerBoard.innerHTML = "Player 2 Wins";
          reset();
        }
        Positioning();
        return;
      }
    }
  });
});

// display Which player won!
const checkForTurn = () => {
  if (currentPlayer === "p1") {
    currentPlayer = "p2";
    playerBoard.innerHTML = "Player 1 - [X]";
  } else {
    currentPlayer = "p1";
    playerBoard.innerHTML = "Player 2 - [O]";
  }
};

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

// This function checks for a draw
const checkForDraw = () => {
  if (playedPosition.length === 9) {
    reset();
    startBg.classList.remove("display");
    playerBoard.innerHTML = "Draw :(";
  }
};

// Checking if player has wining positioning
const checkForWin = (arr) => {
  for (let i = 0; i < possibleWins.length; i++) {
    for (let j = 0; j < possibleWins[i].length; j++) {
      for (let k = 0; k < arr.length; k++) {
        if (possibleWins[i].includes(arr[k])) {
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
  checkForDraw();
};

// Resetting the entire board
const reset = () => {
  currentPlayer = "p1";
  playedPosition = [];
  p1Positions = [];
  p2Positions = [];

  innerBoard.forEach((e) => {
    e.classList.remove("circle");
    e.classList.remove("cross");
  });

  startBg.classList.toggle("display");
};
