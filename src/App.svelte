<script lang="ts">
  import { onMount } from "svelte";
  import {
    canvasWidth,
    canvasHeight,
    maxSpeed,
    maxRadius,
    minRadius,
    numCircles,
    disableCollisions,
  } from "./lib/store";
  import * as Circle from "./lib/circle";
  import type { Point } from "./lib/physics";
  import Controls from "./lib/Controls.svelte";
  import type { Mallet } from "./lib/mallet";

  let canvas: HTMLCanvasElement;
  let isRunning = false;
  let circles: Circle.Circle[] = [];
  let mousePosition: Point;

  onMount(() => {
    const ctx = canvas.getContext("2d");
    let frame = requestAnimationFrame(loop);

    function loop() {
      frame = requestAnimationFrame(loop);

      const drawCirclesOnCanvas = Circle.drawCircles(ctx);

      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, $canvasWidth, $canvasWidth);

      drawCirclesOnCanvas(circles);

      circles = circles.map((c) =>
        Circle.applyVelocity(
          Circle.detectCollision(
            $canvasWidth,
            $canvasHeight,
            circles,
            c,
            $disableCollisions
          )
        )
      );
    }

    return () => {
      cancelAnimationFrame(frame);
    };
  });

  const onMouseMove = (e) => {
    mousePosition = { x: e.offsetX, y: e.offsetY };
    console.log(mousePosition)
  };

  function start() {
    const mallet: Mallet = Circle.create(
      { x: $canvasWidth / 2, y: $canvasWidth / 2 },
      20,
      { x: 0, y: 0 },
      "red",
      false
    );

    const nonPlayerObjects = Circle.renderCircles(
      {
        context: canvas.getContext("2d"),
        minRadius: $minRadius,
        maxRadius: $maxRadius,
        maxSpeed: $maxSpeed,
      },
      $numCircles
    );

    circles = [...nonPlayerObjects, mallet];
    canvas.addEventListener("mousemove", onMouseMove);
    isRunning = true;
  }

  function stop() {
    circles = [];
    canvas.removeEventListener('mousemove', onMouseMove);
    isRunning = false;
  }
</script>

<main>
  <div class="main_container">
    <Controls {isRunning} {start} {stop} />
    <canvas width={$canvasWidth} height={$canvasHeight} bind:this={canvas} />
  </div>
</main>

<style>
  canvas {
    border: 1px solid grey;
    align-self: flex-start;
  }

  .main_container {
    display: flex;
  }
</style>
