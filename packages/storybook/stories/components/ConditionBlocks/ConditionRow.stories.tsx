import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import Button from '@synerise/ds-button';
import {
  ConditionRow,
  ConditionSlot,
  ConditionTextSlot,
} from '@synerise/ds-condition-blocks';
import Icon, { AngleDownS } from '@synerise/ds-icon';
import { Input } from '@synerise/ds-input';

import { fixedWrapper800 } from '../../utils';

const pill = (label: React.ReactNode) => (
  <Button type="secondary" mode="label-icon">
    {label}
    <Icon component={<AngleDownS />} />
  </Button>
);

const meta: Meta<typeof ConditionRow> = {
  decorators: [fixedWrapper800],
  title: 'Components/Filter/ConditionBlocks/Blocks/ConditionRow',
  component: ConditionRow,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    align: {
      control: 'inline-radio',
      options: ['start', 'center', 'baseline'],
    },
    gap: { control: 'number' },
  },
};

export default meta;

type Story = StoryObj<typeof ConditionRow>;

/** A row of factor / operator / value slots. */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionRow align="center" gap={8}>
  <ConditionSlot variant="rigid">
    <Button type="secondary" mode="label-icon">
      factor
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionSlot>
  <ConditionSlot variant="rigid">
    <Button type="secondary" mode="label-icon">
      operator
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionSlot>
  <ConditionSlot variant="fill">
    <Input
      autoResize={{ minWidth: '173px', stretchToFit: true }}
      placeholder="Value"
      resetMargin
    />
  </ConditionSlot>
</ConditionRow>`,
      },
    },
  },
  args: { align: 'center', gap: 8 },
  render: (args) => (
    <ConditionRow {...args}>
      <ConditionSlot variant="rigid">{pill('factor')}</ConditionSlot>
      <ConditionSlot variant="rigid">{pill('operator')}</ConditionSlot>
      <ConditionSlot variant="fill">
        <Input
          autoResize={{ minWidth: '173px', stretchToFit: true }}
          placeholder="Value"
          resetMargin
        />
      </ConditionSlot>
    </ConditionRow>
  ),
};

export const WithError: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionRow align="center" gap={8} errorMessage="Error message content">
  <ConditionSlot variant="rigid">
    <Button type="secondary" mode="label-icon">
      factor
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionSlot>
  <ConditionSlot variant="rigid">
    <Button type="secondary" mode="label-icon">
      operator
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionSlot>
  <ConditionSlot variant="fill">
    <Input
      autoResize={{ minWidth: '173px', stretchToFit: true }}
      placeholder="Value"
      resetMargin
    />
  </ConditionSlot>
</ConditionRow>`,
      },
    },
  },
  args: { align: 'center', gap: 8, errorMessage: 'Error message content' },
  render: (args) => (
    <ConditionRow {...args}>
      <ConditionSlot variant="rigid">{pill('factor')}</ConditionSlot>
      <ConditionSlot variant="rigid">{pill('operator')}</ConditionSlot>
      <ConditionSlot variant="fill">
        <Input
          autoResize={{ minWidth: '173px', stretchToFit: true }}
          placeholder="Value"
          resetMargin
        />
      </ConditionSlot>
    </ConditionRow>
  ),
};

export const WithConnector: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionRow align="center" gap={8} connector={{ first: true, last: true }}>
  <ConditionSlot variant="rigid">
    <Button type="secondary" mode="label-icon">
      factor
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionSlot>
  <ConditionSlot variant="rigid">
    <Button type="secondary" mode="label-icon">
      operator
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionSlot>
  <ConditionSlot variant="fill">
    <Input
      autoResize={{ minWidth: '173px', stretchToFit: true }}
      placeholder="Value"
      resetMargin
    />
  </ConditionSlot>
</ConditionRow>`,
      },
    },
  },
  args: { align: 'center', gap: 8, connector: { first: true, last: true } },
  render: (args) => (
    <ConditionRow {...args}>
      <ConditionSlot variant="rigid">{pill('factor')}</ConditionSlot>
      <ConditionSlot variant="rigid">{pill('operator')}</ConditionSlot>
      <ConditionSlot variant="fill">
        <Input
          autoResize={{ minWidth: '173px', stretchToFit: true }}
          placeholder="Value"
          resetMargin
        />
      </ConditionSlot>
    </ConditionRow>
  ),
};

/** `align="center"` keeps text and controls aligned in interleaved rows. */
export const TextInterleaved: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionRow align="center" gap={8}>
  <ConditionTextSlot>Show only</ConditionTextSlot>
  <ConditionSlot variant="rigid">
    <Input
      autoResize={{ minWidth: '72px', stretchToFit: true }}
      defaultValue="3"
      resetMargin
    />
  </ConditionSlot>
  <ConditionTextSlot>items with the same</ConditionTextSlot>
  <ConditionSlot variant="fill">
    <Button type="secondary" mode="label-icon">
      brand
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionSlot>
</ConditionRow>`,
      },
    },
  },
  args: { align: 'center', gap: 8 },
  render: (args) => (
    <ConditionRow {...args}>
      <ConditionTextSlot>Show only</ConditionTextSlot>
      <ConditionSlot variant="rigid">
        <Input
          autoResize={{ minWidth: '72px', stretchToFit: true }}
          defaultValue="3"
          resetMargin
        />
      </ConditionSlot>
      <ConditionTextSlot>items with the same</ConditionTextSlot>
      <ConditionSlot variant="fill">{pill('brand')}</ConditionSlot>
    </ConditionRow>
  ),
};
