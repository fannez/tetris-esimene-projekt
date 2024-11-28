import { drawBoard } from './renderer';
import { Board } from './board';
import { getRandomTetromino, TetrominoInstance } from './tetromino';
import { getRandomPieceColor } from './color';

const defaultBoard: Board = {
  sizeX: 10,
  sizeY: 20,
  cellSize: 30,

  activeTetromino: undefined,
  state: [],
} as const;

let gameInterval: number;

const isColliding = (board: Board, t: TetrominoInstance): Boolean => {
  for (const piece of t.pieces) {
    const x = t.x + piece.x;
    const y = t.y - piece.y;

    if (
      x < 0 ||
      x > board.sizeX - 1 ||
      y < 0 ||
      board.state.findIndex((cell) => cell.x === x && cell.y === y) !== -1
    ) {
      return true;
    }
  }

  return false;
};

const getNewTetromino = (board: Board): TetrominoInstance => {
  return {
    ...getRandomTetromino(),
    x: Math.floor(board.sizeX / 2 - 1), // TODO: Fix this later
    y: board.sizeY,
    color: getRandomPieceColor(),
  };
};

export const gameStart = (ctx: CanvasRenderingContext2D) => {
  /*const soundTrack = new Audio(
      'https://ia802905.us.archive.org/11/items/TetrisThemeMusic/Tetris.mp3?cnt=0',
    );
    soundTrack.volume = 0.05;
    soundTrack.play();*/

  const board: Board = { ...defaultBoard };
  const gameSpeed = 100;

  drawBoard(ctx, board);

  const gameTick = () => {
    if (board.activeTetromino) {
      if (
        isColliding(board, {
          ...board.activeTetromino,
          y: board.activeTetromino.y - 1,
        })
      ) {
        for (const piece of board.activeTetromino.pieces) {
          // Don't draw pieces outside the board
          if (board.activeTetromino.y - piece.y < board.sizeY) {
            board.state.push({
              x: board.activeTetromino.x + piece.x,
              y: board.activeTetromino.y - piece.y,
              color: board.activeTetromino.color,
            });
          }
        }
        board.activeTetromino = undefined;
      } else {
        board.activeTetromino.y -= 1;
      }
    } else {
      board.activeTetromino = getNewTetromino(board);
    }

    drawBoard(ctx, board);
  };

  const onInput = (e: KeyboardEvent) => {
    if (board.activeTetromino) {
      if (e.key === 'ArrowLeft') {
        if (
          !isColliding(board, {
            ...board.activeTetromino,
            x: board.activeTetromino.x - 1,
          })
        ) {
          board.activeTetromino.x -= 1;
        }
      } else if (e.key === 'ArrowRight') {
        if (
          !isColliding(board, {
            ...board.activeTetromino,
            x: board.activeTetromino.x + 1,
          })
        ) {
          board.activeTetromino.x += 1;
        }
      } else if (e.key === 'ArrowUp') {
        console.log('Up (TODO: Implement)');
      } else if (e.key === 'ArrowDown') {
        console.log('Down (TODO: Implement)');
      }
    }
  };

  document.removeEventListener('keydown', onInput);
  document.addEventListener('keydown', onInput);

  window.clearInterval(gameInterval);
  gameInterval = window.setInterval(gameTick, gameSpeed);
};

export const gameInit = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
) => {
  canvas.width = (defaultBoard.sizeX + 2) * defaultBoard.cellSize;
  canvas.height = (defaultBoard.sizeY + 2) * defaultBoard.cellSize;

  drawBoard(ctx, defaultBoard);
};
