const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_CONDITION = [
  [0, 1, 2],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const board = document.getElementById("board");
const cellElement = document.querySelectorAll("[board-cell]");
const winningMessage = document.getElementById("winning-message");
const restartButton = document.getElementById("restartButton");
let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cellElement.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.classList.remove("forbidden");
    winningMessage.innerText = "TicTacToe";
    cell.addEventListener("click", clickHandler, { once: true });
  });
  setBoardHoverClass();
}

function clickHandler(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  //check win
  if (checkWin(currentClass)) {
    endGame(false);
  }
  swapTurns();
  setBoardHoverClass();
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_CONDITION.some((combination) => {
    return combination.every((index) => {
      return cellElement[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
  } else {
    winningMessage.innerText = `${circleTurn ? "O" : "X"} Wins!`;
  }
  cellElement.forEach((cell) => {
    cell.removeEventListener("click", clickHandler);
    cell.classList.add("forbidden");
  });
}
