import * as React from 'react';

import ColumnManager from '@synerise/ds-column-manager';
import { action } from '@storybook/addon-actions';
import { Column } from '@synerise/ds-column-manager/dist/ColumnManagerItem/ColumnManagerItem';


const COLUMNS: Column[] = [
  {
    id: '0',
    name: 'User name',
    visible: true,
    type: 'text',
    fixed: 'left',
  },
  {
    id: '1',
    name: 'City',
    visible: true,
    type: 'text',
    fixed: undefined,
  },
  {
    id: '2',
    name: 'Language',
    visible: true,
    type: 'text',
    fixed: undefined,
  },
  {
    id: '3',
    name: 'Clients numbers',
    visible: false,
    type: 'number',
    fixed: undefined,
  },
  {
    id: '4',
    name: 'Clients - last 3 years dasdad dasdas dasdad as',
    visible: false,
    type: 'list',
    fixed: undefined,
  },
  {
    id: '5',
    name: 'Client - last week',
    visible: false,
    type: 'list',
    fixed: undefined,
  },
  {
    id: '6',
    name: 'Client - all time',
    visible: false,
    type: 'list',
    fixed: undefined,
  },
  {
    id: '7',
    name: 'Active',
    visible: false,
    type: 'boolean',
    fixed: undefined,
  },
];

const TEXTS = {
  title: "Manage columns",
  searchPlaceholder: "Search",
  noResults: "No results",
  visible: "Visible",
  hidden: "Hidden",
  saveView: "Save view",
  cancel: "Cancel",
  apply: "Apply",
  fixedLeft: "Fixed left",
  fixedRight: "Fixed right",
  clear: "Clear",
  viewName: "View name",
  viewDescription: "Description",
  viewNamePlaceholder: "Placeholder",
  viewDescriptionPlaceholder: "Placeholder",
  mustNotBeEmpty: "Must not be empty",
};

const stories = {
  default: () => (
    <ColumnManager
      hide={action('hide Column Manager')}
      showSavedViews={action('show Item Filter')}
      visible
      columns={COLUMNS}
      onSave={action('SAVE')}
      texts={TEXTS}
    />
  ),
};

export default {
  name: 'Components|ColumnManager',
  config: {},
  stories,
  Component: ColumnManager,
}
