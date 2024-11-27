import { Color, getColorCode } from './color';
import { Board } from './board';

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const drawRect = (
  ctx: CanvasRenderingContext2D,
  r: Rect,
  color: Color,
) => {
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

export const drawBoard = (ctx: CanvasRenderingContext2D, board: Board) => {
  ctx.reset();

  drawBorders(ctx, board);

  for (const cell of board.state) {
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
