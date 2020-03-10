import * as React from 'react';
import * as moment from 'moment';
import ColumnManager from '@synerise/ds-column-manager';
import { action } from '@storybook/addon-actions';
import { Column } from '@synerise/ds-column-manager/dist/ColumnManagerItem/ColumnManagerItem';
import { text } from '@storybook/addon-knobs';
import Button from '@synerise/ds-button';
import { withState } from '@dump247/storybook-state';
import { SavedView } from '@synerise/ds-column-manager/dist/ColumnManager';


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

const FILTERS = [
  {
    id: '0000',
    name: 'Filter #1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
    created: '01-05-2020 12:02',
    canUpdate: true,
    canDelete: true,
    canDuplicate: true,
    categories: ['My filters', 'All filters'],
    user: {
      firstname: 'Jan',
      lastname: 'Nowak',
    },
    columns: COLUMNS,
  },
  {
    id: '0001',
    name: 'Filter #2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
    created: '01-12-2019 12:02',
    canUpdate: false,
    canDelete: false,
    canDuplicate: true,
    categories: ['All filters'],
    user: {
      firstname: 'Kamil',
      lastname: 'Kowalski',
    },
    columns: COLUMNS,
  },
  {
    id: '0002',
    name: 'Filter #3',
    created: '01-12-2019 12:02',
    canUpdate: false,
    canDelete: false,
    canDuplicate: true,
    categories: ['All filters'],
    user: {
      avatar_url: 'https://www.w3schools.com/howto/img_avatar.png',
      firstname: 'Kamil',
      lastname: 'Kowalski',
    },
    columns: [],
  }
];

const EMPTY_FILTER = {
  id: '0002',
  name: '',
  created: '01-12-2019 12:02',
  canUpdate: true,
  canDelete: true,
  canDuplicate: true,
  categories: ['All filters', 'My filters'],
  user: {
    avatar_url: 'https://www.w3schools.com/howto/img_avatar.png',
    firstname: 'Kamil',
    lastname: 'Kowalski',
  },
  columns: COLUMNS,
};

const getTexts = () => ({
  activateItemTitle: text('Activate item', 'By activating this filter, you will cancel your unsaved filter settings'),
  activate: text('Activate', 'Activate'),
  cancel: text('Cancel', 'Cancel'),
  deleteConfirmationTitle: text('Delete confirmation title', 'Detele filter'),
  deleteConfirmationDescription: text('Delete confirmation description', 'Deleting this filter will permanently remove it from templates library. All tables using this filter will be reset.'),
  deleteLabel: text('Delete', 'Delete'),
  noResults: text('No results', 'No results'),
  searchPlaceholder: text('Search placeholder', 'Search'),
  searchClearTooltip: text('Clear tooltip', 'Clear'),
  title: text('Drawer title', 'Filter'),
});

const getColumnManagerTexts = () => ({
  title: text('Column manager - title', 'Manage columns'),
  searchPlaceholder: text('Column manager - search placeholder', 'Search'),
  noResults: text('Column manager - no results', 'No results'),
  visible: text('Column manager - visible', 'Visible'),
  hidden: text('Column manager - hidden', 'Hidden'),
  saveView: text('Column manager - save view', 'Save view'),
  cancel: text('Column manager - cancel', 'Cancel'),
  apply: text('Column manager - apply', 'Apply'),
  fixedLeft: text('Column manager - fixed left', 'Fixed left'),
  fixedRight: text('Column manager - fixed right', 'Fixed right'),
  clear: text('Column manager - clear', 'Clear'),
  viewName: text('Column manager - view name', 'View name'),
  viewDescription: text('Column manager - view description', 'Description'),
  viewNamePlaceholder: text('Column manager - view name placeholder', 'Placeholder'),
  viewDescriptionPlaceholder: text('Column manager - view description placeholder', 'Placeholder'),
  mustNotBeEmpty: text('Column manager - Error messege', 'Must not be empty'),
  searchClearTooltip: text('Clear tooltip', 'Clear'),
});

const saveFilter = (savedView: SavedView, store) => {
  const id = moment().format('MM-DD-YYYY_HH:mm:ss');
  store.set({
    selectedItemId: id,
    filters: [
      ...store.state.filters,
      {
        ...EMPTY_FILTER,
        name: savedView.meta.name,
        description: savedView.meta.description,
        columns: [...savedView.columns],
        id: id,
        created: moment().format('MM-DD-YYYY HH:mm:ss'),
      }
    ],
  })
};

const removeItem = (props, store): void => {
  store.set({
    items: store.state.items.filter(item => item.id !== props.id),
  });
};

const editItem = (props, store): void => {
  store.set({
    items: store.state.items.map(item => {
      if(item.id === props.id) {
        item.name = props.name;
      }
      return item;
    })
  })
};

const setSelectedItem = (props, store): void => {
  store.set({
    selectedItemId: props.id,
    columns: store.state.filters.filter(filter => filter.id === props.id)[0].columns,
  });
};

const stories = {
  default: withState({
    filters: FILTERS,
    columns: COLUMNS,
    selectedItemId: undefined,
    columnManagerVisible: false,
  })(({ store }) => {

    return (
      <>
        <Button type="primary" mode="simple" onClick={() => store.set({columnManagerVisible: true})}>
          Show column manager
        </Button>
        <ColumnManager
          hide={() => store.set({columnManagerVisible: false})}
          visible={store.state.columnManagerVisible}
          columns={store.state.columns}
          onApply={action('onApply')}
          onSave={(savedView) => saveFilter(savedView, store)}
          texts={getColumnManagerTexts()}
          itemFilterConfig={{
            removeItem: (params) => removeItem(params, store),
            editItem: (params) => editItem(params, store),
            selectItem: (params) => setSelectedItem(params, store),
            duplicateItem: action('duplicate item'),
            selectedItemId: store.state.selectedItemId,
            categories: [{label: 'All filters'}, {label: 'My filters'}],
            items: store.state.filters,
            texts: getTexts(),
          }}
        />
      </>
    )}
  ),
};

export default {
  name: 'Components|ColumnManager',
  config: {},
  stories,
  Component: ColumnManager,
}
