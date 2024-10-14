const board = document.querySelectorAll('.cell');
const winnerName = document.getElementById('winner-name');
const roundCount = document.getElementById('round-count');
const restartBtn = document.getElementById('restart-btn');

let currentPlayer = 'X';
let round = 1;
let gameActive = true;
let gameState = Array(9).fill(''); // Игровое поле, пустое на старте

// Победные комбинации
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

// Обработка клика на ячейку
board.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        gameActive = false;
        winnerName.textContent = currentPlayer + " победил!";
    } else if (!gameState.includes('')) {
        winnerName.textContent = "Ничья!";
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

// Кнопка перезапуска
restartBtn.addEventListener('click', restartGame);

function restartGame() {
    gameState = Array(9).fill('');
    board.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    round++;
    roundCount.textContent = round;
    winnerName.textContent = '-';
    gameActive = true;
}
