import { Color } from './color';
import { Vec2 } from '../math/vector';

export type TetrominoDirection = 'north' | 'east' | 'south' | 'west';

export interface Tetromino {
  origin: Vec2;
  direction: TetrominoDirection;
  pieces: Vec2[];
}

export interface TetrominoInstance extends Tetromino, Vec2 {
  color: Color;
}

/* All Tetrominos should default to the north direction */

export const OTetromino: Tetromino = {
  origin: { x: 1.5, y: 0.5 },
  direction: 'north',
  pieces: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ],
} as const;

export const ITetromino: Tetromino = {
  origin: { x: 1.5, y: 0.5 },
  direction: 'north',
  pieces: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
  ],
} as const;

export const TTetromino: Tetromino = {
  origin: { x: 1.5, y: 0.5 },
  direction: 'north',
  pieces: [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 0 },
  ],
} as const;

export const LTetromino: Tetromino = {
  origin: { x: 1.5, y: 0.5 },
  direction: 'north',
  pieces: [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 2, y: 0 },
  ],
} as const;

export const JTetromino: Tetromino = {
  origin: { x: 1.5, y: 0.5 },
  direction: 'north',
  pieces: [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 0, y: 0 },
  ],
} as const;

export const STetromino: Tetromino = {
  origin: { x: 1.5, y: 0.5 },
  direction: 'north',
  pieces: [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ],
} as const;

export const ZTetromino: Tetromino = {
  origin: { x: 1.5, y: 0.5 },
  direction: 'north',
  pieces: [
    { x: 0, y: 0 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 2, y: 1 },
  ],
} as const;

const Tetrominos: Tetromino[] = [
  OTetromino,
  ITetromino,
  TTetromino,
  LTetromino,
  JTetromino,
  STetromino,
  ZTetromino,
] as const;

export const getRandomTetromino = () => {
  return Tetrominos[Math.floor(Math.random() * Tetrominos.length)];
};
