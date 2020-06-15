import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import Table, { ItemsMenu, TableCell } from '@synerise/ds-table';
import * as React from 'react';
import { COLUMNS, DATA_SOURCE } from './content/groupedTable.data';
import Avatar from '@synerise/ds-avatar';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import {
  EditM,
  FileDownloadM,
  FilterM,
  Grid2M,
  TrashM
} from '@synerise/ds-icon/dist/icons';
import DSTable from '@synerise/ds-table';
import { EMPTY_VIEW, CATEGORIES, VIEWS } from './content/withFiltersAndSearch.data';
import ColumnManager, { SavedView } from '@synerise/ds-column-manager/dist/ColumnManager';
import * as moment from 'moment';
import ItemFilter from '@synerise/ds-item-filter/dist/ItemFilter';
import { GROUP_BY } from '@synerise/ds-column-manager/dist/ColumnManagerGroupSettings/ColumnManagerGroupSettings';

const decorator = storyFn => <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>{storyFn()}</div>;

const CELL_SIZES = {
  default: 'default',
  medium: 'medium',
  small: 'small',
};

const saveFilter = (savedView: SavedView, store) => {
  const id = moment().format('MM-DD-YYYY_HH:mm:ss');
  // console.log('SAVED:', savedView, store, id);
  const savedViews = store.state.savedViews;
  savedViews[0].items = [
    ...savedViews[0].items,
    {
      ...EMPTY_VIEW,
      name: savedView.meta.name,
      description: savedView.meta.description,
      columns: [...savedView.columns],
      id: id,
      created: moment().format('MM-DD-YYYY HH:mm:ss'),
    }
  ];

  store.set({
    selectedView: id,
    savedViews,
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
  let filters = [];
  store.state.categories.forEach(cat => {
    filters = [...filters, ...cat.items];
  });
  store.set({
    selectedFilter: props.id,
    columns: filters.filter(filter => filter.id === props.id)[0].columns,
  });
};

const setSelectedView = (props, store): void => {
  let savedViews = [];
  store.state.savedViews.forEach(view => {
    savedViews = [...savedViews, ...view.items];
  });

  store.set({
    selectedView: props.id,
    columns: savedViews.filter(view => view.id === props.id)[0].columns,
  });
};


const stories = {
  default: withState({
    selectedRows: [],
    dataSource: DATA_SOURCE,
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
    searchSuggestions: [],
    grouped: false,
  })(({ store }) => {
    const { selectedRows, columns } = store.state;

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
          case 'last_activity': {
            return {
              title: 'Last activity',
              dataIndex: 'last_activity',
              key: 'last_activity',
              render: (last_activity) => moment(last_activity).format('DD/MM/YYYY HH:mm')
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
      action('Duplicate item');
      // const itemForDuplication = store.state.categories.find(item => item.id === props.id);
      // store.set({
      //   // @ts-ignore
      //   filters: [
      //     ...store.state.filters,
      //     {
      //       ...itemForDuplication,
      //       id: Date.now(),
      //       categories: ['My filters', 'All filters'],
      //       canUpdate: true,
      //       canDelete: true,
      //       canDuplicate: true,
      //       name: `${itemForDuplication.name} - copy`,
      //     },
      //   ],
      // });
    };

    const toggleItemFilterVisible = (): void => {
      store.set({ itemFilterVisible: !store.state.itemFilterVisible });
    };

    const groupByValue = (groupSettings) => {
      const result = [];
      const columnValues = DATA_SOURCE.map(column => {
        return column[groupSettings.key];
      });
      const uniqueValues = new Set(columnValues);
      uniqueValues.forEach((uniqueValue, index) => {
        const group = DATA_SOURCE.filter(row => row[groupSettings.key] === uniqueValue);
        result.push({
          column: groupSettings.key,
          key: index,
          value: uniqueValue,
          rows: group,
          groupType: GROUP_BY.value,
        });
      });
      store.set({
        dataSource: result,
        grouped: true,
      })
    };

    const getRange = (range, column): any[] => {
      const compare = (value) => {
        let val = value;
        if (column.type === 'text') {
          val = value[0].toUpperCase();
        }
        if( range.from.value && range.to.value) {
          return range.from.value <= val && val <= range.to.value;
        }

        if( range.from.value && (range.to.value === undefined || range.to.value === '')) {
          console.log(range.from.value <= val, range.from.value, val);
          return range.from.value <= val;
        }

        if( (range.from.value === undefined || range.from.value === '') && range.to.value) {
          return val <= range.to.value
        }

      };

      return DATA_SOURCE.filter(row => {
        return compare(row[column.key]);
      });
    };

    const groupByRanges = (groupSettings) => {
      const { settings, column } = groupSettings;
      let groupedRows = [];
      const groups = settings.ranges.map((range, index) => {
        const rangeRows = getRange(range, column);
        groupedRows = [...groupedRows, ...rangeRows];
        return {
          column: column.key,
          key: index,
          value: `${range.from.value || ''} - ${range.to.value || ''}`,
          rows: rangeRows,
          groupType: GROUP_BY.ranges,
        }
      });
      const rest = DATA_SOURCE.filter(row => groupedRows.indexOf(row) === -1);
      if(rest.length) {
        groups.push({
          column: column.key,
          key: groups.length,
          value: `Others`,
          rows: rest
        })
      }
      store.set({
        dataSource: groups,
        grouped: true,
      })
    };

    const groupByInterval = (groupSettings) => {
      const {interval} = groupSettings.settings;
      const groups = [];
      const data = [...DATA_SOURCE];
      while (data.length) {
        groups.push(data.splice(0, interval));
      }
      const result = groups.map((group, index) => {
        const firstItem = index * interval + 1;
        const lastItem = index * interval + interval;
        return {
          column: groupSettings.column.key,
          key: index,
          value: `${firstItem} - ${lastItem}`,
          rows: group,
          groupType: GROUP_BY.interval,
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
          dataSource: DATA_SOURCE,
          grouped: false,
        });
        return;
      }
      switch(groupSettings.settings.type){
        case GROUP_BY.value: {
          groupByValue(groupSettings.column);
          break;
        }
        case GROUP_BY.ranges: {
          groupByRanges(groupSettings);
          break;
        }
        case GROUP_BY.interval: {
          groupByInterval(groupSettings);
          break;
        }
        default: {
          store.set({
            dataSource: DATA_SOURCE,
            grouped: false,
          });
        }
      }
    };

    const getSelectedSavedView = () => {
      let savedViews = [];
      store.state.savedViews.forEach(view => {
        savedViews = [...savedViews, ...view.items];
      });

      return savedViews.find(view => view.id === store.state.selectedView)
    };


    const getSelectedCategory = () => {
      let categories = [];
      store.state.categories.forEach(cat => {
        categories = [...categories, ...cat.items];
      });

      return categories.find(filter => filter.id === store.state.selectedFilter);
    };

    console.log(store.state, DATA_SOURCE);

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
                selected: getSelectedSavedView(),
              },
              {
                key: 'filter',
                icon: <FilterM />,
                tooltips: { default: 'Filter', clear: 'Clear filter', define: 'Define filter', list: 'Saved filters' },
                openedLabel: 'Define',
                showList: () => store.set({itemFilterVisible: true}),
                show: () => store.set({modalVisible: true}),
                handleClear: () => store.set({selectedFilter: undefined}),
                selected: getSelectedCategory(),
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
                itemActionRename: 'Rename',
                itemActionDuplicate: 'Duplicate',
                itemActionDelete: 'Delete',
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
            categories={store.state.categories}
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
