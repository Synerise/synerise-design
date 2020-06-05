import { boolean, number, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import { ItemsMenu, TableCell } from '@synerise/ds-table';
import faker from 'faker';
import Icon from '@synerise/ds-icon';
import {
  DuplicateM,
  EditM,
  FileDownloadM, FilterM, Grid2M,
  OptionHorizontalM,
  TrashM, VarTypeBooleanM, VarTypeDateM, VarTypeListM, VarTypeNumberM,
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
import Result from '@synerise/ds-result';
import ModalProxy from '@synerise/ds-modal';
import { COLUMNS, EMPTY_VIEW, CATEGORIES, VIEWS } from './content/withFiltersAndSearch.data';
import { FilterElement } from '@synerise/ds-search/dist/Search.types';
import Divider from '@synerise/ds-divider';
import Search from '@synerise/ds-search';
import VarTypeStringM from '@synerise/ds-icon/dist/icons/VarTypeStringM';
import Tooltip from '@synerise/ds-tooltip';

const decorator = (storyFn) => (
  <div style={{ padding: 20, width: '100vw', minWidth: '100%', position: 'absolute', top: 0, left: 0}}>
    {storyFn()}
  </div>
);

const dataSource = [];

const saveFilter = (savedView: SavedView, store) => {
  const id = moment().format('MM-DD-YYYY_HH:mm:ss');
  const newViews = [...store.state.savedViews];
  newViews[0].items = [...newViews[0].items, {
    ...EMPTY_VIEW,
    name: savedView.meta.name,
    description: savedView.meta.description,
    columns: [...savedView.columns],
    id: id,
    created: moment().format('MM-DD-YYYY HH:mm:ss'),
  }];

  store.set({
    selectedView: id,
    savedViews: newViews,
    columns: [...savedView.columns],
  })
};

const removeItem = (props, store): void => {
  store.set({
    categories: store.state.categories.map(category => ({
      ...category,
      items: category.items.filter(item => item.id !== props.id),
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
  })
};

const setSelectedFilter = (props, store): void => {
  store.set({
    selectedFilter: props.id,
    columns: store.state.savedViews.filter(filter => filter.id === props.id)[0].columns,
  });
};

const setSelectedView = (props, store): void => {
  store.set({
    selectedView: props.id,
    columns: store.state.filters.filter(filter => filter.id === props.id)[0].columns,
  });
};

const CELL_SIZES = {
  default: 'default',
  medium: 'medium',
  small: 'small',
};

const COLUMN_ICONS = {
  text: <VarTypeStringM />,
  number: <VarTypeNumberM />,
  list: <VarTypeListM />,
  boolean: <VarTypeBooleanM />,
  date: <VarTypeDateM />
};

const parameters = COLUMNS.map((column) => ({
  text: column.name,
  icon: COLUMN_ICONS[column.type]
}));

const recent = dataSource.map(record => ({
  text: record.name,
  filter: 'name',
}));

const getSuggestions = (value) => {
  if(value) {
    const paramName = value.toLowerCase();
    const allSuggestions = dataSource.map(record => {
      const value = {
        name: record.name,
        age: record.age,
        status: record.active.toString(),
        country: record.country.name
      };

      return {
        text: value[paramName],
        filter: paramName
      }
    });
    return allSuggestions.reduce((unique, item) => {
      const exist = unique.find((record) => record.text === item.text);
      return exist ? unique : [...unique, item];
    }, []);
  }
  return [];
};

const stories = {
  default: withState({
    selectedRows: [],
    categories: CATEGORIES,
    savedViews: VIEWS,
    columns: COLUMNS,
    selectedView: undefined,
    selectedFilter: undefined,
    savedViewsVisible: false,
    columnManagerVisible: false,
    itemFilterVisible: false,
    modalVisible: false,
    searchValue: '',
    searchFilterValue: '',
    searchSuggestions: []
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
              render: (active) => <Tooltip title={active ? 'Switch off' : 'Switch on'} placement="topLeft"><Switch onChange={action('Status change')} checked={active} label='' /></Tooltip>
            }
          }
          case 'country': {
            return {
              ...column,
              title: column.name,
              dataIndex: column.key,
              render: (country) => <TableCell.FlagLabelCell countryCode={country.code} label={country.name} />
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
              trigger={['click']}>
              <Button type='ghost' mode='single-icon'>
                <Icon component={<OptionHorizontalM/>}/>
              </Button>
            </Dropdown>
          </TableCell.ActionCell>
        }
      ]};

    const toggleItemFilterVisible = (): void => {
      store.set({ itemFilterVisible: !store.state.itemFilterVisible });
    };

    const selectedView = () => {
      let allItems = [];
      store.state.savedViews.forEach(cat => {
        allItems = [...allItems, ...cat.items];
      });
      return allItems.find(filter => filter.id === store.state.selectedView);
    };

    const selectedFilter = () => {
      let allItems = [];
      store.state.categories.forEach(cat => {
        allItems = [...allItems, ...cat.items];
      });
      return allItems.find(filter => filter.id === store.state.selectedFilter);
    };

    const filteredDataSource = () => {
      if(store.state.searchFilterValue && store.state.searchValue) {
        return dataSource.filter(record => {
          const value = {
            name: record.name,
            age: record.age,
            status: record.active.toString(),
            country: record.country.name
          };
          return value[store.state.searchFilterValue.toLowerCase()].includes(store.state.searchValue);
        });
      }
      return !store.state.searchValue ? dataSource : dataSource.filter(record => {
        return record.name.toLowerCase().includes(store.state.searchValue.toLowerCase());
      });
    };

    return (
      <>
        <Table
          title={`${filteredDataSource().length} ${text('Set name of table items', 'records')}`}
          dataSource={filteredDataSource()}
          columns={getColumns()}
          loading={boolean('Set loading state', false)}
          cellSize={select('Set cells size', CELL_SIZES, CELL_SIZES.default)}
          filters={
            [
              {
                key: 'view',
                icon: <Grid2M />,
                tooltips: { default: 'Table view', clear: 'Clear view', define: 'Define view', list: 'Saved views' },
                openedLabel: 'Define',
                showList: () => store.set({savedViewsVisible: true}),
                show: () => store.set({columnManagerVisible: true}),
                handleClear: () => store.set({selectedView: undefined}),
                selected: selectedView(),
              },
              {
                key: 'filter',
                icon: <FilterM />,
                tooltips: { default: 'Filter', clear: 'Clear filter', define: 'Define filter', list: 'Saved filters' },
                openedLabel: 'Define',
                showList: () => store.set({itemFilterVisible: true}),
                show: () => store.set({modalVisible: true}),
                handleClear: () => store.set({selectedFilter: undefined}),
                selected: selectedFilter(),
              }
            ]
          }
          pagination={{
            showSizeChanger: boolean('Show size changer', true),
            showQuickJumper: boolean('Show quick jumper', true),
            onChange: action('pageChanged'),
          }}
          rowKey={row => row.key}
          selection={boolean('Enable row selection', false) && {
            onChange: handleSelectRow,
            selectedRowKeys: selectedRows,
            selections: [
              Table.SELECTION_ALL,
              {
                key: 'custom',
                onClick: action('select_custom'),
                label: 'Select custom',
              }
            ],
          }}
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
          searchComponent={
            <Search
              clearTooltip= 'Clear'
              placeholder= 'Search'
              width={300}
              parameters={parameters.slice(0, number('Parameters count', 5))}
              recent={recent.slice(0, number('Recent count', 5))}
              suggestions={store.state.searchSuggestions}
              value={store.state.searchValue}
              parameterValue={store.state.searchFilterValue}
              onValueChange={value => {
                store.set({searchValue: value});
              }}
              onParameterValueChange={value => {
                store.set({
                  searchFilterValue: value,
                  searchSuggestions: getSuggestions(value),
                });

              }}
              recentDisplayProps={{
                tooltip: 'Recent',
                title: 'Recent',
                rowHeight: 32,
                visibleRows: 3,
                itemRender: (item: FilterElement) => <Menu.Item onItemHover={(): void => {}}>{item && item.text}</Menu.Item>,
                divider: (
                  <div style={{ padding: '12px', paddingBottom: '0px' }}>
                    {' '}
                    <Divider dashed={true} />{' '}
                  </div>
                ),
              }}
              parametersDisplayProps={{
                tooltip: 'Parameters',
                title: 'Parameters',
                rowHeight: 32,
                visibleRows: 6,
                itemRender: (item: FilterElement) => (
                  <Menu.Item
                    highlight={store.state.searchValue}
                    onItemHover={(): void => {}}
                    prefixel={item && <Icon component={item && item.icon} />}
                  >
                    {item && item.text}
                  </Menu.Item>
                ),
              }}
              suggestionsDisplayProps={{
                tooltip: 'Suggestions',
                title: 'Suggestions',
                rowHeight: 32,
                visibleRows: 6,
                itemRender: (item: FilterElement) => <Menu.Item onItemHover={(): void => {}}>{item && item.text}</Menu.Item>,
              }}
            />
          }
        />
        <ColumnManager
          hide={() => store.set({columnManagerVisible: false})}
          visible={store.state.columnManagerVisible}
          savedViewsVisible={store.state.savedViewsVisible}
          hideSavedViews={() => store.set({savedViewsVisible: false})}
          columns={store.state.columns}
          onApply={(columns) => store.set({columns: columns, columnManagerVisible: false})}
          onSave={(savedView) => saveFilter(savedView, store)}
          itemFilterConfig={{
            removeItem: (params) => removeItem(params, store),
            editItem: (params) => editItem(params, store),
            selectItem: (params) => setSelectedView(params, store),
            duplicateItem: action('duplicate item'),
            selectedItemId: store.state.selectedView,
            categories: store.state.savedViews,
            texts: {
              activateItemTitle: 'By activating this view, you will cancel your unsaved view settings',
              activate:  'Activate',
              cancel: 'Cancel',
              deleteConfirmationTitle: 'Delete view',
              deleteConfirmationDescription: 'Deleting this view will permanently remove it from templates library. All tables using this view will be reset.',
              deleteLabel: 'Delete',
              noResults: 'No results',
              searchPlaceholder: 'Search',
              searchClearTooltip: 'Clear',
              title: 'Views',
            }
          }}
        />
        <ItemFilter
          visible={store.state.itemFilterVisible}
          hide={toggleItemFilterVisible}
          removeItem={props => removeItem(props, store)}
          editItem={props => editItem(props, store)}
          selectItem={props => setSelectedFilter(props, store)}
          duplicateItem={action('duplicate item')}
          selectedItemId={store.state.selectedFilter}
          categories={store.state.categories}
        />
        <ModalProxy blank closable onCancel={() => store.set({modalVisible: false})} visible={store.state.modalVisible} size={'small'} footer={null}>
          <Result type='info' title='Inplace of this modal you can implement any filter component.' description='This is just an example of filter trigger.' />
        </ModalProxy>
      </>
    )
  }),
};

export default {
  name: 'Table|Empty table',
  decorator,
  stories,
  Component: Table,
};
