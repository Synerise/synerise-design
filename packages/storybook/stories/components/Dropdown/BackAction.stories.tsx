import React from 'react';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import Dropdown, { BackAction } from '@synerise/ds-dropdown';

import { Placeholder } from '../../constants';
import { REACT_NODE_AS_STRING, fixedWrapper400 } from '../../utils';

export default {
  title: 'Components/Dropdown/BackAction',
  component: BackAction,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [fixedWrapper400],
  argTypes: {
    label: REACT_NODE_AS_STRING,
    tooltip: REACT_NODE_AS_STRING,
  },
  args: {
    onClick: fn(),
  },
} as Meta<typeof BackAction>;

type Story = StoryObj<typeof BackAction>;

export const Default: Story = {
  args: {
    label: 'Back action',
    tooltip: 'Tooltip content',
  },
};

export const InsideDropdown: Story = {
  render: (args) => (
    <Dropdown
      overlay={
        <>
          <BackAction {...args} />
          <Placeholder $height={200} />
        </>
      }
      open
      size="small"
    >
      <Button>Dropdown trigger</Button>
    </Dropdown>
  ),
  args: {
    label: 'Back action',
    tooltip: 'Tooltip content',
  },
};
