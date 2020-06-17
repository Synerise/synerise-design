import * as React from 'react';
import { text, number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import InputNumber from "@synerise/ds-input-number";

const stories = {
  inputNumber: () => {
    const validationState = boolean('Set validation state', false)
    const message = 'Error'
    const [isFocus, setFocus] = React.useState(false)
    return {
      min: number('min', 1),
      max: number('max', 10),
      defaultValue: number('defaultValue', 3),
      onChange: action('onChange'),
      label: text('label', 'Label'),
      description: text('description', 'Description'),
      errorText:!isFocus && getErrorText(validationState,message),
      error:!isFocus && validationState,
      onBlur:()=>{ action ('I am blurred'); setFocus(false) },
      onFocus: ()=>{ action('I am focused'); setFocus(true)},
    }
  },
};
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
  Component: InputNumber,
};
