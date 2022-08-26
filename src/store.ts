import * as Circle from './circle';

type State = {
  canvasWidth: number;
  canvasHeight: number;
  numCircles: number;
  minRadius: number;
  maxRadius: number;
  maxSpeed: number;
  circles: Circle.Circle[];
};

export const state: State = {
  canvasWidth: 150,
  canvasHeight: 150,
  numCircles: 2,
  minRadius: 10,
  maxRadius: 20,
  maxSpeed: 3,
  circles: [],
};
