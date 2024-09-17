import React from 'react';
import { text, number, boolean, select, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import InputNumber from '@synerise/ds-input-number';


const commonProps = () => {
  const validationState = boolean('Set validation state', false);
  const valueFormatOptions = object('valueFormatOptions', {});
  const message = 'Error';
  const [isFocus, setFocus] = React.useState(false);
  const placeholder = text('Placeholder', 'Placeholder');

  return {
    min: number('min', -100, undefined),
    max: number('max', Number.MAX_SAFE_INTEGER, undefined),
    onChange: (v) => action('onChange')(v),
    label: text('Label', 'Label'),
    description: text('description', 'Description'),
    errorText: !isFocus && getErrorText(validationState, message),
    error: !isFocus && validationState,
    placeholder: placeholder,
    prefixel: text('prefixel', 'Prefixel'),
    suffixel: text('suffixel', 'Suffixel'),
    tooltip: boolean('with simple tooltip', false) && text('Tooltip title', 'Input number tooltip'),
    tooltipConfig: boolean('with advanced tooltip', false) && {
      type: select('select advanced tooltip type', ['default', 'largeSimple', 'header-label'], 'default'),
      title: text('Tooltip title', 'Input number tooltip'),
      description: text(
        'Tooltip description',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      ),
    },
    valueFormatOptions: valueFormatOptions,
    onBlur: (v) => {
      action('I am blurred')(v.currentTarget.value);
      setFocus(false);
    },
    onFocus: () => {
      action('I am focused');
      setFocus(true);
    },
  };
}

const stories = {
  inputNumber: () => {
    return { ...commonProps()}
    
  },

  inputNumberWithDefaultValue: () => {
    
    const defaultValue = number('Default value', 0);
    
    return { ...commonProps(), defaultValue}
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
  name: 'Components/Input',
  stories,
  decorator,
  Component: InputNumber,
};
