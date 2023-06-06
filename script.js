const innerBoard = document.querySelectorAll(".inner-board");
const startBg = document.querySelector(".bg-start");
const startBtn = document.querySelector(".start-btn");
const playerBoard = document.querySelector(".player-board");
const scoreBoard = document.querySelector(".score-board");

const possibleWins = ["123", "456", "789", "159", "147", "258", "369", "357"];
let playedPosition = [];
let p1Positions = [];
let p2Positions = [];
let winOrNot = [];
let p1Score = [];
let p2Score = [];

// Start Game func
startBtn.addEventListener("click", () => {
  reset();
  playerBoard.classList.remove("display");
  playerBoard.innerHTML = "Player 1 - [X]";
  scoreBoard.classList.remove("display");
});

// For each innerBoard clicked, add the position to the player's position arr!
innerBoard.forEach((e) => {
  e.addEventListener("click", () => {
    if (playedPosition.includes(e.id)) {
      return;
    } else {
      playedPosition.push(e.id);

      if (playerBoard.innerHTML === "Player 1 - [X]") {
        p1Positions.push(e.id);
        checkForTurn();

        if (checkForWin(p1Positions) === true) {
          playerBoard.innerHTML = `Player 1 Wins`;
          p1Score.push("win");
          keepScore();
          reset();
        }
        Positioning();
        return;
      } else {
        p2Positions.push(e.id);
        checkForTurn();

        if (checkForWin(p2Positions) === true) {
          playerBoard.innerHTML = `Player 2 Wins`;
          p2Score.push("win");
          keepScore();
          reset();
        }
        Positioning();
        return;
      }
    }
  });
});

// Display game score
const keepScore = () => {
  scoreBoard.innerHTML = `Player 1 [${p1Score.length} - ${p2Score.length}] Player 2`;
};

// display Which player won!
const checkForTurn = () => {
  if (playerBoard.innerHTML === "Player 1 - [X]") {
    playerBoard.innerHTML = "Player 2 - [O]";
  } else {
    playerBoard.innerHTML = "Player 1 - [X]";
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
  innerBoard.forEach((e) => {
    e.classList.remove("circle");
    e.classList.remove("cross");
  });

  playedPosition = [];
  p1Positions = [];
  p2Positions = [];
  startBg.classList.toggle("display");
};
