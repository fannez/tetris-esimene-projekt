import { describe, expect, it } from 'vitest';
import { Vec2, vec2_rotate_deg, vec2_rotate_deg_other } from './vector';

describe('vec2_rotate_deg()', () => {
  it('should return the same vector when rotated by 0 degrees', () => {
    const v: Vec2 = { x: 3, y: 4 };
    const result = vec2_rotate_deg(v, 0);
    expect(result).toEqual(v);
  });

  it('should rotate 90 degrees counter-clockwise', () => {
    const v: Vec2 = { x: 1, y: 0 };
    const result = vec2_rotate_deg(v, 90);
    expect(result).toEqual({ x: 0, y: 1 });
  });

  it('should rotate 180 degrees around the origin', () => {
    const v: Vec2 = { x: 1, y: 0 };
    const result = vec2_rotate_deg(v, 180);
    expect(result).toEqual({ x: -1, y: 0 });
  });

  it('should rotate -90 degrees clockwise', () => {
    const v: Vec2 = { x: 0, y: 1 };
    const result = vec2_rotate_deg(v, -90);
    expect(result).toEqual({ x: 1, y: 0 });
  });

  it('should return the same vector when rotated by 360 degrees', () => {
    const v: Vec2 = { x: 3, y: 4 };
    const result = vec2_rotate_deg(v, 360);
    expect(result).toEqual(v);
  });

  it('should return the origin when the input vector is (0, 0)', () => {
    const v: Vec2 = { x: 0, y: 0 };
    const result = vec2_rotate_deg(v, 90);
    expect(result).toEqual({ x: 0, y: 0 });
  });
});

describe('vec2_rotate_deg_other()', () => {
  it('should return the same vector when rotated by 0 degrees', () => {
    const v1: Vec2 = { x: 2, y: 3 };
    const v2: Vec2 = { x: 0, y: 0 };
    const result = vec2_rotate_deg_other(v1, v2, 0);
    expect(result).toEqual(v1);
  });

  it('should rotate 90 degrees clockwise around the origin', () => {
    const v1: Vec2 = { x: 1, y: 0 };
    const v2: Vec2 = { x: 0, y: 0 };
    const result = vec2_rotate_deg_other(v1, v2, 90);
    expect(result).toEqual({ x: 0, y: 1 });
  });

  it('should rotate 180 degrees around the origin', () => {
    const v1: Vec2 = { x: 1, y: 0 };
    const v2: Vec2 = { x: 0, y: 0 };
    const result = vec2_rotate_deg_other(v1, v2, 180);
    expect(result).toEqual({ x: -1, y: 0 });
  });

  it('should rotate -90 degrees (counter-clockwise) around the origin', () => {
    const v1: Vec2 = { x: 1, y: 0 };
    const v2: Vec2 = { x: 0, y: 0 };
    const result = vec2_rotate_deg_other(v1, v2, -90);
    expect(result).toEqual({ x: 0, y: -1 });
  });

  it('should return the same point when v1 and v2 are the same', () => {
    const v1: Vec2 = { x: 2, y: 2 };
    const v2: Vec2 = { x: 2, y: 2 };
    const result = vec2_rotate_deg_other(v1, v2, 45);
    expect(result).toEqual(v1);
  });

  it('should rotate around a non-origin point', () => {
    const v1: Vec2 = { x: 2, y: 2 };
    const v2: Vec2 = { x: 1, y: 1 };
    const result = vec2_rotate_deg_other(v1, v2, 90);
    expect(result).toEqual({ x: 0, y: 2 });
  });
});
