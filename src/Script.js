/**
 * DOM OBJECTS
 */
const $boardGame = document.querySelector('.board-container');
const $statusGame = document.querySelector('.status-game');
const $restartButton = document.querySelector('.btn-restart');

// Array creado para verificaciones con el tablero
const GAME_STATE = ['', '', '', '', '', '', '', '', ''];
// Array creado para posibles combinaciones de victoria
/* eslint-disable-next-line no-unused-vars */
const WINNING_POS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

/**
 * This function returns a number betwenn 1 to 100
 */
const RANDOM_NUMBER = () => {
    let random = Math.floor(Math.random() * 100);
    return random;
};

/**
 * This Two function returns messages for the game
 */

/* eslint-disable-next-line no-unused-vars */
const WINNING_MESSAGE = () => `The winner is ${currentPlayer}`;
/* eslint-disable-next-line no-unused-vars */
const DRAW_MESSAGE = () => '---): Draw :(---';
const TURN_MESSAGE = () => `Turn of ${currentPlayer}`;

// Variable used to identify our token (PLAYER)
let currentPlayer = RANDOM_NUMBER() > 50 ? 'X' : 'O';

/**
 * This is the main FUNCTION
 */
function main() {
    displayStatusDisplay(TURN_MESSAGE());
    listeners();
}

main();

function displayStatusDisplay(turn) {
    $statusGame.innerText = turn;
}

function listeners() {
    $boardGame.addEventListener('click', handleCellClick);
    $restartButton.addEventListener('click', handleRestartClick);
}

function handleCellClick(e) {
    let $clickedCell = e.target;

    console.log($clickedCell);

    if ($clickedCell.classList.contains('board-cell')) {
        let clickedCellIndex = Array.from($clickedCell.parentNode.children).indexOf(
            $clickedCell
        );

        if (GAME_STATE[clickedCellIndex] !== '') {
            return;
        }

        handleMovePlayer();
    }
}

function handleMovePlayer() {
    /**
   * handleTurnPlayer();
   * handleBoard();
   */
}

function handleRestartClick() {}
