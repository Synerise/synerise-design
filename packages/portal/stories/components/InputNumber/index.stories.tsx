import * as React from 'react';
import { text, number, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import InputNumber from '@synerise/ds-input-number';

const renderLabel = (text: string) => {
  return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
};
const stories = {
  inputNumber: () => {
    const validationState = boolean('Set validation state', false);
    const message = 'Error';
    const [isFocus, setFocus] = React.useState(false);
    const placeholder = text('Placeholder', 'Placeholder');
    return {
      min: number('min', 1),
      max: number('max', 999999999999),
      onChange: action('onChange'),
      label: renderLabel(text('label', 'Label')),
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
      onBlur: () => {
        action('I am blurred');
        setFocus(false);
      },
      onFocus: () => {
        action('I am focused');
        setFocus(true);
      },
    };
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
