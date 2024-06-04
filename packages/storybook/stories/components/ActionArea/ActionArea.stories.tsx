import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import ActionArea from '@synerise/ds-action-area';
import { fn } from '@storybook/test';

import { BOOLEAN_CONTROL, fixedWrapper400, centeredPaddedWrapper, REACT_NODE_AS_STRING } from '../../utils';


export default {
  component: ActionArea,
  title: 'Components/ActionArea',
  tags: ['autodocs'],
  decorators: [centeredPaddedWrapper],
  render: (args) => <ActionArea {...args} />,
  argTypes: {
    label: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    actionLabel: REACT_NODE_AS_STRING,
    errorText: REACT_NODE_AS_STRING,
    isFullWidth: BOOLEAN_CONTROL,
    buttonProps: {
      control: false
    }
  }
} as Meta<typeof ActionArea>;

type Story = StoryObj<typeof ActionArea>;


export const Default: Story = {
  args: {
    label: 'Label',
    description: 'Very long description',
    actionLabel: 'Define',
    action: fn(),
  },
};

export const CustomisedActionButton: Story = {
  args: {
    ...Default.args,
    buttonProps: {
      type: 'secondary',
    }
  },
};
export const FullWidthActionButton: Story = {
  args: {
    isFullWidth: true,
    ...Default.args,
    buttonProps: {
      type: 'primary',
    }
  },
};
export const WithValidationActionButton: Story = {
  args: {
    isError: true,
    errorText: 'Error',
    ...Default.args,
    buttonProps: {
      type: 'primary',
    }
  },
};
