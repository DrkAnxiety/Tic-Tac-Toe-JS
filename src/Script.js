/**
 * DOM OBJECTS
 */
const $boardGame = document.querySelector('.board')
const $statusGame = document.querySelector('.status-game')
const $restartButton = document.querySelector('.btn-restart')

/* Array creado para verificaciones con el tablero */
const GAME_STATE = [undefined || '', '', '', '', '', '', '', '', '']
/* Array creado para posibles combinaciones de victoria */
const WINNING_POS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

/**
 * This function returns a number betwenn 1 to 100
 */
const RANDOM_NUMBER = () => Math.floor(Math.random() * 100)

/**
 * This Two function returns messages for the game
 */

const WINNER_MESSAGE = () => `The winner is ${currentPlayer}`
const DRAW_MESSAGE = () => '---): Draw :(---'
const TURN_MESSAGE = () => `Turn of ${currentPlayer}`

// Variable used to identify our token (PLAYER)
let currentPlayer = RANDOM_NUMBER() > 50 ? 'X' : 'O'
let playing = true

/**
 * This is the main FUNCTION
 */
function main() {
  handleStatusDisplay(TURN_MESSAGE())
  listeners()
}

main()

function handleStatusDisplay(message) {
  $statusGame.innerText = message
}

function listeners() {
  $boardGame.addEventListener('click', handleCellClick)
  $restartButton.addEventListener('click', handleRestartClick)
}

function handleCellClick(e) {
  let $clickedCell = e.target

  if ($clickedCell.classList.contains('board-cell')) {
    let clickedCellIndex = Array.from($clickedCell.parentNode.children).indexOf(
      $clickedCell
    )

    if (GAME_STATE[clickedCellIndex] === '' && playing) {
      handleMovePlayer($clickedCell, clickedCellIndex)
      validationMove()
    } else if (!playing) {
      /* Hacer un modal que muestre juego termino y presentar el boton restart */
      console.log('Game Over, Restart to play again')
    } else {
      /* Hacer un modal que muestre el erro al presionar casilla ocupada */
      console.log('Busy')
    }
  }
}

function handleMovePlayer($cell, index) {
  GAME_STATE[index] = currentPlayer
  $cell.innerText = currentPlayer
}

function validationMove() {
  let winner = false

  for (let i = 0; i < WINNING_POS.length; i++) {
    let posOne = GAME_STATE[WINNING_POS[i][0]]
    let posTwo = GAME_STATE[WINNING_POS[i][1]]
    let posThree = GAME_STATE[WINNING_POS[i][2]]

    if (posOne === '' || posTwo === '' || posThree === '') continue

    if (posOne === posTwo && posTwo === posThree) {
      winner = !winner
      break
    }
  }

  if (winner) {
    handleStatusDisplay(WINNER_MESSAGE())
    playing = !playing
    return
  }

  let draw = GAME_STATE.includes('')

  if (!draw && playing) {
    handleStatusDisplay(DRAW_MESSAGE())
    playing = !playing
    return
  }

  handleTurnPlayer()
}

function handleTurnPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
  handleStatusDisplay(TURN_MESSAGE())
}

function handleRestartClick() {
  cleanBoard()
  currentPlayer = RANDOM_NUMBER() > 50? 'X' : 'O'
  playing = true
  handleStatusDisplay(TURN_MESSAGE())
}

function cleanBoard() {
  let i = 0

  while (i < GAME_STATE.length) {
    GAME_STATE[i] = ''
    $boardGame.children[i].innerText = ''
    i++
  }
}
