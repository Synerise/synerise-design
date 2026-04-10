import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import {
  type BaseStatusLabelProps,
  StatusLabelCell,
} from '@synerise/ds-table-new';

import {
  BOOLEAN_CONTROL,
  REACT_NODE_AS_STRING,
  controlFromOptionsArray,
  fixedWrapper300,
} from '../../../utils';

const meta: Meta<BaseStatusLabelProps> = {
  title: 'Components/TableNew/Cells/StatusLabelCell',
  component: StatusLabelCell,
  tags: ['autodocs', 'new'],
  parameters: { layout: 'centered' },
  decorators: [fixedWrapper300],
  argTypes: {
    status: controlFromOptionsArray('select', [
      'active',
      'inactive',
      'blocked',
      'processing',
    ]),
    label: REACT_NODE_AS_STRING,
    customColor: { control: false },
    disabled: BOOLEAN_CONTROL,
  },
};

export default meta;

type Story = StoryObj<BaseStatusLabelProps>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<StatusLabelCell status="active" label="Active" />`,
      },
    },
  },
  render: (args) => <StatusLabelCell {...args} />,
  args: {
    status: 'active',
    label: 'Active',
  },
};

export const StatusVariants: Story = {
  parameters: {
    docs: {
      source: {
        code: `<StatusLabelCell status="active" label="Active" />
<StatusLabelCell status="inactive" label="Inactive" />
<StatusLabelCell status="blocked" label="Blocked" />
<StatusLabelCell status="processing" label="Processing" />`,
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <StatusLabelCell status="active" label="Active" />
      <StatusLabelCell status="inactive" label="Inactive" />
      <StatusLabelCell status="blocked" label="Blocked" />
      <StatusLabelCell status="processing" label="Processing" />
    </div>
  ),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `<StatusLabelCell status="active" label="Active" disabled />`,
      },
    },
  },
  render: (args) => <StatusLabelCell {...args} />,
  args: {
    status: 'active',
    label: 'Active',
    disabled: true,
  },
};
