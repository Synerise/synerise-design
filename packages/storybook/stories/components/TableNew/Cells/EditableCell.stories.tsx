import React, { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import {
  type BaseEditableCellProps,
  EditableCell,
} from '@synerise/ds-table-new';

import { STRING_CONTROL, fixedWrapper300 } from '../../../utils';

const meta: Meta<BaseEditableCellProps> = {
  title: 'Components/TableNew/Cells/EditableCell',
  component: EditableCell,
  tags: ['autodocs', 'new'],
  parameters: { layout: 'centered' },
  decorators: [fixedWrapper300],
  argTypes: {
    value: STRING_CONTROL,
    onChange: { control: false },
    placeholder: STRING_CONTROL,
  },
};

export default meta;

type Story = StoryObj<BaseEditableCellProps>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<EditableCell
  value="Product name"
  onChange={(newValue) => setValue(newValue)}
  placeholder="Enter name..."
/>`,
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('Product name');
    return (
      <EditableCell
        value={value}
        onChange={setValue}
        placeholder="Enter name..."
      />
    );
  },
};

export const EmptyWithPlaceholder: Story = {
  parameters: {
    docs: {
      source: {
        code: `<EditableCell
  value=""
  onChange={(newValue) => setValue(newValue)}
  placeholder="Click to edit..."
/>`,
      },
    },
  },
  render: () => {
    const [value, setValue] = useState('');
    return (
      <EditableCell
        value={value}
        onChange={setValue}
        placeholder="Click to edit..."
      />
    );
  },
};
