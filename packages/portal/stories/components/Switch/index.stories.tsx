import * as React from 'react';
import { text, boolean } from '@storybook/addon-knobs';

import Switch from '@synerise/ds-switch';
import markdown from '@/radio/README.md';

const stories = {
  default: () => {
    const hasError = boolean('Set validation state', false);
    const disabled = boolean('Disabled', false);
    const [checked, setChecked] = React.useState(true);
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
        disabled={disabled}
        onChange={setChecked}
        defaultChecked={true}
        checked={checked && !disabled}
        errorText={getErrorText(hasError)}
      />
    );
  },
  switchWithText: () => {
    const hasError = boolean('Set validation state', false);
    const disabled = boolean('Disabled', false);
    const [checked, setChecked] = React.useState(true);
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
        disabled={disabled}
        onChange={setChecked}
        defaultChecked={true}
        checked={checked && !disabled}
        errorText={getErrorText(hasError)}
      />
    );
  },
  switchWithDescription: () => {
    const hasError = boolean('Set validation state', false);
    const errorMessage = text('Error Text', 'Error');
    const disabled = boolean('Disabled', false);
    const [checked, setChecked] = React.useState(true);
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
        disabled={disabled}
        description={text('Description',"Description")}
        onChange={setChecked}
        defaultChecked={true}
        checked={checked && !disabled}
        errorText={getErrorText(hasError)}
      />
    );
  },
};

export default {
name: 'Components/Switch',
  config: {
    notes: {
      markdown,
    },
  },
  stories,
  Component: Switch,
};
