<script lang="ts">
  import { PI_VIEW_FIELD_TOKEN, PiyingFieldTemplate, signalToState } from '@piying/view-svelte';
  import { getContext } from 'svelte';

  const field = getContext<PI_VIEW_FIELD_TOKEN>(PI_VIEW_FIELD_TOKEN);
  const props = signalToState(() => field().props())!;
  const children = signalToState(() => field().children!())!;
</script>

<fieldset class="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-full">
  {#if props()['title']}
    <legend class="fieldset-legend">{props()['title']}</legend>
  {/if}
  {#each children() as field, i (i)}
    <PiyingFieldTemplate {field}></PiyingFieldTemplate>
  {/each}
</fieldset>
