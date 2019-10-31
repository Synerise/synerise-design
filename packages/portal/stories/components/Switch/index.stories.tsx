import * as React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Switch from '@synerise/ds-switch';
import markdown from '@/radio/README.md';

const stories = {
  default: () => ({
    defaultChecked: true,
    disabled: boolean('disabled', false),
    onChange: action('onChange'),
    label: text('label', 'Label'),
    description: text('description', 'Description'),
    errorText: text('errorText', 'Error'),
  }),
};

export default {
  name: 'Components|Switch',
  config: {
    notes: {
      markdown,
    },
  },
  stories,
  Component: Switch,
};
