import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import Button from '@synerise/ds-button';
import {
  ConditionConnector,
  ConditionRow,
  ConditionRows,
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

const meta: Meta<typeof ConditionConnector> = {
  decorators: [fixedWrapper800],
  title: 'Components/Filter/ConditionBlocks/Blocks/ConditionConnector',
  component: ConditionConnector,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    first: { control: 'boolean' },
    last: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof ConditionConnector>;

/** A single connector next to a control. Toggle `first` / `last` to see the tree stubs. */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionRow connector={{ first: true, last: true }}>
  <ConditionSlot variant="fill">
    <Button type="secondary" mode="label-icon">
      factor
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionSlot>
</ConditionRow>`,
      },
    },
  },
  args: { first: true, last: true },
  render: (args) => (
    <ConditionRow connector={args}>
      <ConditionSlot variant="fill">{pill('factor')}</ConditionSlot>
    </ConditionRow>
  ),
};

/** The connector drawn across a multi-row group (first → middle → last). */
export const AcrossRows: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionRows>
  {['first', 'middle', 'last'].map((label, index, all) => (
    <ConditionRow
      key={label}
      connector={{ first: index === 0, last: index === all.length - 1 }}
    >
      <ConditionSlot variant="fill">
        <Button type="secondary" mode="label-icon">
          {label} row
          <Icon component={<AngleDownS />} />
        </Button>
      </ConditionSlot>
    </ConditionRow>
  ))}
</ConditionRows>`,
      },
    },
  },
  render: () => (
    <ConditionRows>
      {['first', 'middle', 'last'].map((label, index, all) => (
        <ConditionRow
          key={label}
          connector={{ first: index === 0, last: index === all.length - 1 }}
        >
          <ConditionSlot variant="fill">{pill(`${label} row`)}</ConditionSlot>
        </ConditionRow>
      ))}
    </ConditionRows>
  ),
};
