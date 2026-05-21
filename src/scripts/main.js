'use strict';
import Game from '../modules/Game.class';

// Рандомити місце положення початкове цифорок
// console.log(Game);
const game = new Game();

// Write your code here
const gameField = document.querySelector('.game-field');
const start = document.querySelector('.start');
const startMessage = document.querySelector('.message-start');
// const winMessage = document.querySelector('.message-win');
// const loseMessage = document.querySelector('.message-lose');

start.addEventListener('click', (e) => {
  game.start();
  startMessage.classList.add('hidden');

  const state = game.getState();

  renderRows(state);
});
// ArrowRight;
// ArrowDown
// ArrowDown;
//  ArrowLeft

function renderRows(state) {
  state.forEach((rows, i) => {
    rows.forEach((rowValue, j) => {
      const cell = gameField.rows[i].cells[j];

      if (rowValue !== 0) {
        cell.textContent = rowValue;
        cell.className = `field-cell field-cell--${rowValue}`;
      } else {
        cell.textContent = '';
        cell.className = 'field-cell';
      }
    });
  });
}

function handleInput(e) {
  const gameStatus = game.getStatus();

  if (gameStatus !== 'playing') {
    return;
  }

  let isValidKey = true;

  switch (e.code) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
    default:
      isValidKey = false;
  }

  const gameState = game.getState();

  if (isValidKey) {
    e.preventDefault();
    renderRows(gameState);
  }
}

document.addEventListener('keydown', handleInput);
