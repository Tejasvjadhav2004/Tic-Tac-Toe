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
    statusText.textContent = i18next.t(currentPlayer === 'X' ? 'turnX' : 'turnO');
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
        statusText.textContent = i18next.t(`win${currentPlayer}`);
        gameActive = false;
    } else if (checkDraw()) {
        statusText.textContent = i18next.t('draw');
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
    statusText.textContent = ''; 
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);


const resources = {
    en: {
        translation: {
            "welcome": "Welcome to Tic-Tac-Toe",
            "createdBy": "Made by COEP Tech",
            "player1": "Player 1 (X)",
            "player2": "Player 2 (O)",
            "turnX": "Player X's turn",
            "turnO": "Player O's turn",
            "winX": "Player X wins!",
            "winO": "Player O wins!",
            "draw": "Game is a draw!",
            "Restart": "Restart"
        }
    },
    es: {
        translation: {
            "welcome": "Bienvenido a Tic-Tac-Toe",
            "createdBy": "Hecho por COEP Tech",
            "player1": "Jugador 1 (X)",
            "player2": "Jugador 2 (O)",
            "turnX": "Turno de Jugador X",
            "turnO": "Turno de Jugador O",
            "winX": "¡Jugador X gana!",
            "winO": "¡Jugador O gana!",
            "draw": "¡El juego es un empate!",
            "Restart": "Reiniciar"
        }
    },
    fr: {
        translation: {
            "welcome": "Bienvenue à Tic-Tac-Toe",
            "createdBy": "Fait par COEP Tech",
            "player1": "Joueur 1 (X)",
            "player2": "Joueur 2 (O)",
            "turnX": "Tour de Joueur X",
            "turnO": "Tour de Joueur O",
            "winX": "Joueur X gagne !",
            "winO": "Joueur O gagne !",
            "draw": "Le jeu est un match nul !",
            "Restart": "Redémarrer"
        }
    }
};

i18next.init({
    lng: 'en', // Default language
    debug: true,
    resources: resources
}, function (err, t) {
    updateContent();
});

function updateContent() {
    document.querySelector('h1').textContent = i18next.t('welcome');
    document.querySelector('h3').textContent = i18next.t('createdBy');
    document.getElementById('player1').textContent = i18next.t('player1');
    document.getElementById('player2').textContent = i18next.t('player2');
    document.getElementById('restartBtn').textContent = i18next.t('Restart');
    updateStatus(); 
}

function changeLanguage(lng) {
    i18next.changeLanguage(lng, () => {
        updateContent();
    });
}

window.changeLanguage = changeLanguage;
updateStatus();
