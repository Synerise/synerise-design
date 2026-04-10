import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import Icon, { LockM } from '@synerise/ds-icon';
import { type BaseTagIconProps, TagIconCell } from '@synerise/ds-table-new';
import Tag, { TagShape } from '@synerise/ds-tag';

import {
  BOOLEAN_CONTROL,
  REACT_NODE_NO_CONTROL,
  fixedWrapper300,
} from '../../../utils';

const meta: Meta<BaseTagIconProps> = {
  title: 'Components/TableNew/Cells/TagIconCell',
  component: TagIconCell,
  tags: ['autodocs', 'new'],
  parameters: { layout: 'centered' },
  decorators: [fixedWrapper300],
  argTypes: {
    children: REACT_NODE_NO_CONTROL,
    disabled: BOOLEAN_CONTROL,
  },
};

export default meta;

type Story = StoryObj<BaseTagIconProps>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TagIconCell>
  <Tag shape="status_neutral" name="Draft" />
  <Icon component={<LockM />} color="#949ea6" />
</TagIconCell>`,
      },
    },
  },
  render: (args) => (
    <TagIconCell {...args}>
      <Tag shape={TagShape.STATUS_NEUTRAL} name="Draft" />
      <Icon component={<LockM />} color="#949ea6" />
    </TagIconCell>
  ),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `<TagIconCell disabled>
  <Tag shape="status_neutral" name="Draft" />
  <Icon component={<LockM />} color="#949ea6" />
</TagIconCell>`,
      },
    },
  },
  render: (args) => (
    <TagIconCell {...args}>
      <Tag shape={TagShape.STATUS_NEUTRAL} name="Draft" />
      <Icon component={<LockM />} color="#949ea6" />
    </TagIconCell>
  ),
  args: {
    disabled: true,
  },
};
