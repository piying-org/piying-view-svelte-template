<script lang="ts">
  import { PI_VIEW_FIELD_TOKEN, signalToState } from '@piying/view-svelte';
  import { getContext } from 'svelte';
  import { fieldControlStatusClass } from '@piying/view-core';
  import { summarize } from 'valibot';
  let dProps: { children: any } = $props();
  const field = getContext<PI_VIEW_FIELD_TOKEN>(PI_VIEW_FIELD_TOKEN);
  const statusClass = signalToState(() => fieldControlStatusClass(field().form.control));
  const hasError = signalToState(() => !!field().form.control!.errors);
  const errorStr = signalToState(() => {
    const fc = field();
    const errors = field().form.control!.errors;
    if (errors) {
      const valibot = errors['valibot'];
      if (valibot) {
        return summarize(valibot);
      } else {
        return Object.values(fc.form.root!.errors!)
          .map((item) => (typeof item === 'string' ? item : JSON.stringify(item)))
          .join('\n');
      }
    }
  });
  const isChangedStatus = signalToState(() => field().form.control?.dirty$$() || field().form.control?.touched$$());
</script>

<div class={statusClass()}>
  {@render dProps.children()}
  {#if hasError() && isChangedStatus()}
    <div class="text-error">{errorStr()}</div>
  {/if}
</div>
