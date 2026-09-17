<script lang="ts">
  import * as v from 'valibot';
  import { setComponent, typedFieldPipe } from '@piying/view-core';
  import { Field, InjectorToken, PiyingFieldTemplate, convertToField, typedFieldComponentPipe } from '@piying/view-svelte';
  import { setContext } from 'svelte';
  import { CustomNgBuilder } from '../piying/custom.builder';
  import { fieldConfig } from '../piying/define';

  const Schema = v.object({
    text1: v.pipe(v.optional(v.string()), v.title('text1-label')),
    number1: v.pipe(v.number(), v.title('number1')),
    radio1: v.pipe(v.optional(v.picklist(['v1', 'v2'])), setComponent('radio'), v.title('radio1-title')),
    checkbox1: v.optional(v.boolean()),
  });

  const TypedSchema = typedFieldComponentPipe(Schema, fieldConfig, (d) => [
    d(['radio1'], 'radio', [
      d.inputs.patch({
        options: [
          { label: 'label-v1', value: 'v1' },
          { label: 'label-v2', value: 'v2' },
        ],
      }),
    ]),
  ]);

  // 监听 radio1 的 indexChange, 把 text1 改成 "set <选中索引>"
  const TypedSchema2 = typedFieldPipe(TypedSchema, (d) => [
    d(
      ['text1'],
      [
        d.outputChange((fn) => {
          fn([{ list: ['..', 'radio1'], output: 'onIndexChange' }]).subscribe((change) => {
            change.field.form.control?.updateValue(`set ${change.list[0]![0]}`);
          });
        }),
      ],
    ),
  ]);

  const field = convertToField(
    () => TypedSchema2,
    undefined,
    () => ({
      fieldGlobalConfig: fieldConfig,
      builder: CustomNgBuilder,
    }),
  );

  // field-template / Field 通过 context 取 injector, 手动页需要自己提供
  setContext(InjectorToken, () => field.injector);
</script>

<div class="grid gap-2 p-4">
  <!-- 原生 input 直接绑到 text1 -->
  <Field {field} path={['text1']}>
    {#snippet children(cvaa)}
      <input
        type="text"
        class="input"
        placeholder="text1"
        value={cvaa.value ?? ''}
        disabled={cvaa.disabled}
        oninput={(e: Event) => cvaa.valueChange((e.currentTarget as HTMLInputElement).value)}
        onblur={cvaa.touchedChange}
      />
    {/snippet}
  </Field>

  <!-- 原生 number input 绑到 number1 -->
  <Field {field} path={['number1']}>
    {#snippet children(cvaa)}
      <input
        type="number"
        class="input"
        placeholder="number1"
        value={cvaa.value ?? ''}
        disabled={cvaa.disabled}
        oninput={(e: Event) => {
          const raw = (e.currentTarget as HTMLInputElement).value;
          cvaa.valueChange(raw === '' ? 0 : Number(raw));
        }}
        onblur={cvaa.touchedChange}
      />
    {/snippet}
  </Field>

  <!-- 组件型字段走 field-template -->
  <PiyingFieldTemplate {field} path={['radio1']} />

  <!-- 原生 checkbox 绑到 checkbox1 -->
  <Field {field} path={['checkbox1']}>
    {#snippet children(cvaa)}
      <label class="label cursor-pointer justify-start gap-2">
        <input
          type="checkbox"
          class="checkbox"
          checked={cvaa.value ?? false}
          disabled={cvaa.disabled}
          onchange={(e: Event) => cvaa.valueChange((e.currentTarget as HTMLInputElement).checked)}
          onblur={cvaa.touchedChange}
        />
        <span class="label-text">checkbox1</span>
      </label>
    {/snippet}
  </Field>
</div>
