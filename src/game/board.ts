import { Color } from './color';
import { TetrominoInstance } from './tetromino';
import { Vec2, vec2_rotate_deg_other } from '../math/vector';

export interface Cell extends Vec2 {
  color: Color;
}

export interface Board {
  // Constants
  sizeX: number;
  sizeY: number;
  cellSize: number;

  // State
  activeTetromino?: TetrominoInstance;
  state: Cell[];
  linesCleared: number;
  score: number;
  gameOver: boolean;

  drawDebugInfo: boolean;
}

export const getTetrominoCells = (t: TetrominoInstance): Cell[] => {
  const ret: Cell[] = [];

  let rotation = 0;
  // prettier-ignore
  switch (t.direction) {
    case 'north': rotation = 0; break;
    case 'east': rotation = -90; break;
    case 'south': rotation = 180; break;
    case 'west': rotation = 90; break;
  }

  const origin: Vec2 = {
    x: t.x + t.origin.x,
    y: t.y - t.origin.y,
  };

  for (const piece of t.pieces) {
    ret.push({
      ...vec2_rotate_deg_other(
        {
          x: t.x + piece.x,
          y: t.y - piece.y,
        },
        origin,
        rotation,
      ),
      color: t.color,
    });
  }

  return ret;
};

export const isTetrominoColliding = (
  board: Board,
  t: TetrominoInstance,
): boolean => {
  for (const cell of getTetrominoCells(t)) {
    if (
      cell.x < 0 ||
      cell.x > board.sizeX - 1 ||
      cell.y < 0 ||
      board.state.findIndex(
        (other) => other.x === cell.x && other.y === cell.y,
      ) !== -1
    ) {
      return true;
    }
  }

  return false;
};

export const dropTetromino = (
  board: Board,
  t: TetrominoInstance,
): TetrominoInstance => {
  const newTetromino = structuredClone(t);

  while (!isTetrominoColliding(board, newTetromino)) {
    --newTetromino.y;
  }

  ++newTetromino.y;

  return newTetromino;
};

export const clearFullRows = (board: Board): number => {
  let clearedRows = 0;

  for (let i = 0; i < board.sizeY; ++i) {
    const cells = board.state.filter((cell) => cell.y === i);
    // If this row is empty, there is nothing above it
    if(cells.length === 0) {
      break;
    }

    // Check if this row should be cleared
    if (cells.length === board.sizeX) {
      board.state = board.state.filter((cell) => cell.y !== i);
      ++clearedRows;
    }

    // Move cells down if we cleared any rows under it
    if (clearedRows > 0) {
      for (const cell of cells) {
        cell.y -= clearedRows;
      }
    }
  }

  return clearedRows;
}
