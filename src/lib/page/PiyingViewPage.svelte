<script lang="ts">
  import { PiyingView } from '@piying/view-svelte';
  import { NFCSchema, actions, setComponent } from '@piying/view-core';
  import * as v from 'valibot';
  import { CustomNgBuilder } from '../piying/custom.builder';
  import { fieldConfig } from '../piying/define';

  const schema = v.pipe(
    v.object({
      text1: v.pipe(v.optional(v.string()), v.title('text1-label')),
      number1: v.pipe(v.number(), v.title('number1'), actions.wrappers.patch(['validator'])),
      radio1: v.pipe(
        v.optional(v.picklist(['v1', 'v2'])),
        setComponent('radio'),
        actions.inputs.patch({
          options: [
            { label: 'label-v1', value: 'v1' },
            { label: 'label-v2', value: 'v2' },
          ],
        }),
        v.title('radio1-title')
      ),
      checkbox1: v.optional(v.boolean()),
      list1: v.pipe(v.array(v.pipe(v.object({ k1: v.string() }), setComponent('fieldset'))), setComponent('array-rw')),
      __formHelper: v.pipe(NFCSchema, setComponent('formHelper')),
    }),
    v.title('form'),
    setComponent('fieldset')
  );
  const options = {
    fieldGlobalConfig: fieldConfig,
    builder: CustomNgBuilder,
  };
  function modelChange(event: any) {
    console.log(event);
  }
  const model = $state({});
</script>

<PiyingView {schema} {options} {model} {modelChange}></PiyingView>
