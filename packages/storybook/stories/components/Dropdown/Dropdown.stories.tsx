import React, { ReactNode } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import Dropdown from '@synerise/ds-dropdown';
import type { DropdownProps } from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: args => {
    return (
      <Dropdown
        {...args}
      />
    );
  },
  argTypes: {
  },
  args: {
    overlay: <>hello</>
  },
} as Meta<DropdownProps>;

type Story = StoryObj<DropdownProps & { children: ReactNode}>;

export const Default: Story = {
    args: {
        overlay: <div>Dropdown overlay content</div>,
        children: <Button>Click</Button>,
    }
};

