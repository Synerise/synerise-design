import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import {
  type BaseInputNumberCellProps,
  InputNumberCell,
} from '@synerise/ds-table-new';

import { BOOLEAN_CONTROL, fixedWrapper300 } from '../../../utils';

const meta: Meta<BaseInputNumberCellProps> = {
  title: 'Components/TableNew/Cells/InputNumberCell',
  component: InputNumberCell,
  tags: ['autodocs', 'new'],
  parameters: { layout: 'centered' },
  decorators: [fixedWrapper300],
  argTypes: {
    inputNumberProps: { control: false },
    disabled: BOOLEAN_CONTROL,
  },
};

export default meta;

type Story = StoryObj<BaseInputNumberCellProps>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<InputNumberCell
  inputNumberProps={{ value: 42, min: 0, max: 100 }}
/>`,
      },
    },
  },
  render: (args) => <InputNumberCell {...args} />,
  args: {
    inputNumberProps: { value: 42, min: 0, max: 100 },
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `<InputNumberCell
  inputNumberProps={{ value: 99 }}
  disabled
/>`,
      },
    },
  },
  render: (args) => <InputNumberCell {...args} />,
  args: {
    inputNumberProps: { value: 99 },
    disabled: true,
  },
};
