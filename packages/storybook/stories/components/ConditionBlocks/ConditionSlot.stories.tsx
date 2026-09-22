import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import Button from '@synerise/ds-button';
import { ConditionRow, ConditionSlot } from '@synerise/ds-condition-blocks';
import Icon, { AngleDownS } from '@synerise/ds-icon';

import { fixedWrapper800 } from '../../utils';

const pill = (label: React.ReactNode) => (
  <Button type="secondary" mode="label-icon">
    {label}
    <Icon component={<AngleDownS />} />
  </Button>
);

const meta: Meta<typeof ConditionSlot> = {
  decorators: [fixedWrapper800],
  title: 'Components/Filter/ConditionBlocks/Blocks/ConditionSlot',
  component: ConditionSlot,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['rigid', 'fill', 'shrink'] },
    grow: { control: 'number' },
    shrink: { control: 'number' },
    minWidth: { control: 'text' },
    maxWidth: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof ConditionSlot>;

/**
 * The three presets side by side: `shrink` collapses first (to its `minWidth`), `rigid`
 * stays fixed, and `fill` absorbs the remaining space.
 */
export const Presets: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionRow>
  <ConditionSlot variant="shrink" minWidth={120}>
    <Button type="secondary" mode="label-icon">
      shrink (parameter)
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionSlot>
  <ConditionSlot variant="rigid">
    <Button type="secondary" mode="label-icon">
      rigid (operator)
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionSlot>
  <ConditionSlot variant="fill">
    <Button type="secondary" mode="label-icon">
      fill (factor)
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionSlot>
</ConditionRow>`,
      },
    },
  },
  render: () => (
    <ConditionRow>
      <ConditionSlot variant="shrink" minWidth={120}>
        {pill('shrink (parameter)')}
      </ConditionSlot>
      <ConditionSlot variant="rigid">{pill('rigid (operator)')}</ConditionSlot>
      <ConditionSlot variant="fill">{pill('fill (factor)')}</ConditionSlot>
    </ConditionRow>
  ),
};

/** Playground — tweak `variant` / `minWidth` / `maxWidth` on the first slot. */
export const Playground: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionRow>
  <ConditionSlot variant="fill">
    <Button type="secondary" mode="label-icon">
      configurable slot
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionSlot>
  <ConditionSlot variant="fill">
    <Button type="secondary" mode="label-icon">
      fill neighbour
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionSlot>
</ConditionRow>`,
      },
    },
  },
  args: { variant: 'fill' },
  render: (args) => (
    <ConditionRow>
      <ConditionSlot {...args}>{pill('configurable slot')}</ConditionSlot>
      <ConditionSlot variant="fill">{pill('fill neighbour')}</ConditionSlot>
    </ConditionRow>
  ),
};
