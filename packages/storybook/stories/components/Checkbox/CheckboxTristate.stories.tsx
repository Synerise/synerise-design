import * as React from 'react';
import { select } from '@storybook/addon-knobs';
import CheckboxTristate, { CheckboxTristateChangeEvent, CheckboxTristateProps } from '@synerise/ds-checkbox-tristate';

const checks = [false, true, undefined];

export default {
  title: 'Components/Checkbox/CheckboxTristate',
  component: CheckboxTristate,
};

export const Default = (args: JSX.IntrinsicAttributes & CheckboxTristateProps & { children?: React.ReactNode; }) => <CheckboxTristate {...args}>Label</CheckboxTristate>;

export const Controlled = (args: JSX.IntrinsicAttributes & CheckboxTristateProps & { children?: React.ReactNode; }) => (
  <CheckboxTristate {...args}>
    Controlled by knobs
  </CheckboxTristate>
);

Controlled.args = {
  checked: select('Set checked', checks, false),
  onChange: (event: CheckboxTristateChangeEvent) => {
    const checked = typeof Controlled.args.checked === 'string' ? undefined : Controlled.args.checked;
    alert(`Tristate Checkbox is set to: ${checked}, 
           onChange event wants to change it to: ${event.target.checked}`)
  },
};

export const DefaultChecked = (args: JSX.IntrinsicAttributes & CheckboxTristateProps & { children?: React.ReactNode; }) => <CheckboxTristate {...args}>Default true</CheckboxTristate>;
DefaultChecked.args = {
  defaultChecked: true,
};