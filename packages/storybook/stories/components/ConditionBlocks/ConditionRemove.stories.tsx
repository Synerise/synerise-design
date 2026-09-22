import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import Button from '@synerise/ds-button';
import {
  ConditionRemove,
  ConditionRow,
  ConditionSlot,
} from '@synerise/ds-condition-blocks';
import Icon, { AngleDownS } from '@synerise/ds-icon';

import { fixedWrapper800 } from '../../utils';

const pill = (label: React.ReactNode) => (
  <Button type="secondary" mode="label-icon">
    {label}
    <Icon component={<AngleDownS />} />
  </Button>
);

const meta: Meta<typeof ConditionRemove> = {
  decorators: [fixedWrapper800],
  title: 'Components/Filter/ConditionBlocks/Blocks/ConditionRemove',
  component: ConditionRemove,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    revealOnRowHover: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ConditionRemove>;

/** Lives in the last slot of a row; hidden until the row is hovered (hover the row to reveal). */
export const Default: Story = {
  args: { revealOnRowHover: true },
  parameters: {
    docs: {
      source: {
        code: `<ConditionRow>
  <ConditionSlot variant="fill">
    <Button type="secondary" mode="label-icon">
      value
      <Icon component={<AngleDownS />} />
    </Button>
    <ConditionRemove />
  </ConditionSlot>
</ConditionRow>`,
      },
    },
  },
  render: (args) => (
    <ConditionRow>
      <ConditionSlot variant="fill">
        {pill('value')}
        <ConditionRemove {...args} />
      </ConditionSlot>
    </ConditionRow>
  ),
};

/** `revealOnRowHover={false}` keeps it permanently visible. */
export const AlwaysVisible: Story = {
  args: { revealOnRowHover: false },
  parameters: {
    docs: {
      source: {
        code: `<ConditionRow>
  <ConditionSlot variant="fill">
    <Button type="secondary" mode="label-icon">
      value
      <Icon component={<AngleDownS />} />
    </Button>
    <ConditionRemove revealOnRowHover={false} />
  </ConditionSlot>
</ConditionRow>`,
      },
    },
  },
  render: (args) => (
    <ConditionRow>
      <ConditionSlot variant="fill">
        {pill('value')}
        <ConditionRemove {...args} />
      </ConditionSlot>
    </ConditionRow>
  ),
};
