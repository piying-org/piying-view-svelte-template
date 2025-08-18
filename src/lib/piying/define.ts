import InputText from './input-text.svelte';
import InputNumber from './input-number.svelte';
import InputRadio from './input-radio.svelte';
import InputCheckbox from './input-checkbox.svelte';
import FieldsetGroup from './group/fieldset.svelte';
import LabelWrapper from './wrapper/label-wrapper.svelte';
import ValidatorWrapper from './wrapper/validator-wrapper.svelte';
import ArrayRw from './group/array-rw.svelte';
import type { PiViewConfig } from '@piying/view-svelte';
import { lazyMark } from '@piying/view-core';
export const fieldConfig = {
  types: {
    string: { type: InputText, wrappers: ['label'] },
    number: { type: InputNumber, wrappers: ['label'] },
    radio: { type: InputRadio },
    boolean: { type: InputCheckbox, wrappers: ['label'] },
    fieldset: { type: FieldsetGroup },
    'array-rw': { type: ArrayRw },
    formHelper: { type: lazyMark(() => import('./form-helper.svelte').then((a) => a.default)) },
  },
  wrappers: {
    label: {
      type: LabelWrapper,
    },
    validator: {
      type: ValidatorWrapper,
    },
  },
} as PiViewConfig;
