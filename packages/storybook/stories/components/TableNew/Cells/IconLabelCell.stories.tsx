import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { UserM } from '@synerise/ds-icon';
import { type BaseIconLabelProps, IconLabelCell } from '@synerise/ds-table-new';

import {
  BOOLEAN_CONTROL,
  REACT_NODE_AS_STRING,
  fixedWrapper300,
} from '../../../utils';

const meta: Meta<BaseIconLabelProps> = {
  title: 'Components/TableNew/Cells/IconLabelCell',
  component: IconLabelCell,
  tags: ['autodocs', 'new'],
  parameters: { layout: 'centered' },
  decorators: [fixedWrapper300],
  argTypes: {
    label: REACT_NODE_AS_STRING,
    icon: { control: false },
    disabled: BOOLEAN_CONTROL,
  },
};

export default meta;

type Story = StoryObj<BaseIconLabelProps>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<IconLabelCell
  label="Charlotte Stiedemann"
  icon={{ component: <UserM />, color: '#6a7580' }}
/>`,
      },
    },
  },
  render: (args) => <IconLabelCell {...args} />,
  args: {
    label: 'Charlotte Stiedemann',
    icon: { component: <UserM />, color: '#6a7580' },
  },
};

export const LabelOnly: Story = {
  parameters: {
    docs: {
      source: {
        code: `<IconLabelCell label="Plain text value" />`,
      },
    },
  },
  render: (args) => <IconLabelCell {...args} />,
  args: {
    label: 'Plain text value',
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `<IconLabelCell
  label="Inactive user"
  icon={{ component: <UserM />, color: '#6a7580' }}
  disabled
/>`,
      },
    },
  },
  render: (args) => <IconLabelCell {...args} />,
  args: {
    label: 'Inactive user',
    icon: { component: <UserM />, color: '#6a7580' },
    disabled: true,
  },
};
