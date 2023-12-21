import type {
  Meta,
  StoryObj
} from '@storybook/react';
import React from 'react';
import DSTable, {
  DSTableProps,
  SELECTION_ALL,
  SELECTION_INVERT,
} from './DSTable';
const meta: Meta < DSTableProps < object >> = {
  title: 'DSTable',
  component: DSTable,
};
export default meta;
const excludedProps = ['loading', 'hideColumnNames', 'disableColumnNamesLineBreak'];
const excludeRegexp = new RegExp(`(${excludedProps.join('|')})`, 'g');
type Story = StoryObj < DSTableProps < object >> ;
const StoryTemplate: Story = {
  render: (args) => <DSTable {...args} />,
};
export const Primary = {
  ...StoryTemplate,
  args: {
    title: 'Table',
    loading: false,
    selection: SELECTION_ALL,
    itemsMenu: [],
    cellSize: 'default',
    dataSource: [],
    roundedHeader: false,
    filters: [],
    searchComponent: null,
    filterComponent: null,
    rowKey: 'id',
    headerWithBorderTop: true,
    hideTitleBar: false,
    grouped: false,
    pagination: false,
    locale: 'en',
    headerButton: null,
    hideColumnNames: false,
    renderSelectionTitle: false,
    hideTitlePart: false,
    disableColumnNamesLineBreak: false,
  },
};