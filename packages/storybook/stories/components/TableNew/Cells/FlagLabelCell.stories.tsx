import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { type BaseFlagLabelProps, FlagLabelCell } from '@synerise/ds-table-new';

import { STRING_CONTROL, fixedWrapper300 } from '../../../utils';

const meta: Meta<BaseFlagLabelProps> = {
  title: 'Components/TableNew/Cells/FlagLabelCell',
  component: FlagLabelCell,
  tags: ['autodocs', 'new'],
  parameters: { layout: 'centered' },
  decorators: [fixedWrapper300],
  argTypes: {
    countryCode: STRING_CONTROL,
    label: STRING_CONTROL,
  },
};

export default meta;

type Story = StoryObj<BaseFlagLabelProps>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<FlagLabelCell countryCode="PL" label="Poland" />`,
      },
    },
  },
  render: (args) => <FlagLabelCell {...args} />,
  args: {
    countryCode: 'PL',
    label: 'Poland',
  },
};
