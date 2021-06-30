import * as React from 'react';
import CheckboxTristate, { CheckboxTristateChangeEvent } from '@synerise/ds-checkbox-tristate';
import { select, text } from '@storybook/addon-knobs';

const checks = [false, true, undefined];

const stories = {
  default: () => {
    return <CheckboxTristate>Label</CheckboxTristate>
  },
  controlled: () => {
    const checked = select('Set checked', checks, false);

    return (
      <CheckboxTristate 
        // NOTE: select knob replaces undefined with empty string
        checked={typeof checked === 'string' ? undefined : checked}
        onChange={(event: CheckboxTristateChangeEvent) => {
          alert(`Tristate Checkbox is set to: ${checked}, onChange event wants to change it to: ${event.target.checked}`)
        }}
      >Controlled by knobs</CheckboxTristate>
    )
  },
  defaultChecked: () => {
    return (
      <CheckboxTristate defaultChecked>Default true</CheckboxTristate>
    );
  }
};

export default {
  name: 'Components/Checkbox/CheckboxTristate',
  config: {},
  stories,
  Component: CheckboxTristate,
}
