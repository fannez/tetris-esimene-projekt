import './style.css';
import './game.css';

import { drawBoard } from './game/renderer';
import { Board, Cell } from './game/board';

const canvas = document.getElementById('gameCanvas')! as HTMLCanvasElement;
const startBtn = document.getElementById('resetBtn')! as HTMLButtonElement;

const ctx = canvas.getContext('2d')!;

const gameStart = () => {
  const board: Board = {
    sizeX: 10,
    sizeY: 20,
    cellSize: 30,

    state: [],
  };

  const gameSpeed = 500; // One every second?

  canvas.width = (board.sizeX + 2) * board.cellSize;
  canvas.height = (board.sizeY + 2) * board.cellSize;

  drawBoard(ctx, board);

  board.state.push({
    x: 0,
    y: 0,
    color: 'Blue',
  });

  board.state.push({
    x: 1,
    y: 0,
    color: 'Blue',
  });

  board.state.push({
    x: 0,
    y: 1,
    color: 'Blue',
  });

  board.state.push({
    x: 0,
    y: 2,
    color: 'Blue',
  });

  const cell: Cell = {
    x: Math.floor(board.sizeX / 2),
    y: board.sizeY - 1,
    color: 'Blue',
  };

  board.state.push(cell);

  const gameTick = () => {
    if (cell.y > 0) {
      cell.y -= 1;
    }
    drawBoard(ctx, board);
  };

  setInterval(gameTick, gameSpeed);
};

gameStart();

startBtn.addEventListener('click', () => {
  gameStart();
});
