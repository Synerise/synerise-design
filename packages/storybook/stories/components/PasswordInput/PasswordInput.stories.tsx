import React, { ChangeEvent } from 'react';
import { useArgs } from 'storybook/preview-api';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import { PasswordInput } from '@synerise/ds-input';
import type { InputProps } from '@synerise/ds-input';

import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  PREFIXCLS_ARG_CONTROL,
  REACT_NODE_AS_STRING,
  STRING_CONTROL,
  centeredPaddedWrapper,
  fixedWrapper300,
} from '../../utils';

const defaultRender = (args: InputProps) => {
  const [{ value }, updateArgs] = useArgs();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateArgs({ value: event.target.value });
  };

  return <PasswordInput {...args} value={value} onChange={onChange} />;
};

export default {
  title: 'Components/InputElements/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [fixedWrapper300, centeredPaddedWrapper],
  render: defaultRender,
  argTypes: {
    disabled: BOOLEAN_CONTROL,
    counterLimit: NUMBER_CONTROL,
    error: BOOLEAN_CONTROL,
    expandable: BOOLEAN_CONTROL,
    resetMargin: BOOLEAN_CONTROL,
    prefixCls: PREFIXCLS_ARG_CONTROL,
    readOnly: BOOLEAN_CONTROL,
    allowClear: BOOLEAN_CONTROL,
    className: CLASSNAME_ARG_CONTROL,
    description: REACT_NODE_AS_STRING,
    label: REACT_NODE_AS_STRING,
    tooltip: REACT_NODE_AS_STRING,
    type: STRING_CONTROL,
    tooltipConfig: { control: false },
    errorText: REACT_NODE_AS_STRING,
  },
} as Meta<InputProps>;

type Story = StoryObj<InputProps>;

export const Default: Story = {
  args: {
    value: 'Sample text',
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'Placeholder text',
  },
};

export const Readonly: Story = {
  args: {
    ...Default.args,
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const WithLabelAndDescription: Story = {
  args: {
    label: 'Input Label',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    tooltip: 'Label Tooltip',
  },
};

export const WithCounter: Story = {
  args: {
    ...WithLabelAndDescription.args,
    value: 'Sample text',
    counterLimit: 100,
  },
};

export const WithCustomCounter: Story = {
  args: {
    ...WithLabelAndDescription.args,
    value: 'Sample text',
    renderCustomCounter: (count?: number) =>
      count !== undefined && <>{count} characters billed as 1 SMS</>,
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: true,
  },
};
export const WithErrorMessage: Story = {
  args: {
    ...WithLabelAndDescription.args,
    errorText: 'An error occurred',
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
};
