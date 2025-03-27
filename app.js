let board;
let turn;
let winner;
let tie;

const squareEls = document.querySelectorAll(".square");
const messageEl = document.querySelector("#message");

console.log(squareEls);
console.log(messageEl);

function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;
  console.log("Game Initialized");
  render();
}
init();

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((cell, index) => {
    const square = squareEls[index];
    square.textContent = cell;
  });
}

function updateMessage() {
  if (!winner && !tie) {
    messageEl.textContent = `Player ${currentPlayer} turn`;
  } else if (tie) {
    messageEl.textContent = "It's a tie";
  } else {
    messageEl.textContent = `Congratulations, Player ${winner} wins`;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(event) {
  const squareIndex = parseInt(event.target.id, 10);
  if (board[squareIndex] !== "" || winner) return;
  placePiece(index);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
}

squareEls.forEach((square) => {
  square.addEventListener("click", handleClick);
});

function placePiece(index) {
  board[index] = turn;
  console.log(board);
}

function checkForWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
      console.log("Winner found");
      return;
    }
  }
}

function checkForTie() {
  if (winner) return;
  if (board.includes("")) {
    tie = false;
  } else {
    tie = true;
    console.log("It's a tie");
  }
}

function switchPlayerTurn() {
  if (winner) return;
  turn = turn === "X" ? "O" : "X";
  console.log(`It's ${turn} turn`);
}
render();

const resetBtnEl = document.getElementById("reset");
resetBtnEl.addEventListener("click", init);
