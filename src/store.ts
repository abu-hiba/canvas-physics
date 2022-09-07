import { writable } from 'svelte/store';

export const canvasWidth = writable(500);
export const canvasHeight = writable(500);
export const minRadius = writable(5);
export const maxSpeed = writable(3);
export const maxRadius = writable(40);
export const numCircles = writable(5);
export const disableCollisions = writable(false);
