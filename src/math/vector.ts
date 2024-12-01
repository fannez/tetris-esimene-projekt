export interface Vec2 {
  x: number;
  y: number;
}

const degrees_to_radians = (deg: number): number => {
  return deg * (Math.PI / 180);
};

const round_to = (val: number, numDecimals: number): number => {
  return Math.round(val * numDecimals) / numDecimals;
};

/**
 * Rotate a vector in degrees
 * @param v Vector to be rotated
 * @param deg Degrees to rotate by
 * @returns A new Vec2 of v rotated deg
 */
export const vec2_rotate_deg = (v: Vec2, deg: number): Vec2 => {
  const theta = degrees_to_radians(deg);

  const thetaCos = Math.cos(theta);
  const thetaSin = Math.sin(theta);

  return {
    x: round_to(v.x * thetaCos - v.y * thetaSin, 10),
    y: round_to(v.x * thetaSin + v.y * thetaCos, 10),
  };
};

/**
 * Rotate v1 around v2
 * @param v1 Vector to be rotated
 * @param v2 Vector to rotate around (origin)
 * @param deg Degrees to rotate by
 * @returns A new Vec2 of v1 rotated around v2 by deg
 */
export const vec2_rotate_deg_other = (
  v1: Vec2,
  v2: Vec2,
  deg: number,
): Vec2 => {
  const theta = degrees_to_radians(deg);

  const thetaCos = Math.cos(theta);
  const thetaSin = Math.sin(theta);

  return {
    x: round_to((v1.x - v2.x) * thetaCos - (v1.y - v2.y) * thetaSin, 10) + v2.x,
    y: round_to((v1.x - v2.x) * thetaSin + (v1.y - v2.y) * thetaCos, 10) + v2.y,
  };
};
