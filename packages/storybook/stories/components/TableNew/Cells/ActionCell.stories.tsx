import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import Button from '@synerise/ds-button';
import Icon, { EditM, TrashM } from '@synerise/ds-icon';
import { ActionCell, type BaseActionCellProps } from '@synerise/ds-table-new';

import { controlFromOptionsArray, fixedWrapper200 } from '../../../utils';

const meta: Meta<BaseActionCellProps> = {
  title: 'Components/TableNew/Cells/ActionCell',
  component: ActionCell,
  tags: ['autodocs', 'new'],
  parameters: { layout: 'centered' },
  decorators: [fixedWrapper200],
  argTypes: {
    contentAlign: controlFromOptionsArray('inline-radio', [
      'left',
      'right',
      'center',
    ]),
  },
};

export default meta;

type Story = StoryObj<BaseActionCellProps>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ActionCell>
  <Button type="ghost" mode="single-icon">
    <Icon component={<EditM />} />
  </Button>
  <Button type="ghost" mode="single-icon">
    <Icon component={<TrashM />} />
  </Button>
</ActionCell>`,
      },
    },
  },
  render: () => (
    <ActionCell>
      <Button type="ghost" mode="single-icon">
        <Icon component={<EditM />} />
      </Button>
      <Button type="ghost" mode="single-icon">
        <Icon component={<TrashM />} />
      </Button>
    </ActionCell>
  ),
};

export const LeftAligned: Story = {
  parameters: {
    docs: {
      source: {
        code: `<ActionCell contentAlign="left" gapSize={8}>
  <Button type="ghost">Edit</Button>
  <Button type="ghost">Delete</Button>
</ActionCell>`,
      },
    },
  },
  render: (args) => (
    <ActionCell {...args}>
      <Button type="ghost">Edit</Button>
      <Button type="ghost">Delete</Button>
    </ActionCell>
  ),
  args: {
    contentAlign: 'left',
    gapSize: 8,
  },
};
