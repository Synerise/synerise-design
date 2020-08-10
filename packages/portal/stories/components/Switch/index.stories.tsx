import * as React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Switch from '@synerise/ds-switch';
import markdown from '@/radio/README.md';

const stories = {
  default: () => ({
    defaultChecked: true,
    disabled: boolean('Disabled', false),
    onChange: action('onChange'),
  }),
  switchWithText: () => ({
    defaultChecked: true,
    disabled: boolean('Disabled', false),
    onChange: action('onChange'),
    label: text('Label', 'Option'),

  }),
  switchWithDescription: () => {
    const hasError = boolean('Set validation state', false);
    const errorMessage = text('Error Text', 'Error');
    const getErrorText = (hasError: boolean): string => {
      if (hasError) {
        return errorMessage;
      } else {
        return '';
      }
    };
    return(
      <Switch
        label={text('Label', 'Option')}
        disabled={boolean('Disabled', false)}
        description={text('Description',"Description")}
        onChange={action('onChange')}
        defaultChecked={true}
        errorText={getErrorText(hasError)}
      />
    );
  },
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
