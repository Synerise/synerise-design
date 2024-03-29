import * as React from 'react';
import * as moment from 'moment';
import ColumnManager from '@synerise/ds-column-manager';
import { action } from '@storybook/addon-actions';
import { Column } from '@synerise/ds-column-manager/dist/ColumnManagerItem/ColumManagerItem.types';
import { text } from '@storybook/addon-knobs';
import Button from '@synerise/ds-button';
import { withState } from '@dump247/storybook-state';
import { SavedView } from '@synerise/ds-column-manager/dist/ColumnManager.types';
import randomDate from '../../utils/randomDate';

const COLUMNS: Column[] = [
  {
    id: '0',
    key: 'user_name',
    name: 'User name',
    visible: true,
    type: 'text',
    fixed: 'left',
  },
  {
    id: '1',
    key: 'city',
    name: 'City',
    visible: true,
    type: 'text',
    fixed: undefined,
  },
  {
    id: '2',
    key: 'language',
    name: 'Language',
    visible: true,
    type: 'text',
    fixed: undefined,
  },
  {
    id: '3',
    key: 'clients_number',
    name: 'Clients numbers',
    visible: false,
    type: 'number',
    fixed: undefined,
  },
  {
    id: '4',
    key: 'clients',
    name: 'Clients - last 3 years dasdad dasdas dasdad as',
    visible: false,
    type: 'list',
    fixed: undefined,
  },
  {
    id: '5',
    key: 'clients',
    name: 'Client - last week',
    visible: false,
    type: 'list',
    fixed: undefined,
  },
  {
    id: '6',
    key: 'clients',
    name: 'Client - all time',
    visible: false,
    type: 'list',
    fixed: undefined,
  },
  {
    id: '7',
    key: 'clients',
    name: 'Active',
    visible: false,
    type: 'boolean',
    fixed: undefined,
  },
];

const CATEGORIES = [
  {
    label: 'All views',
    hasMore: false,
    items: [
      {
        id: '0000',
        name: 'My view #1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
        created: randomDate(),
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        user: {
          firstname: 'Jan',
          lastname: 'Nowak',
        },
        columns: COLUMNS,
      },
      {
        id: '0001',
        name: 'My view #2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
        created: randomDate(),
        canUpdate: false,
        canDelete: false,
        canDuplicate: true,
        user: {
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
        columns: COLUMNS,
      },
      {
        id: '0002',
        name: 'View',
        created: randomDate(),
        canUpdate: false,
        canDelete: false,
        canDuplicate: true,
        user: {
          avatar_url: 'https://www.w3schools.com/howto/img_avatar.png',
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
        columns: [],
      }
    ],
  },
  {
    label: 'My views',
    hasMore: false,
    items: [
      {
        id: '0000',
        name: 'My view #1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
        created: randomDate(),
        canUpdate: true,
        canDelete: true,
        canDuplicate: true,
        user: {
          firstname: 'Jan',
          lastname: 'Nowak',
        },
        columns: COLUMNS,
      },
      {
        id: '0001',
        name: 'My view #2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do elit',
        created: randomDate(),
        canUpdate: false,
        canDelete: false,
        canDuplicate: true,
        user: {
          firstname: 'Kamil',
          lastname: 'Kowalski',
        },
        columns: COLUMNS,
      }
    ],
  },
];

const EMPTY_FILTER = {
  id: '0002',
  name: '',
  created: randomDate(),
  canUpdate: true,
  canDelete: true,
  canDuplicate: true,
  categories: ['All views', 'My views'],
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
  deleteConfirmationTitle: text('Delete confirmation title', 'Delete view'),
  deleteConfirmationDescription: text('Delete confirmation description', 'Deleting this view will permanently remove it from templates library. All tables using this view will be reset.'),
  deleteConfirmationYes: text('Delete confirmation yes', 'Yes'),
  deleteConfirmationNo: text('Delete confirmation no', 'No'),
  deleteLabel: text('Delete', 'Delete'),
  noResults: text('No results', 'No results'),
  searchPlaceholder: text('Search placeholder', 'Search'),
  searchClearTooltip: text('Clear tooltip', 'Clear'),
  title: text('Drawer title', 'Views list'),
  itemActionRename: text('Rename filter label', 'Rename'),
  itemActionDuplicate: text('Duplicate filter label', 'Duplicate'),
  itemActionDelete: text('Delete filter label', 'Delete'),
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
  group: text('Group', 'Group'),
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
  const newCategories = [...store.state.categories];

  newCategories[0].items = [...newCategories[0].items, {
    ...EMPTY_FILTER,
    name: savedView.meta.name,
    description: savedView.meta.description,
    columns: [...savedView.columns],
    id: id,
    created: moment(),
    groupSettings: savedView.groupSettings,
  }];

  store.set({
    selectedItemId: id,
    categories: newCategories,
    columns: [...savedView.columns],
    groupSettings: savedView.groupSettings,
  })
};

const removeItem = (props, store): void => {
  store.set({
    categories: store.state.categories.map((category) => ({
      ...category,
      items: category.items.filter(item => item.id !== props.id)
    }))
  });
};

const editItem = (props, store): void => {
  store.set({
    categories: store.state.categories.map(category => ({
      ...category,
      items: category.items.map(item => {
        if(item.id === props.id) {
          item.name = props.name;
        }
        return item;
      }),
    }))
  });
};

const setSelectedItem = (props, store): void => {

  let categories = [];
  store.state.categories.forEach(cat => {
    categories = [...categories, ...cat.items];
  });
  store.set({
    selectedItemId: props.id,
    groupSettings: categories.filter(filter => filter.id === props.id)[0].groupSettings || undefined,
    columns: categories.filter(filter => filter.id === props.id)[0].columns,
  });
};

const stories = {
  default: withState({
    columns: COLUMNS,
    categories: CATEGORIES,
    selectedItemId: undefined,
    columnManagerVisible: false,
    groupSettings: undefined,
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
          groupSettings={store.state.groupSettings}
          itemFilterConfig={{
            removeItem: (params) => removeItem(params, store),
            editItem: (params) => editItem(params, store),
            selectItem: (params) => setSelectedItem(params, store),
            duplicateItem: action('duplicate item'),
            selectedItemId: store.state.selectedItemId,
            categories: store.state.categories,
            texts: getTexts(),
          }}
        />
      </>
    )}
  ),
};

export default {
  name: 'Components/Table/Column Manager',
  config: {},
  stories,
  Component: ColumnManager,
}
