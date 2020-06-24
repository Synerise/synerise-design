import * as React from 'react';
import { text, number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import InputNumber from "@synerise/ds-input-number";

const stories = {
  inputNumber: () => {
    const validationState = boolean('Set validation state', false)
    const message = 'Error'
    const [isFocus, setFocus] = React.useState(false)
    const placeholder = text('Placeholder', 'Placeholder')
    return {
      min: number('min', 1),
      max: number('max', 10),
      onChange: action('onChange'),
      label: text('label', 'Label'),
      description: text('description', 'Description'),
      errorText:!isFocus && getErrorText(validationState,message),
      error:!isFocus && validationState,
      placeholder: placeholder,
      onBlur:()=>{ action ('I am blurred'); setFocus(false) },
      onFocus: ()=>{ action('I am focused'); setFocus(true)},
    }
  },
};
const decorator = storyFn => <div style={{ width: '286px' }}>{storyFn()}</div>;
const getErrorText = (error: boolean, errorText: string): string => {
  if (error) {
    return errorText;
  } else {
    return '';
  }
};

export default {
  name: 'Components|Input',
  stories,
  decorator,
  Component: InputNumber,
};
