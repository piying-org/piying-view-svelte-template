<script lang="ts">
  import { PI_VIEW_FIELD_TOKEN, PiyingFieldTemplate, signalToState } from '@piying/view-svelte';
  import { getContext } from 'svelte';
  import clsx from 'clsx';
  const field = getContext<PI_VIEW_FIELD_TOKEN>(PI_VIEW_FIELD_TOKEN);
  const dProps = $props();
  const fProps = signalToState(() => field().props())!;
  const children = signalToState(() => field().children!())!;

  const add = () => {
    field().action.set(undefined);
  };
  const remove = (index: number) => {
    field().action.remove(index);
  };
  const btnDisabled = $derived.by(() => children()!.length <= dProps.minLength);
  const itemClass = $derived.by(() => {
    return clsx('btn btn-circle btn-soft btn-error', { 'btn-disabled': btnDisabled });
  });
</script>

<fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full">
  {#if fProps()!['title']}
    <legend class="fieldset-legend">{fProps()!['title']}</legend>
  {/if}
  {#each children()! as field, i (i)}
    <div class="flex items-center gap-2 *:first:flex-1">
      <PiyingFieldTemplate {field}></PiyingFieldTemplate>
      <button class={itemClass} onclick={() => remove(i)} aria-disabled={btnDisabled}> 🗑️ </button>
    </div>
  {/each}
  <button class="btn" onclick={add}> ➕ </button>
</fieldset>
