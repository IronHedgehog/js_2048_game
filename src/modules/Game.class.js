'use strict';

/**
 * This class represents the game.
 * Now it has a basic structure, that is needed for testing.
 * Feel free to add more props and methods if needed.
 */
export default class Game {
  score = 0;
  bestScore = 0;
  init = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  /**
   * Creates a new game instance.
   *
   * @param {number[][]} initialState
   * The initial state of the board.
   * @default
   * [[0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0]]
   *
   * If passed, the board will be initialized with the provided
   * initial state.
   */
  constructor(state = this.init, gameStatus = 'idle') {
    // eslint-disable-next-line no-console
    this.state = state;
    this.gameStatus = gameStatus;
  }

  moveLeft() {
    return this.moveLineLogic(false, false);
  }
  moveRight() {
    return this.moveLineLogic(false, true);
  }
  moveUp() {
    return this.moveLineLogic(true, false);
  }
  moveDown() {
    return this.moveLineLogic(true, true);
  }

  /**
   * @returns {number}
   */
  getScore() {
    return this.score;
  }

  /**
   * @returns {number[][]}
   */
  getState() {
    return this.state;
  }

  /**
   * Returns the current game status.
   *
   * @returns {string} One of: 'idle', 'playing', 'win', 'lose'
   *
   * `idle` - the game has not started yet (the initial state);
   * `playing` - the game is in progress;
   * `win` - the game is won;
   * `lose` - the game is lost
   */
  getStatus() {
    return this.gameStatus;
  }

  /**
   * Starts the game.
   */
  start() {
    this.gameStatus = 'playing';
    this.score = 0;

    this.state = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 2, 2],
    ];

    return 'start game';
  }

  /**
   * Resets the game.
   */
  restart() {
    this.bestScore = this.score;
    this.start();
  }

  // Add your own methods here

  moveLine(line, isReversed) {
    let reversed = isReversed ? [...line].reverse() : [...line];

    reversed = reversed.filter((val) => val !== 0);

    for (let j = 0; j < reversed.length - 1; j++) {
      if (reversed[j] === reversed[j + 1]) {
        reversed[j] *= 2;
        this.score += reversed[j];
        reversed.splice(j + 1, 1);
      }
    }

    while (reversed.length < 4) {
      reversed.push(0);
    }

    return isReversed ? reversed.reverse() : reversed;
  }

  //   Алгоритмічна стратегія:

  // Транспонування матриці — це операція, яка віддзеркалює багатовимірний масив
  // відносно його головної діагоналі.
  // Перший рядок стає першим стовпцем, другий рядок
  //  стає другим стовпцем і так далі.

  transpose(state) {
    return state[0].map((_, colIndex) => state.map((row) => row[colIndex]));
  }

  moveLineLogic(isVertical, isReversed) {
    const saveState = this.state.toString();

    const workingState = isVertical ? this.transpose(this.state) : this.state;

    for (let i = 0; i < workingState.length; i++) {
      workingState[i] = this.moveLine(workingState[i], isReversed);
    }

    this.state = isVertical ? this.transpose(workingState) : workingState;

    return saveState !== this.state.toString();
  }
}
