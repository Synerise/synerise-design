import { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import {
  type BaseCopyableCellProps,
  CopyableCell,
} from '@synerise/ds-table-new';

import {
  fixedWrapper300,
  NUMBER_CONTROL,
  STRING_CONTROL,
} from '../../../utils';

const meta: Meta<BaseCopyableCellProps> = {
  title: 'Components/TableNew/Cells/CopyableCell',
  component: CopyableCell,
  tags: ['autodocs', 'new'],
  parameters: { layout: 'centered' },
  decorators: [fixedWrapper300],
  argTypes: {
    value: STRING_CONTROL,
    confirmMessage: STRING_CONTROL,
    tooltipTimeout: NUMBER_CONTROL,
  },
};

export default meta;

type Story = StoryObj<BaseCopyableCellProps>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<CopyableCell
  value="de2ba6d0-8cb3-40f7-ad35-adc6b2406214"
  confirmMessage="Copied to clipboard!"
  tooltipTimeout={2000}
/>`,
      },
    },
  },
  render: (args) => <CopyableCell {...args} />,
  args: {
    value: 'de2ba6d0-8cb3-40f7-ad35-adc6b2406214',
    confirmMessage: 'Copied to clipboard!',
    tooltipTimeout: 2000,
  },
};
