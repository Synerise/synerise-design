import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import Button from '@synerise/ds-button';
import { ConditionEntity } from '@synerise/ds-condition-blocks';
import Icon, { AngleDownS, CalendarM, NotificationsM } from '@synerise/ds-icon';

import { fixedWrapper800 } from '../../utils';

const meta: Meta<typeof ConditionEntity> = {
  decorators: [fixedWrapper800],
  title: 'Components/Filter/ConditionBlocks/Blocks/ConditionEntity',
  component: ConditionEntity,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    gap: { control: 'number' },
    errorMessage: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof ConditionEntity>;

const chip = (label: string, color: string) => (
  <Button type="custom-color" color={color} mode="label-icon">
    {label}
    <Icon component={<AngleDownS />} />
  </Button>
);

/** A single coloured context chip, passed in by the implementation. */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionEntity gap={12}>
  <Button type="custom-color" color="green" mode="label-icon">
    eobuwie
    <Icon component={<AngleDownS />} />
  </Button>
</ConditionEntity>`,
      },
    },
  },
  args: { gap: 12 },
  render: (args) => (
    <ConditionEntity {...args}>{chip('eobuwie', 'green')}</ConditionEntity>
  ),
};

/**
 * More than one slot — e.g. an event context chip plus its action attribute — laid out in a row
 * with the configurable `gap` (12px default).
 */
export const MultipleSlots: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionEntity>
  <Button type="custom-color" color="cyan" mode="two-icons">
    <Icon component={<NotificationsM />} />
    Page Visit
    <Icon component={<AngleDownS />} />
  </Button>
  <Button type="secondary" mode="two-icons">
    <Icon component={<CalendarM />} />
    TIMESTAMP
    <Icon component={<AngleDownS />} />
  </Button>
</ConditionEntity>`,
      },
    },
  },
  render: (args) => (
    <ConditionEntity {...args}>
      <Button type="custom-color" color="cyan" mode="two-icons">
        <Icon component={<NotificationsM />} />
        Page Visit
        <Icon component={<AngleDownS />} />
      </Button>
      <Button type="secondary" mode="two-icons">
        <Icon component={<CalendarM />} />
        TIMESTAMP
        <Icon component={<AngleDownS />} />
      </Button>
    </ConditionEntity>
  ),
};

/** With a validation message rendered below the entity. */
export const WithError: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionEntity errorMessage="Select a context">
  <Button type="custom-color" color="red" mode="label-icon">
    Choose context
    <Icon component={<AngleDownS />} />
  </Button>
</ConditionEntity>`,
      },
    },
  },
  args: { errorMessage: 'Select a context' },
  render: (args) => (
    <ConditionEntity {...args}>{chip('Choose context', 'red')}</ConditionEntity>
  ),
};
