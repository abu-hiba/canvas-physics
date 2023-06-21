import type { Circle } from './circle';
import { type Point, vectorSubtract } from './physics';

export interface Mallet extends Circle { }

export const move = (mallet: Mallet, mouse: Point): Mallet => {
  const position = vectorSubtract(mouse, mallet.position);
  const distance = Math.sqrt(position.x ^ 2 + position.y ^ 2);

  if (distance > 5) {
    position.x *= 5 / distance;
    position.y *= 5 / distance;
  }

  return {
    ...mallet,
    position,
  };
};
