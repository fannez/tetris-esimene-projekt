import { Color } from './color';
import { TetrominoInstance } from './tetromino';
import { Vec2 } from '../math/vector';

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
}
