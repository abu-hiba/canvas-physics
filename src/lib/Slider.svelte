<script lang="ts">
  export let label: string;
  export let value: number;
  export let min: number;
  export let max: number;
  export let disabled: boolean;
</script>

<div class="slider_input">
  <label>
    <div>{label}</div>
    <input type=range bind:value {min} {max} {disabled}>
    <input type=number bind:value {min} {max} {disabled}>
  </label>
</div>

<style>
  .slider_input {
      display: flex;
      padding: 0.5rem;
    }

    input[type=number] {
      width: 4rem;
    }
</style>
