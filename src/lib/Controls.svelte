<script lang="ts">
  import Slider from './Slider.svelte';
  import Checkbox from './Checkbox.svelte';
  import {
      canvasWidth,
      canvasHeight,
      maxSpeed,
      minRadius,
      maxRadius,
      numCircles,
      disableCollisions
  } from './store';
  import { lower } from './utils';

  export let isRunning: boolean;
  export let start: () => void;
  export let stop: () => void;
</script>

<div class="controls">
  <Slider
    label="Width"
    bind:value={$canvasWidth}
    min={100}
    max={1500}
    disabled={isRunning}
  />

  <Slider
    label="Height"
    bind:value={$canvasHeight}
    min={100}
    max={1500}
    disabled={isRunning}
  />

  <Slider
    label="Speed"
    bind:value={$maxSpeed}
    min={1}
    max={20}
    disabled={isRunning}
  />

  <Slider
    label="Minimum radius"
    bind:value={$minRadius}
    min={5}
    max={Math.floor(lower($canvasWidth, $canvasHeight) / 20)}
    disabled={isRunning}
  />

  <Slider
    label="Maximum radius"
    bind:value={$maxRadius}
    min={5}
    max={Math.floor(lower($canvasWidth, $canvasHeight) / 20)}
    disabled={isRunning}
  />

  <Slider
    label="Number of circles"
    bind:value={$numCircles}
    min={1}
    max={Math.floor(lower($canvasWidth, $canvasHeight) / $maxRadius)}
    disabled={isRunning}
  />

  <Checkbox
    label="Disable collisions"
    bind:checked={$disableCollisions}
    disabled={isRunning}
  />

  <div class="buttons">
    <button on:click={start} disabled={isRunning}>Start</button>
    <button on:click={stop} disabled={!isRunning}>Stop</button>
  </div>
</div>

<style>
.controls {
    padding: 2rem 1rem;
    margin-right: 1rem;
    background-color: #ddd;
    border-radius: 0.5rem;
    font-family: Trebuchet, sans-serif;
  }

 .buttons {
    padding: 0.5rem;
  }
</style>
