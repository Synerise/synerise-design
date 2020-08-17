import * as React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Checkbox from '@synerise/ds-checkbox';

const stories = {
  default: () => ({
    onChange: action('changed'),
    disabled: boolean('Disabled', false),
    indeterminate: boolean('Set indeterminate state of checkbox', false),
    description: text('Set description', ''),
    errorText: text('Set error message', ''),
    hasError: boolean('Has error', false),
    children: text('Set checkbox label', 'Label'),
  }),
  solo: () => ({
    onChange: action('changed'),
    disabled: boolean('Disabled', false),
    hasError: boolean('Has error', false),
    indeterminate: boolean('Set indeterminate state of checkbox', false),
  }),
  group: () => (
    <Checkbox.Group
      onChange={values => console.log('Checked values', values)}
    >
      <Checkbox
        disabled={boolean('Disabled', false)}
        hasError={boolean('Has error', false)}
        indeterminate={boolean('Set indeterminate state of checkbox', false)}
        description={text('Set description', 'Description')}
        errorText={text('Set error message', '')}
        value="A"
      >
        {text('children', 'Label')}
      </Checkbox>
      <Checkbox
        disabled={boolean('Disabled', false)}
        hasError={boolean('Has error', false)}
        indeterminate={boolean('Set indeterminate state of checkbox', false)}
        description={text('Set description', 'Description')}
        errorText={text('Set error message', '')}
        value="B"
      >
        {text('Set checkbox label', 'Label')}
      </Checkbox>
    </Checkbox.Group>
  ),
};

export default {
name: 'Components/Checkbox',
  stories,
  Component: Checkbox,
};
