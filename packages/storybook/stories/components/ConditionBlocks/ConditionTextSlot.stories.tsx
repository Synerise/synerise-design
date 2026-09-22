import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { ConditionTextSlot } from '@synerise/ds-condition-blocks';

import { fixedWrapper800 } from '../../utils';

const meta: Meta<typeof ConditionTextSlot> = {
  decorators: [fixedWrapper800],
  title: 'Components/Filter/ConditionBlocks/Blocks/ConditionTextSlot',
  component: ConditionTextSlot,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: { muted: { control: 'boolean' } },
};

export default meta;

type Story = StoryObj<typeof ConditionTextSlot>;

/** Inline label used between controls in a row. */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionTextSlot>items with the same</ConditionTextSlot>`,
      },
    },
  },
  args: { children: 'items with the same', muted: false },
};

/** Muted variant for secondary hints. */
export const Muted: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionTextSlot muted>optional hint</ConditionTextSlot>`,
      },
    },
  },
  args: { children: 'optional hint', muted: true },
};
