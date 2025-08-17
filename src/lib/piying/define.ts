import InputText from './input-text.svelte'
import InputNumber from './input-number.svelte'
import InputRadio from './input-radio.svelte'
import InputCheckbox from './input-checkbox.svelte'
import FieldsetGroup from './group/fieldset.svelte'
import LabelWrapper from './wrapper/label-wrapper.svelte'
import ValidatorWrapper from './wrapper/validator-wrapper.svelte'
import type { PiViewConfig } from '@piying/view-svelte'
export const fieldConfig = {
  types: {
    string: { type: InputText, wrappers: ['label'] },
    number: { type: InputNumber, wrappers: ['label'] },
    radio: { type: InputRadio },
    boolean: { type: InputCheckbox, wrappers: ['label'] },
    fieldset: { type: FieldsetGroup },
    formHelper: { type: () => import('./form-helper.svelte') },
  },
  wrappers: {
    label: {
      type: LabelWrapper,
    },
    validator: {
      type: ValidatorWrapper,
    },
  },
} as PiViewConfig
