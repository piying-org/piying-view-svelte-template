<script module lang="ts">
  let index = 0;
  function getRadioIndex() {
    return index++;
  }
</script>

<script lang="ts">
  import { useControlValueAccessor } from '@piying/view-svelte';
  import { DefaultOptionConvert, transformOptions, type OptionConvert } from './util/options';

  const { cva, cvaa } = useControlValueAccessor();
  let obj = {
    get value() {
      return cvaa.value;
    },
    set value(v) {
      cvaa.valueChange(v);
    },
  };
  export { cva };
  let props: { options?: any[]; optionConvert?: OptionConvert } = $props();
  let resolvedOptions = $derived.by(() => {
    return transformOptions(props.options ?? [], { ...DefaultOptionConvert, ...props.optionConvert });
  });

  const name = `radio-${getRadioIndex()}`;
</script>

{#each resolvedOptions as field, i (i)}
  <div>
    <input
      {name}
      type="radio"
      class="radio"
      bind:group={obj.value}
      disabled={field.disabled || cvaa.disabled}
      onblur={cvaa.touchedChange}
      value={field.value}
    />
    <div class="label">{field.label}</div>
  </div>
{/each}
