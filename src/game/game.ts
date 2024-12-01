import moment from 'moment';

import { drawBoard } from './renderer';
import {
  Board,
  clearFullRows,
  dropTetromino,
  getTetrominoCells,
  isTetrominoColliding,
} from './board';
import {
  getRandomTetromino,
  TetrominoDirection,
  TetrominoInstance,
} from './tetromino';
import { getRandomPieceColor } from './color';

const defaultBoard: Board = {
  sizeX: 10,
  sizeY: 20,
  cellSize: 30,

  activeTetromino: undefined,
  state: [],
  linesCleared: 0,
  score: 0,
  gameOver: false,

  drawDebugInfo: false,
} as const;

let gameIntervalId: number;
let timerIntervalId: number;

const getNewTetromino = (board: Board): TetrominoInstance => {
  const t = getRandomTetromino();
  return {
    ...t,
    x: Math.floor(board.sizeX / 2 - t.origin.x),
    y: board.sizeY,
    color: getRandomPieceColor(),
  };
};

const getScoreForClearedRows = (clearedRows: number) => {
  // prettier-ignore
  switch (clearedRows) {
    case 0: return 0;
    case 1: return 100;
    case 2: return 300;
    case 3: return 500;
    case 4: return 800;
  }

  throw new Error('Internal software error');
};

export const gameStart = (
  ctx: CanvasRenderingContext2D,
  linesTxt: HTMLSpanElement,
  timeTxt: HTMLSpanElement,
  scoreTxt: HTMLSpanElement,
) => {
  /*const soundTrack = new Audio(
      'https://ia802905.us.archive.org/11/items/TetrisThemeMusic/Tetris.mp3?cnt=0',
    );
    soundTrack.volume = 0.05;
    soundTrack.play();*/

  const gameStartTime = moment();

  const board: Board = structuredClone(defaultBoard);
  const gameSpeed = 500;

  drawBoard(ctx, board);

  const gameOver = () => {
    console.log('Game over');
    window.clearInterval(gameIntervalId);
    window.clearInterval(timerIntervalId);
  };

  const updateScoreUI = () => {
    linesTxt.innerHTML = board.linesCleared.toString();
    scoreTxt.innerHTML = board.score.toString();
  };

  const gameTick = () => {
    if (board.activeTetromino) {
      if (
        isTetrominoColliding(board, {
          ...board.activeTetromino,
          y: board.activeTetromino.y - 1,
        })
      ) {
        // Check for game over
        const cells = getTetrominoCells(board.activeTetromino);
        for (const cell of cells) {
          if (cell.y >= board.sizeY) {
            board.gameOver = true;
            gameOver();
            break;
          }
        }

        board.state.push(...cells);
        board.activeTetromino = undefined;
        const clearedRows = clearFullRows(board);
        board.linesCleared += clearedRows;
        board.score += getScoreForClearedRows(clearedRows);
        updateScoreUI();
      } else {
        board.activeTetromino.y -= 1;
      }
    } else {
      board.activeTetromino = getNewTetromino(board);
    }

    drawBoard(ctx, board);
  };

  /**
   * Controls
   * ArrowLeft - Move Left
   * ArrowLeft - Move right
   * ArrowUp - Rotate clockwise
   * ArrowDown - Move down i position
   * Space - Drop the tetromino to the floor
   */
  const onInput = (e: KeyboardEvent) => {
    if (board.gameOver || !board.activeTetromino) {
      return;
    }

    if (e.code === 'ArrowLeft') {
      if (
        !isTetrominoColliding(board, {
          ...board.activeTetromino,
          x: board.activeTetromino.x - 1,
        })
      ) {
        board.activeTetromino.x -= 1;
      }
    } else if (e.code === 'ArrowRight') {
      if (
        !isTetrominoColliding(board, {
          ...board.activeTetromino,
          x: board.activeTetromino.x + 1,
        })
      ) {
        board.activeTetromino.x += 1;
      }
    } else if (e.code === 'ArrowUp') {
      let nextDir: TetrominoDirection = 'north';
      // prettier-ignore
      switch (board.activeTetromino.direction) {
        case 'north': nextDir = 'east'; break;
        case 'east': nextDir = 'south'; break;
        case 'south': nextDir = 'west'; break;
        case 'west': nextDir = 'north'; break;
      }

      if (
        !isTetrominoColliding(board, {
          ...board.activeTetromino,
          direction: nextDir,
        })
      ) {
        board.activeTetromino.direction = nextDir;
      }
    } else if (e.code === 'ArrowDown') {
      if (
        !isTetrominoColliding(board, {
          ...board.activeTetromino,
          y: board.activeTetromino.y - 1,
        })
      ) {
        board.activeTetromino.y -= 1;
      }
    } else if (e.code === 'Space') {
      board.state.push(
        ...getTetrominoCells(dropTetromino(board, board.activeTetromino)),
      );
      board.activeTetromino = undefined;
      const clearedRows = clearFullRows(board);
      board.linesCleared += clearedRows;
      board.score += getScoreForClearedRows(clearedRows);
      updateScoreUI();
    }

    drawBoard(ctx, board);
  };

  updateScoreUI();

  document.removeEventListener('keydown', onInput);
  document.addEventListener('keydown', onInput);

  window.clearInterval(gameIntervalId);
  gameIntervalId = window.setInterval(gameTick, gameSpeed);

  window.clearInterval(timerIntervalId);
  timerIntervalId = window.setInterval(() => {
    timeTxt.innerHTML = moment(moment().diff(gameStartTime)).format('mm:ss');
  }, 1000);
};

export const gameInit = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) => {
  canvas.width = (defaultBoard.sizeX + 2) * defaultBoard.cellSize;
  canvas.height = (defaultBoard.sizeY + 2) * defaultBoard.cellSize;

  drawBoard(ctx, defaultBoard);
};
