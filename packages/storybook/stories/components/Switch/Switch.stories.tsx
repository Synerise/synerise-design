import * as React from 'react';
import Switch from '@synerise/ds-switch';
import { StoryObj } from '@storybook/react';
import { SwitchProps, SwitchWithDescriptionProps } from './types';

export default {
  title: "Components/Switch",
  component: Switch,
};

export const Default: StoryObj<SwitchProps> = {
  args: {
    hasError: false,
    disabled: false,
    errorMessage: '',
    checked: true,
  },
  argTypes: {
    hasError: { control: 'boolean' },
    disabled: { control: 'boolean' },
    errorMessage: { control: 'text' },
    checked: { control: 'boolean' }
  },
  render: ({ hasError, disabled, errorMessage, checked }) => {
    const [isChecked, setChecked] = React.useState(checked);
    return (
      <Switch
        disabled={disabled}
        onChange={setChecked}
        defaultChecked={true}
        checked={isChecked && !disabled}
        errorText={hasError ? 'Error' : ''}
      />
    );
  }
};

export const SwitchWithText: StoryObj<SwitchProps> = {
  ...Default,
  args: {
    ...Default.args,
    label: 'Option',
    errorMessage: 'Error',
    tooltip: null
  },
  argTypes: {
    ...Default.argTypes,
    label: { control: 'text' },
    errorMessage: { control: 'text' },
    hasError: { control: 'boolean' },
    tooltip: { control: 'text' },
  },
  render: (args) => {
    const [isChecked, setChecked] = React.useState(args.checked);

    return (
      <Switch
        label={args.label}
        disabled={args.disabled}
        onChange={setChecked}
        defaultChecked={true}
        checked={isChecked && !args.disabled}
        errorText={args.hasError ? args.errorMessage : undefined}
        tooltip={args.tooltip}
      />
    );
  },
}

export const SwitchWithDescription: StoryObj<SwitchWithDescriptionProps> = {
  ...SwitchWithText,
  args: {
    ...SwitchWithText.args,
    description: 'Description',
  },
  render: (args) => {
    const [isChecked, setChecked] = React.useState(args.checked);

    return (
      <Switch
        label={args.label}
        description={args.description}
        disabled={args.disabled}
        onChange={setChecked}
        defaultChecked={true}
        checked={isChecked && !args.disabled}
        errorText={args.hasError ? args.errorMessage : undefined}
        tooltip={args.tooltip}
      />
    );
  },
};

SwitchWithDescription.argTypes = {
  ...SwitchWithText.argTypes,
  description: { control: 'text' },
};