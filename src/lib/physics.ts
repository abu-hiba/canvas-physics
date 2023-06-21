interface Vector {
  x: number;
  y: number;
};

export type Point = Vector;
export type Velocity = Vector;

export const randomPosition = (
  canvasWidth: number,
  canvasHeight: number,
  radius: number
): Point => ({
  x: Math.floor(Math.random() * (canvasWidth - 2 * radius)) + radius, // random int between (0 + radius) and (canvas width - radius)
  y: Math.floor(Math.random() * (canvasHeight - 2 * radius)) + radius, // random int between (0 + radius) and (canvas height - radius)
});

export const randomVelocity = (maxSpeed: number): Velocity => ({
  x: Math.random() * (2 * maxSpeed) - maxSpeed, // random number between -maxSpeed and maxSpeed
  y: Math.random() * (2 * maxSpeed) - maxSpeed,
});

export const dotProduct = (v1: Vector, v2: Vector): number =>
  v1.x * v2.x + v1.y * v2.y;

export const vectorNorm = ({ x, y }: Vector): number =>
  Math.sqrt(x ** 2 + y ** 2);

export const vectorAdd = (v1: Vector, v2: Vector): Vector => ({
  x: v1.x + v2.x,
  y: v1.y + v2.y,
});

export const vectorSubtract = (v1: Vector, v2: Vector): Vector => ({
  x: v1.x - v2.x,
  y: v1.y - v2.y,
});

export const vectorXScalar = (v: Vector, n: number): Vector => ({
  x: v.x * n,
  y: v.y * n,
});

export const vectorDivScalar = (v: Vector, n: number): Vector => ({
  x: v.x / n,
  y: v.y / n,
});
