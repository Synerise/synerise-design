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

const pill = (label: React.ReactNode) => (
  <Button type="secondary" mode="label-icon">
    {label}
    <Icon component={<AngleDownS />} />
  </Button>
);

const meta: Meta<typeof ConditionAddButton> = {
  decorators: [fixedWrapper800],
  title: 'Components/Filter/ConditionBlocks/Blocks/ConditionAddButton',
  component: ConditionAddButton,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof ConditionAddButton>;

/** The add-condition action — the consuming app passes the actual ghost button as children. */
export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionAddButton>
  <Button type="ghost" mode="icon-label">
    <Icon component={<Add2M />} />
    and where
  </Button>
</ConditionAddButton>`,
      },
    },
  },
  render: () => (
    <ConditionAddButton>
      <Button type="ghost" mode="icon-label">
        <Icon component={<Add2M />} />
        and where
      </Button>
    </ConditionAddButton>
  ),
};

/** `withConnector` hangs the action off the row tree line, below the conditions. */
export const WithConnector: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ConditionRows>
  <ConditionRow connector={{ first: true }}>
    <ConditionSlot variant="fill">
      <Button type="secondary" mode="label-icon">
        condition
        <Icon component={<AngleDownS />} />
      </Button>
    </ConditionSlot>
  </ConditionRow>
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
  render: () => (
    <ConditionRows>
      <ConditionRow connector={{ first: true }}>
        <ConditionSlot variant="fill">{pill('condition')}</ConditionSlot>
      </ConditionRow>
      <ConditionAddButton withConnector>
        <Button type="ghost" mode="icon-label">
          <Icon component={<Add2M />} />
          and where
        </Button>
      </ConditionAddButton>
    </ConditionRows>
  ),
};
