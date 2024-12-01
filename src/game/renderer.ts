import { Color, getColorCode } from './color';
import { Board, Cell, dropTetromino, getTetrominoCells } from './board';
import { TetrominoInstance } from './tetromino';

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const drawRect = (ctx: CanvasRenderingContext2D, r: Rect, color: Color) => {
  const bevelSize = Math.min(r.width, r.height) / 10;
  const halfBevelSize = bevelSize / 2;

  ctx.beginPath();

  ctx.fillStyle = getColorCode(color);
  ctx.rect(r.x, r.y, r.width, r.height);
  ctx.fill();

  ctx.beginPath();

  // Left
  ctx.moveTo(r.x + halfBevelSize, r.y);
  ctx.lineTo(r.x + halfBevelSize, r.y + r.height);

  // Top
  ctx.moveTo(r.x, r.y + halfBevelSize);
  ctx.lineTo(r.x + r.width, r.y + halfBevelSize);

  ctx.strokeStyle = '#FFFFFF5D';
  ctx.lineWidth = bevelSize;
  ctx.stroke();

  ctx.beginPath();

  // Right
  ctx.moveTo(r.x + r.width - halfBevelSize, r.y);
  ctx.lineTo(r.x + r.width - halfBevelSize, r.y + r.height);

  // Bottom
  ctx.moveTo(r.x, r.y + r.height - halfBevelSize);
  ctx.lineTo(r.x + r.width, r.y + r.height - halfBevelSize);

  ctx.strokeStyle = '#0000004D';
  ctx.lineWidth = bevelSize;
  ctx.stroke();
};

const drawGhostRect = (
  ctx: CanvasRenderingContext2D,
  r: Rect,
  color: Color,
) => {
  ctx.beginPath();

  // Left
  ctx.moveTo(r.x, r.y);
  ctx.lineTo(r.x, r.y + r.height);

  // Top
  ctx.moveTo(r.x, r.y);
  ctx.lineTo(r.x + r.width, r.y);

  // Right
  ctx.moveTo(r.x + r.width, r.y);
  ctx.lineTo(r.x + r.width, r.y + r.height);

  // Bottom
  ctx.moveTo(r.x, r.y + r.height);
  ctx.lineTo(r.x + r.width, r.y + r.height);

  // Diagonal
  ctx.moveTo(r.x, r.y);
  ctx.lineTo(r.x + r.width, r.y + r.height);

  ctx.strokeStyle = getColorCode(color);
  ctx.lineWidth = 1;
  ctx.stroke();
};

const drawBorders = (ctx: CanvasRenderingContext2D, board: Board) => {
  for (let i = 0; i < board.sizeX + 2; ++i) {
    // Top
    drawRect(
      ctx,
      {
        x: i * board.cellSize,
        y: 0,
        width: board.cellSize,
        height: board.cellSize,
      },
      'Grey',
    );

    // Bottom
    drawRect(
      ctx,
      {
        x: i * board.cellSize,
        y: (board.sizeY + 1) * board.cellSize,
        width: board.cellSize,
        height: board.cellSize,
      },
      'Grey',
    );
  }

  for (let i = 1; i < board.sizeY + 1; ++i) {
    // Left
    drawRect(
      ctx,
      {
        x: 0,
        y: i * board.cellSize,
        width: board.cellSize,
        height: board.cellSize,
      },
      'Grey',
    );

    // Right
    drawRect(
      ctx,
      {
        x: (board.sizeX + 1) * board.cellSize,
        y: i * board.cellSize,
        width: board.cellSize,
        height: board.cellSize,
      },
      'Grey',
    );
  }
};

const drawCell = (ctx: CanvasRenderingContext2D, cell: Cell, board: Board) => {
  // Don't draw pieces outside the board
  if (cell.y < board.sizeY) {
    drawRect(
      ctx,
      {
        x: (cell.x + 1) * board.cellSize,
        y: (board.sizeY - cell.y) * board.cellSize,
        width: board.cellSize,
        height: board.cellSize,
      },
      cell.color,
    );
  }
};

const drawGhostCell = (
  ctx: CanvasRenderingContext2D,
  cell: Cell,
  board: Board,
) => {
  // Don't draw pieces outside the board
  if (cell.y < board.sizeY) {
    drawGhostRect(
      ctx,
      {
        x: (cell.x + 1) * board.cellSize,
        y: (board.sizeY - cell.y) * board.cellSize,
        width: board.cellSize,
        height: board.cellSize,
      },
      cell.color,
    );
  }
};

const drawOrigin = (
  ctx: CanvasRenderingContext2D,
  board: Board,
  t: TetrominoInstance,
) => {
  ctx.beginPath();
  ctx.strokeStyle = '#FFFFFF';
  ctx.rect(
    (t.x + 1 + t.origin.x + 0.5) * board.cellSize - 5,
    (board.sizeY - t.y + t.origin.y + 0.5) * board.cellSize - 5,
    10,
    10,
  );
  ctx.stroke();
};

export const drawBoard = (ctx: CanvasRenderingContext2D, board: Board) => {
  ctx.reset();

  drawBorders(ctx, board);

  // Render cells
  for (const cell of board.state) {
    drawCell(ctx, cell, board);
  }

  // Render active Tetromino
  if (board.activeTetromino) {
    for (const cell of getTetrominoCells(board.activeTetromino)) {
      drawCell(ctx, cell, board);
    }

    // Draw origin
    if (board.drawDebugInfo) {
      drawOrigin(ctx, board, board.activeTetromino);
    }

    // Render active tetromino ghost
    for (const cell of getTetrominoCells(
      dropTetromino(board, board.activeTetromino),
    )) {
      drawGhostCell(ctx, cell, board);
    }
  }
};
