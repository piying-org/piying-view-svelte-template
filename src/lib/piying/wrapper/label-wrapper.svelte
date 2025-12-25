<script lang="ts">
  import { PI_VIEW_FIELD_TOKEN, signalToState } from '@piying/view-svelte';
  import { getContext } from 'svelte';
  let dProps: { children: any } = $props();
  const field = getContext<PI_VIEW_FIELD_TOKEN>(PI_VIEW_FIELD_TOKEN);
  const fProps = signalToState(() => field().props());
</script>

<div class="flex gap-2 items-center">
  {#if fProps()!['title']}
    <span class="label">{fProps()!['title']}</span>
  {/if}

  {@render dProps.children()}
</div>
