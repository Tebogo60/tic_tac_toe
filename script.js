const innerBoard = document.querySelectorAll(".inner-board");

let currentPlayer = "p1";
const positionWins = ["123", "456", "789", "159", "147", "258", "369"];
const playedPosition = [];
const p1Positions = [];
const p2Positions = [];
let winOrNot = [];

innerBoard.forEach((e) => {
  e.addEventListener("click", () => {
    if (playedPosition.includes(e.id)) {
      return;
    }

    playedPosition.push(e.id);

    if (currentPlayer === "p1") {
      e.classList.add("cross");

      p1Positions.push(e.id);
      currentPlayer = "p2";

      if (checkForWin(p1Positions) === true) {
        console.log("Player 1 wins");
        reset();
      }
      return;
    }

    if (currentPlayer === "p2") {
      e.classList.add("circle");

      p2Positions.push(e.id);
      currentPlayer = "p1";

      if (checkForWin(p2Positions) === true) {
        console.log("Player 2 wins");
        reset();
      }
      return;
    }
  });
});

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
