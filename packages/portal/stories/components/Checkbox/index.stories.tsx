import * as React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Checkbox from '@synerise/ds-checkbox';

const stories = {
  default: () => ({
    onChange: action('changed'),
    disabled: boolean('disabled', false),
    indeterminate: boolean('indeterminate', false),
    description: text('description', ''),
    errorText: text('errorText', ''),
    children: text('children', 'Option'),
  }),
  solo: () => ({
    onChange: action('changed'),
    disabled: boolean('disabled', false),
    indeterminate: boolean('indeterminate', false),
  }),
  group: () => (
    <Checkbox.Group
      onChange={values => console.log('Checked values', values)}
    >
      <Checkbox
        disabled={boolean('disabled', false)}
        indeterminate={boolean('indeterminate', false)}
        description={text('description', '')}
        errorText={text('errorText', '')}
        value="A"
      >
        {text('children', 'Option')}
      </Checkbox>
      <Checkbox
        disabled={boolean('disabled', false)}
        indeterminate={boolean('indeterminate', false)}
        description={text('description', '')}
        errorText={text('errorText', '')}
        value="B"
      >
        {text('children', 'Option')}
      </Checkbox>
    </Checkbox.Group>
  ),
};

export default {
  name: 'Components|Checkbox',
  stories,
  Component: Checkbox,
};
