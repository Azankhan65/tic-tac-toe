const board = document.getElementById('board');
const cells = Array.from(board.getElementsByClassName('cell'));
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X'; 
let gameBoard = Array(9).fill(null); 
let gameActive = true;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Handle player move
function handleCellClick(index) {
  if (gameBoard[index] || !gameActive) return; 

  gameBoard[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  checkWinner();
  togglePlayer();
}

// Check if a player has won
function checkWinner() {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      statusDisplay.textContent = `${currentPlayer} Wins!🎉`;
      return;
    }
  }

  // Check if there's a draw 
  if (!gameBoard.includes(null)) {
    gameActive = false;
    statusDisplay.textContent = 'It\'s a Draw!';
  }
}

// Toggle between players
function togglePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (gameActive) {
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Reset the game
function resetGame() {
  gameBoard.fill(null);
  cells.forEach(cell => cell.textContent = '');
  gameActive = true;
  currentPlayer = 'X';
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});

resetButton.addEventListener('click', resetGame);

// Initialize status display
statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
