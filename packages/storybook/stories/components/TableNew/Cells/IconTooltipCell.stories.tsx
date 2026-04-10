import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { InfoFillS, UserM } from '@synerise/ds-icon';
import {
  type BaseIconTooltipCellProps,
  IconTooltipCell,
} from '@synerise/ds-table-new';

import {
  BOOLEAN_CONTROL,
  REACT_NODE_AS_STRING,
  fixedWrapper300,
} from '../../../utils';

const meta: Meta<BaseIconTooltipCellProps> = {
  title: 'Components/TableNew/Cells/IconTooltipCell',
  component: IconTooltipCell,
  tags: ['autodocs', 'new'],
  parameters: { layout: 'centered' },
  decorators: [fixedWrapper300],
  argTypes: {
    label: REACT_NODE_AS_STRING,
    icon: { control: false },
    tooltipIcon: { control: false },
    tooltip: { control: false },
    disabled: BOOLEAN_CONTROL,
  },
};

export default meta;

type Story = StoryObj<BaseIconTooltipCellProps>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<IconTooltipCell
  label="User name"
  icon={{ component: <UserM /> }}
  tooltipIcon={{ component: <InfoFillS /> }}
  tooltip={{ title: 'Additional information about this field' }}
/>`,
      },
    },
  },
  render: (args) => <IconTooltipCell {...args} />,
  args: {
    label: 'User name',
    icon: { component: <UserM /> },
    tooltipIcon: { component: <InfoFillS /> },
    tooltip: { title: 'Additional information about this field' },
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `<IconTooltipCell
  label="Disabled field"
  icon={{ component: <UserM /> }}
  tooltipIcon={{ component: <InfoFillS /> }}
  tooltip={{ title: 'This field is disabled' }}
  disabled
/>`,
      },
    },
  },
  render: (args) => <IconTooltipCell {...args} />,
  args: {
    label: 'Disabled field',
    icon: { component: <UserM /> },
    tooltipIcon: { component: <InfoFillS /> },
    tooltip: { title: 'This field is disabled' },
    disabled: true,
  },
};
