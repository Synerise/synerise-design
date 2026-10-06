import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import Button from '@synerise/ds-button';
import {
  ConditionAddButton,
  ConditionRow,
  ConditionRows,
  ConditionSlot,
} from '@synerise/ds-condition-blocks';
import Icon, { Add2M, AngleDownS } from '@synerise/ds-icon';

import { fixedWrapper800 } from '../../utils';

const renderDropdownTrigger = (label: React.ReactNode, readOnly?: boolean) => (
  <Button type="secondary" mode={readOnly ? 'label' : 'label-icon'}>
    {label}
    {!readOnly && <Icon component={<AngleDownS />} />}
  </Button>
);

const meta: Meta<typeof ConditionRows> = {
  decorators: [fixedWrapper800],
  title: 'Components/Filter/ConditionBlocks/Blocks/ConditionRows',
  component: ConditionRows,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: { gap: { control: 'number' } },
};

export default meta;

type Story = StoryObj<typeof ConditionRows>;

/** Stacks rows with a configurable vertical `gap` (16px default) plus the add button. */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionRows gap={16}>
  {[0, 1, 2].map((index) => (
    <ConditionRow key={index} connector={{ first: index === 0 }}>
      <ConditionSlot variant="rigid">
        <Button type="secondary" mode="label-icon">
          factor {index + 1}
          <Icon component={<AngleDownS />} />
        </Button>
      </ConditionSlot>
      <ConditionSlot variant="rigid">
        <Button type="secondary" mode="label-icon">
          is
          <Icon component={<AngleDownS />} />
        </Button>
      </ConditionSlot>
      <ConditionSlot variant="fill">
        <Button type="secondary" mode="label-icon">
          value
          <Icon component={<AngleDownS />} />
        </Button>
      </ConditionSlot>
    </ConditionRow>
  ))}
  <ConditionAddButton withConnector>
    <Button type="ghost" mode="icon-label">
      <Icon component={<Add2M />} />
      and where
    </Button>
  </ConditionAddButton>
</ConditionRows>`,
      },
    },
  },
  args: { gap: 16 },
  render: (args) => (
    <ConditionRows {...args}>
      {[0, 1, 2].map((index, _i, all) => (
        <ConditionRow key={`row-${index}`} connector={{ first: index === 0 }}>
          <ConditionSlot variant="rigid">
            {renderDropdownTrigger(`factor ${index + 1}`)}
          </ConditionSlot>
          <ConditionSlot variant="rigid">
            {renderDropdownTrigger('is')}
          </ConditionSlot>
          <ConditionSlot variant="fill">
            {renderDropdownTrigger('value')}
          </ConditionSlot>
        </ConditionRow>
      ))}
      <ConditionAddButton withConnector>
        <Button type="ghost" mode="icon-label">
          <Icon component={<Add2M />} />
          and where
        </Button>
      </ConditionAddButton>
    </ConditionRows>
  ),
};
export const ReadOnly: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionRows gap={16}>
  {[0, 1, 2].map((index, _i, all) => (
    <ConditionRow
      key={index}
      connector={{ first: index === 0, last: index === all.length - 1 }}
    >
      <ConditionSlot variant="rigid">
        <Button type="secondary" mode="label">factor {index + 1}</Button>
      </ConditionSlot>
      <ConditionSlot variant="rigid">
        <Button type="secondary" mode="label">is</Button>
      </ConditionSlot>
      <ConditionSlot variant="fill">
        <Button type="secondary" mode="label">value</Button>
      </ConditionSlot>
    </ConditionRow>
  ))}
</ConditionRows>`,
      },
    },
  },
  args: { gap: 16 },
  render: (args) => (
    <ConditionRows {...args}>
      {[0, 1, 2].map((index, _i, all) => (
        <ConditionRow
          key={`row-${index}`}
          connector={{ first: index === 0, last: index === all.length - 1 }}
        >
          <ConditionSlot variant="rigid">
            {renderDropdownTrigger(`factor ${index + 1}`, true)}
          </ConditionSlot>
          <ConditionSlot variant="rigid">
            {renderDropdownTrigger('is', true)}
          </ConditionSlot>
          <ConditionSlot variant="fill">
            {renderDropdownTrigger('value', true)}
          </ConditionSlot>
        </ConditionRow>
      ))}
    </ConditionRows>
  ),
};
