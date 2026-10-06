import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import Button from '@synerise/ds-button';
import {
  ConditionEntity,
  ConditionGroup,
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

const meta: Meta<typeof ConditionGroup> = {
  decorators: [fixedWrapper800],
  title: 'Components/Filter/ConditionBlocks/Blocks/ConditionGroup',
  component: ConditionGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof ConditionGroup>;

/** The outermost wrapper: an entity chip (passed by the implementation) on the left, rows on the right. */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionGroup>
  <ConditionEntity>
    <Button type="custom-color" color="green" mode="label-icon">
      eobuwie
      <Icon component={<AngleDownS />} />
    </Button>
  </ConditionEntity>
  <ConditionRows>
    <ConditionRow connector={{ first: true }}>
      <ConditionSlot variant="rigid">
        <Button type="secondary" mode="label-icon">
          color
          <Icon component={<AngleDownS />} />
        </Button>
      </ConditionSlot>
      <ConditionSlot variant="rigid">
        <Button type="secondary" mode="label-icon">
          In
          <Icon component={<AngleDownS />} />
        </Button>
      </ConditionSlot>
      <ConditionSlot variant="fill">
        <Button type="secondary" mode="label-icon">
          0 items
          <Icon component={<AngleDownS />} />
        </Button>
      </ConditionSlot>
    </ConditionRow>
    <ConditionRow connector={{ last: true }}>
      {/* same three slots as the first row */}
    </ConditionRow>
  </ConditionRows>
</ConditionGroup>`,
      },
    },
  },
  render: () => (
    <ConditionGroup>
      <ConditionEntity>
        <Button type="custom-color" color="green" mode="label-icon">
          eobuwie
          <Icon component={<AngleDownS />} />
        </Button>
      </ConditionEntity>
      <ConditionRows>
        <ConditionRow connector={{ first: true }}>
          <ConditionSlot variant="rigid">{pill('color')}</ConditionSlot>
          <ConditionSlot variant="rigid">{pill('In')}</ConditionSlot>
          <ConditionSlot variant="fill">{pill('0 items')}</ConditionSlot>
        </ConditionRow>
        <ConditionRow connector={{ last: true }}>
          <ConditionSlot variant="rigid">{pill('color')}</ConditionSlot>
          <ConditionSlot variant="rigid">{pill('In')}</ConditionSlot>
          <ConditionSlot variant="fill">{pill('0 items')}</ConditionSlot>
        </ConditionRow>
      </ConditionRows>
    </ConditionGroup>
  ),
};
