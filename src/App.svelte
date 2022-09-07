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
  } from "./store";
  import Circle from "./circle";
  import Controls from "./Controls.svelte";

  let canvas: HTMLCanvasElement;
  let isRunning = false;
  let circles: Circle.Circle[] = [];

  onMount(() => {
    const ctx = canvas.getContext("2d");
    let frame = requestAnimationFrame(loop);

    function loop() {
      frame = requestAnimationFrame(loop);

      const drawCirclesOnCanvas = Circle.drawCircles(ctx);

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, $canvasWidth, $canvasWidth);

      drawCirclesOnCanvas(circles);

      circles = circles.map((c) =>
        Circle.applyVelocity(
          Circle.detectCollision($canvasWidth, $canvasHeight, circles, c, $disableCollisions)
        )
      );
    }

    return () => {
      cancelAnimationFrame(frame);
    };
  });

  function start() {
    circles = Circle.renderCircles(
      {
        context: canvas.getContext("2d"),
        minRadius: $minRadius,
        maxRadius: $maxRadius,
        maxSpeed: $maxSpeed,
      },
      $numCircles
    );
    isRunning = true;
  }

  function stop() {
    circles = [];
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
    border: 1px solid black;
    align-self: flex-start;
  }

  .main_container {
    display: flex;
  }
</style>
