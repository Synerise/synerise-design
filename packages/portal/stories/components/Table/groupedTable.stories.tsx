import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import Table, { ItemsMenu, TableCell } from '@synerise/ds-table';
import * as React from 'react';
import { COLUMNS, dataSource } from './content/groupedTable.data';
import Avatar from '@synerise/ds-avatar';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import {
  EditM,
  FileDownloadM,
  FilterM,
  Grid2M,
  TrashM, VarTypeBooleanM, VarTypeDateM,
  VarTypeListM,
  VarTypeNumberM,
} from '@synerise/ds-icon/dist/icons';
import DSTable from '@synerise/ds-table';
import { EMPTY_VIEW, FILTERS, VIEWS } from './content/withFiltersAndSearch.data';
import ColumnManager, { SavedView } from '@synerise/ds-column-manager/dist/ColumnManager';
import * as moment from 'moment';
import VarTypeStringM from '@synerise/ds-icon/dist/icons/VarTypeStringM';
import ItemFilter from '@synerise/ds-item-filter/dist/ItemFilter';

const decorator = storyFn => <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>{storyFn()}</div>;

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
        first_name: record.first_name,
        last_name: record.last_name,
        age: record.age,
        city: record.city
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


const saveFilter = (savedView: SavedView, store) => {
  const id = moment().format('MM-DD-YYYY_HH:mm:ss');
  store.set({
    selectedView: id,
    savedViews: [
      ...store.state.savedViews,
      {
        ...EMPTY_VIEW,
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


const stories = {
  default: withState({
    selectedRows: [],
    dataSource: dataSource,
    filters: FILTERS,
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
    searchSuggestions: [],
    grouped: false,
  })(({ store }) => {
    const { selectedRows, columns } = store.state;

    console.log(store.state);

    const handleSelectRow = selectedRowKeys => {
      store.set({ selectedRows: selectedRowKeys });
    };

    const itemsCount = () => {
      if(store.state.grouped) {
        return store.state.dataSource.reduce((count, group) => {
          return count + group.rows.length;
        }, 0);
      } else {
        return store.state.dataSource.length;
      }
    };

    const getColumns = () => {
      return columns.filter(column => column.visible).map(column => {
        switch (column.key) {
          case 'first_name': {
            return {
              title: 'First name',
              dataIndex: 'first_name',
              key: 'first_name',
              render: (firstName) => {
                return (
                  <TableCell.AvatarLabelCell
                    avatar={
                      <Avatar
                        backgroundColor='blue'
                        backgroundColorHue='600'
                        size='medium'
                      >
                        {firstName[0]}
                      </Avatar>}
                    title={firstName}
                  />
                )
              }
            }
          }
          case 'city': {
            return {
              title: 'City',
              dataIndex: 'city',
              key: 'city',
              sorter: (a, b) => {
                if (a.city < b.city) return -1;
                if (a.city > b.city) return 1;
                return 0;
              },
            }
          }
          case 'age': {
            return {
              title: 'Age',
              dataIndex: 'age',
              key: 'age',
              sorter: (a, b) => a.age - b.age,
            }
          }
          default:
            return {
              ...column,
              title: column.name,
              dataIndex: column.key,
            };
        }
      })
    };

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

    const groupByValue = (columnSettings) => {
      const result = [];
      const columnValues = dataSource.map(column => {
        return column[columnSettings.key];
      });
      const uniqueValues = new Set(columnValues);
      uniqueValues.forEach((uniqueValue, index) => {
        const group = dataSource.filter(row => row[columnSettings.key] === uniqueValue);
        result.push({
          column: columnSettings.key,
          key: index,
          value: uniqueValue,
          rows: group
        });
      });
      store.set({
        dataSource: result,
        grouped: true,
      })
    };

    const groupByRanges = (columnSettings) => {
      console.log(columnSettings);
    };

    const groupByInterval = (columnSettings) => {
      const {interval} = columnSettings.settings;
      const groups = [];
      while (dataSource.length) {
        groups.push(dataSource.splice(0, interval));
      }
      const result = groups.map((group, index) => {
        const firstItem = index * interval + 1;
        const lastItem = index * interval + interval;
        return {
          column: columnSettings.column.key,
          key: index,
          value: `${firstItem} - ${lastItem}`,
          rows: group
        }
      });
      store.set({
        // @ts-ignore
        dataSource: result,
        grouped: true,
      })
    };

    const applyGroupSettings = (groupSettings) => {
      if(!groupSettings) {
        store.set({
          dataSource: dataSource,
          grouped: false,
        });
        return;
      }
      console.log(groupSettings);
      switch(groupSettings.settings.type){
        case 'Value': {
          groupByValue(groupSettings.column);
          break;
        }
        case 'Ranges': {
          groupByRanges(groupSettings);
          break;
        }
        case 'Interval': {
          groupByInterval(groupSettings);
          break;
        }
        default: {
          console.log('dafult');
          store.set({
            dataSource: dataSource,
            grouped: false,
          });
        }
      }
    };

    return (
        <>
        <DSTable
          grouped={store.state.grouped}
          title={`${itemsCount()} records`}
          dataSource={store.state.dataSource}
          columns={getColumns()}
          loading={boolean('Set loading state', false)}
          roundedHeader={boolean('Rounded header', false)}
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
                selected: store.state.savedViews.find(filter => filter.id === store.state.selectedView),
              },
              {
                key: 'filter',
                icon: <FilterM />,
                tooltips: { default: 'Filter', clear: 'Clear filter', define: 'Define filter', list: 'Saved filters' },
                openedLabel: 'Define',
                showList: () => store.set({itemFilterVisible: true}),
                show: () => store.set({modalVisible: true}),
                handleClear: () => store.set({selectedFilter: undefined}),
                selected: store.state.filters.find(filter => filter.id === store.state.selectedFilter),
              }
            ]
          }
          pagination={{
            showSizeChanger: boolean('Show size changer', true),
            showQuickJumper: boolean('Show quick jumper', true),
            onChange: action('pageChanged'),
          }}
          addItem={action('ADD item action')}
          rowKey={row => row.key}
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
          selection={
            boolean('Enable row selection', true) && {
              onChange: handleSelectRow,
              selectedRowKeys: selectedRows,
              selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                {
                  key: 'select_custom',
                  onClick: action('select_custom'),
                  label: 'Select custom',
                },
              ]
            }
          }
        />
          <ColumnManager
            hide={() => store.set({columnManagerVisible: false})}
            visible={store.state.columnManagerVisible}
            savedViewsVisible={store.state.savedViewsVisible}
            hideSavedViews={() => store.set({savedViewsVisible: false})}
            columns={store.state.columns}
            onApply={(columns, groupSettings) => {
              applyGroupSettings(groupSettings);
              store.set({columns: columns, columnManagerVisible: false})
            }}
            onSave={(savedView) => saveFilter(savedView, store)}
            itemFilterConfig={{
              removeItem: (params) => removeItem(params, store),
              editItem: (params) => editItem(params, store),
              selectItem: (params) => setSelectedView(params, store),
              duplicateItem: action('duplicate item'),
              selectedItemId: store.state.selectedView,
              categories: [{label: 'All views'}, {label: 'My views'}],
              items: store.state.savedViews,
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
            duplicateItem={props => duplicateItem(props)}
            selectedItemId={store.state.selectedFilter}
            categories={[{label: 'All filters'}, {label: 'My filters'}]}
            items={store.state.filters}
          />
      </>)
    }
  ),
};

export default {
  name: 'Table|Grouped table',
  decorator,
  stories,
  Component: Table,
};
