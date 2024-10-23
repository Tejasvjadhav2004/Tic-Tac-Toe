const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill('');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const updateStatus = () => {
    statusText.textContent = `Player ${currentPlayer}'s turn`;
};

const checkWin = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            break;
        }
    }
    return roundWon;
};

const checkDraw = () => {
    return !gameState.includes('');
};

const handleCellClick = (e) => {
    const clickedCellIndex = e.target.getAttribute('data-index');

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (checkDraw()) {
        statusText.textContent = 'Game is a draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
};

const restartGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    gameState = Array(9).fill('');
    cells.forEach(cell => (cell.textContent = ''));
    updateStatus();
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

updateStatus();
