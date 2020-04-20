import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import { ItemsMenu, TableCell } from '@synerise/ds-table';
import faker from 'faker';
import Icon from '@synerise/ds-icon';
import {
  AngleDownS,
  DuplicateM,
  EditM,
  FileDownloadM,
  MailM,
  OptionHorizontalM,
  TrashM,
} from '@synerise/ds-icon/dist/icons';
import Table from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import Switch from '@synerise/ds-switch/dist/Switch';
import ColumnManager, { SavedView } from '@synerise/ds-column-manager/dist/ColumnManager';
import * as moment from 'moment';
import ItemFilter from '@synerise/ds-item-filter/dist/ItemFilter';

const decorator = (storyFn) => (
  <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>
    {storyFn()}
  </div>
);


const dataSource = [...new Array(55)].map((i, k) => ({
  key: k + 1,
  name: faker.name.findName(),
  active: faker.random.boolean(),
  country: faker.random.arrayElement(['us', 'pl', 'de', 'it', 'es', 'ru']),
  age: (Math.random() * 50 + 10).toFixed(0),
}));


const COLUMNS = [
  {
    id: '0',
    name: 'Name',
    key: 'name',
    visible: true,
    type: 'text',
    fixed: undefined
  },
  {
    id: '1',
    name: 'Statux',
    key: 'active',
    visible: true,
    type: 'boolean',
    fixed: undefined
  },
  {
    id: '2',
    name: 'Country',
    key: 'country',
    visible: true,
    type: 'text',
    fixed: undefined
  },
  {
    id: '3',
    name: 'Age',
    key: 'age',
    visible: true,
    type: 'number',
    fixed: undefined
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
    columns: COLUMNS,
  }
];

const EMPTY_FILTER = {
  id: '0003',
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
    columns: [...savedView.columns],
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

const CELL_SIZES = {
  default: 'default',
  medium: 'medium',
  small: 'small',
};

const stories = {
  default: withState({
    selectedRows: [],
    filters: FILTERS,
    columns: COLUMNS,
    selectedItemId: undefined,
    columnManagerVisible: false,
    itemFilterVisible: false,
  })(({store}) => {
    const { selectedRows, columns } = store.state;

    const handleSelectRow = (selectedRowKeys) => {
      store.set({selectedRows: selectedRowKeys});
    };

    const getColumns = () => {
      const mappedColumns = columns.filter(column => column.visible).map(column => {
        switch(column.key){
          case 'active': {
            return {
              ...column,
              title: column.name,
              dataIndex: column.key,
              render: (active) => <Switch onChange={action('Status change')} checked={active} label='' />
            }
          }
          case 'country': {
            return {
              ...column,
              title: column.name,
              dataIndex: column.key,
              render: (country, record) => <TableCell.FlagLabelCell countryCode={country} label={record.name} />
            }
          }
          default:
            return {
              ...column,
              title: column.name,
              dataIndex: column.key,
            };
        }
      });
      return [
        ...mappedColumns,
        {
          render: () => <TableCell.ActionCell>
            <Dropdown
              overlay={
                <Menu style={{padding: 8}}>
                  <Menu.Item onClick={action('Edit')} prefixel={<Icon component={<EditM />} />}>
                    Edit
                  </Menu.Item>
                  <Menu.Item onClick={action('Duplicate')} prefixel={<Icon component={<DuplicateM />} />}>
                    Duplicate
                  </Menu.Item>
                  <Menu.Item onClick={action('Delete')} danger prefixel={<Icon component={<TrashM />} />}>
                    Delete
                  </Menu.Item>
                </Menu>
              }
              trigger='click'>
              <Button type='ghost' mode='single-icon'>
                <Icon component={<OptionHorizontalM/>}/>
              </Button>
            </Dropdown>
          </TableCell.ActionCell>
        }
      ]};

    const duplicateItem = (props): void => {
      const itemForDuplication = store.state.filters.find(item => item.id === props.id);
      store.set({
        // @ts-ignore
        filters: [
          ...store.state.filters,
          {
            ...itemForDuplication,
            id: Date.now(),
            categories: ['My filters', 'All filters'],
            canUpdate: true,
            canDelete: true,
            canDuplicate: true,
            name: `${itemForDuplication.name} - copy`,
          },
        ],
      });
    };

    const toggleItemFilterVisible = (): void => {
      store.set({ itemFilterVisible: !store.state.itemFilterVisible });
    };

    return (
      <>
        <Table
          title={`${dataSource.length} records`}
          dataSource={dataSource}
          columns={getColumns()}
          loading={boolean('Set loading state', false)}
          cellSize={select('Set cells size', CELL_SIZES, CELL_SIZES.default)}
          showColumnManager={() => store.set({columnManagerVisible: true})}
          showItemFilter={() => store.set({itemFilterVisible: true})}
          pagination={{
            showSizeChanger: boolean('pagination.showSizeChanger', true),
            showQuickJumper: boolean('pagination.showQuickJumper', true),
            onChange: action('pageChanged'),
          }}
          selection={boolean('Enable row selection', false) && {
            onChange: handleSelectRow,
            selectedRowKeys: selectedRows,
            selections: [
              Table.SELECTION_ALL,
              Table.SELECTION_VISIBLE,
              Table.SELECTION_INVERT,
              {
                key: 'custom',
                onClick: action('select_custom'),
                label: 'Select custom',
              }
            ],
            setRowSelection: handleSelectRow
          }}
          onSearch={console.log}
          itemsMenu={
            <ItemsMenu>
              <Button onClick={action('Export')} type='secondary' mode='icon-label'>
                <Icon component={<FileDownloadM/>}/>
                Export
              </Button>
              <Button onClick={action('Edit')} type='secondary' mode='icon-label'>
                <Icon component={<EditM/>}/>
                Edit
              </Button>
              <Button onClick={action('Delete')} type='secondary' mode='icon-label'>
                <Icon component={<TrashM/>}/>
                Delete
              </Button>
            </ItemsMenu>
          }
        />
        <ColumnManager
          hide={() => store.set({columnManagerVisible: false})}
          visible={store.state.columnManagerVisible}
          columns={store.state.columns}
          onApply={(columns) => store.set({columns: columns, columnManagerVisible: false})}
          onSave={(savedView) => saveFilter(savedView, store)}
          itemFilterConfig={{
            removeItem: (params) => removeItem(params, store),
            editItem: (params) => editItem(params, store),
            selectItem: (params) => setSelectedItem(params, store),
            duplicateItem: action('duplicate item'),
            selectedItemId: store.state.selectedItemId,
            categories: [{label: 'All filters'}, {label: 'My filters'}],
            items: store.state.filters,
          }}
        />
        <ItemFilter
          visible={store.state.itemFilterVisible}
          hide={toggleItemFilterVisible}
          removeItem={props => removeItem(props, store)}
          editItem={props => editItem(props, store)}
          selectItem={props => setSelectedItem(props, store)}
          duplicateItem={props => duplicateItem(props)}
          selectedItemId={store.state.selectedItemId}
          categories={[{label: 'All filters'}, {label: 'My filters'}]}
          items={store.state.filters}
        />
      </>
    )
  }),
};

export default {
  name: 'Table|Simple table',
  decorator,
  stories,
  Component: Table,
};
