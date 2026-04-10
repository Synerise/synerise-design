import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { theme } from '@synerise/ds-core';
import { VarTypeStringM } from '@synerise/ds-icon';
import {
  type BaseLabelsWithShowMoreProps,
  IconLabelCell,
  LabelsWithShowMore,
} from '@synerise/ds-table-new';

import {
  BOOLEAN_CONTROL,
  NUMBER_CONTROL,
  STRING_CONTROL,
  fixedWrapper300,
} from '../../../utils';

type SampleItem = {
  fieldName: string;
  key: number;
  icon: { component: React.ReactElement; color: string };
};

const meta: Meta<BaseLabelsWithShowMoreProps<SampleItem>> = {
  title: 'Components/TableNew/Cells/LabelsWithShowMore',
  component: LabelsWithShowMore,
  tags: ['autodocs', 'new'],
  parameters: { layout: 'centered' },
  decorators: [fixedWrapper300],
  argTypes: {
    items: { control: false },
    numberOfVisibleItems: NUMBER_CONTROL,
    labelKey: STRING_CONTROL,
    renderItem: { control: false },
    texts: { control: false },
    loading: BOOLEAN_CONTROL,
  },
};

export default meta;

type Story = StoryObj<BaseLabelsWithShowMoreProps<SampleItem>>;

const SAMPLE_ITEMS: SampleItem[] = [
  {
    fieldName: 'Milk',
    key: 0,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Oil',
    key: 1,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Apple',
    key: 2,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Banana',
    key: 3,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Bread',
    key: 4,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
  {
    fieldName: 'Orange',
    key: 5,
    icon: { component: <VarTypeStringM />, color: theme.palette['grey-600'] },
  },
];

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<LabelsWithShowMore
  items={items}
  numberOfVisibleItems={2}
  labelKey="fieldName"
  texts={{
    tooltip: 'Show more',
    searchPlaceholder: 'Search',
    searchClear: 'Clear',
    modalTitle: 'Products',
    records: 'records',
  }}
  renderItem={(label, item) => (
    <IconLabelCell label={label} icon={item.icon} />
  )}
/>`,
      },
    },
  },
  render: (args) => <LabelsWithShowMore {...args} />,
  args: {
    items: SAMPLE_ITEMS,
    numberOfVisibleItems: 2,
    labelKey: 'fieldName',
    texts: {
      tooltip: 'Show more',
      searchPlaceholder: 'Search',
      searchClear: 'Clear',
      modalTitle: 'Products',
      records: 'records',
    },
    renderItem: (label, item) => (
      <IconLabelCell label={label} icon={item.icon} />
    ),
  },
};
