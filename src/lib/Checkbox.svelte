<script lang="ts">
  export let label: string;
  export let checked: boolean;
  export let disabled: boolean;
</script>

  <div class="checkbox_input">
    <label class="checkbox_input__label">
      <div class="checkbox_input__label_text">{label}</div>
      <input type=checkbox bind:checked {disabled} />
    </label>
  </div>

<style>
  .checkbox_input {
      display: flex;
      padding: 0.5rem;
    }

    input[type=checkbox] {
      display: inline;
    }

    .checkbox_input__label {
      display: flex;
    }

    .checkbox_input__label_text {
      padding-right: 0.5rem;
    }
</style>
