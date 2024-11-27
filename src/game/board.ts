import { Color } from './color';

export interface Cell {
  x: number;
  y: number;
  color: Color;
}

export interface Board {
  // Constants
  sizeX: number;
  sizeY: number;
  cellSize: number;

  // State
  state: Cell[];
}
