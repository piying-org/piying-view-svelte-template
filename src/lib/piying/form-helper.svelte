<script lang="ts">
  import { PI_VIEW_FIELD_TOKEN, signalToState } from '@piying/view-svelte';
  import JSONFormatter from 'json-formatter-js';
  import { getContext } from 'svelte';
  import { summarize } from 'valibot';
  const field = getContext<PI_VIEW_FIELD_TOKEN>(PI_VIEW_FIELD_TOKEN)!;
  const control = signalToState(() => field().form.root);
  const value = signalToState(() => control()!.value$$());
  const errors$$ = signalToState(() => control()!.errors);
  const errorStr$$ = $derived.by(() => {
    if (!errors$$()) {
      return '';
    }
    const errors = errors$$()!;

    if (errors['valibot']) {
      return summarize(errors['valibot']);
    } else {
      return Object.values(errors)
        .map((item) => (typeof item === 'string' ? item : JSON.stringify(item)))
        .join('\n');
    }
  });
  const hasError = signalToState(() => !!control()!.errors);
  const isChangedStatus = signalToState(() => control()?.dirty$$() || control()?.touched$$());
  function submit() {
    field().form.root.emitSubmit();
    if (field().form.root.valid) {
      alert(JSON.stringify(value(), undefined, 4));
    }
  }
  let initData = $state<any>(undefined);
  function resetForm() {
    control()!.reset(initData);
  }
  function saveInit() {
    initData = value();
  }
  const forceShowError = signalToState(() => field().props()['forceShowError']);
  let controlInvalid = signalToState(() => control()?.invalid);
  let valueAnchor = $state<HTMLElement | undefined>();
  $effect(() => {
    if (valueAnchor) {
      valueAnchor.innerHTML = '';
      valueAnchor.appendChild(new JSONFormatter(value()).render());
    }
  });
</script>

<div>
  <div bind:this={valueAnchor}></div>
  {#if forceShowError() || (hasError() && isChangedStatus())}
    <div class="text-error">
      <div class="label">Form Error</div>
      <pre class="mt-2 text-error">{errorStr$$}</pre>
    </div>
  {/if}

  <div class="flex gap-2 items-center">
    <button disabled={controlInvalid()} class="btn btn-primary" onclick={submit}>Submit</button>
    <button class="btn btn-outline btn-secondary" onclick={resetForm}>Reset</button>
    <button class="btn btn-outline btn-accent" onclick={saveInit}>Update Intial Values</button>
  </div>
</div>
