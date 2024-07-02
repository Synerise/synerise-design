import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import ActionArea from '@synerise/ds-action-area';
import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';

import { BOOLEAN_CONTROL, fixedWrapper400, centeredPaddedWrapper, REACT_NODE_AS_STRING } from '../../utils';

export default {
  component: ActionArea,
  title: 'Components/ActionArea',
  tags: ['autodocs'],
  decorators: [centeredPaddedWrapper],
  render: args => <ActionArea {...args} />,
  
  argTypes: {
    label: REACT_NODE_AS_STRING,
    description: REACT_NODE_AS_STRING,
    actionLabel: REACT_NODE_AS_STRING,
    errorText: REACT_NODE_AS_STRING,
    isFullWidth: BOOLEAN_CONTROL,
    buttonProps: {
      control: false,
    },
  },
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
    },
  },
};

export const CustomContent: Story = {
  parameters: {
    controls: {
      exclude: ['actionLabel', 'action', 'buttonProps']
    }
  },
  args: {
    label: 'Choose a template or create a new message',
    customAction: (
      <div style={{display: 'flex', gap: 16}}>
        <Tooltip title="You must first choose mobile push type in the card above">
          <span>
            <Button disabled type="primary">
              Select template
            </Button>
          </span>
        </Tooltip>
        <Tooltip title="You must first choose mobile push type in the card above">
          <span>
            <Button type='secondary' readOnly>
              Create new message
            </Button>
          </span>
        </Tooltip>
      </div>
    ),
  },
};

export const FullWidthActionButton: Story = {
  args: {
    isFullWidth: true,
    ...Default.args,
    buttonProps: {
      type: 'primary',
    },
  },
};
export const WithValidationActionButton: Story = {
  args: {
    isError: true,
    errorText: 'Error',
    ...Default.args,
    buttonProps: {
      type: 'primary',
    },
  },
};
