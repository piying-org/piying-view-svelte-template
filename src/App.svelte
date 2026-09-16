<script lang="ts">
  import PiyingViewPage from './lib/page/PiyingViewPage.svelte';
  import PiyingManualPage from './lib/page/PiyingManualPage.svelte';

  let route = $state(window.location.hash.slice(1) || '/');

  $effect(() => {
    const onChange = () => (route = window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  });
</script>

<nav class="flex gap-4 border-b p-3">
  <a class="link" href="#/">auto</a>
  <a class="link" href="#/manual">manual</a>
</nav>

{#if route === '/manual'}
  <PiyingManualPage></PiyingManualPage>
{:else}
  <PiyingViewPage></PiyingViewPage>
{/if}
