import { boolean, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import Table, { ItemsMenu, TableCell } from '@synerise/ds-table';
import * as React from 'react';
import { COLUMNS, DATA_SOURCE, EMPTY_VIEW, VIEWS, CATEGORIES } from './content/groupedTable.data';
import Avatar from '@synerise/ds-avatar';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import {
  EditM,
  FileDownloadM,
  FilterM,
  Grid2M,
  TrashM, VarTypeBooleanM, VarTypeDateM, VarTypeListM, VarTypeNumberM,
} from '@synerise/ds-icon/dist/icons';
import DSTable from '@synerise/ds-table';
import ColumnManager, { SavedView } from '@synerise/ds-column-manager/dist/ColumnManager';
import * as moment from 'moment';
import ItemFilter from '@synerise/ds-item-filter/dist/ItemFilter';
import { GROUP_BY } from '@synerise/ds-column-manager/dist/ColumnManagerGroupSettings/ColumnManagerGroupSettings.types';
import Search from '@synerise/ds-search/dist/Search';
import { FilterElement } from '@synerise/ds-search/dist/Search.types';
import Menu from '@synerise/ds-menu';
import Divider from '@synerise/ds-divider';
import VarTypeStringM from '@synerise/ds-icon/dist/icons/VarTypeStringM';

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
    groupSettings: undefined,
  })(({ store }) => {
    const { selectedRows, columns } = store.state;

    const saveFilter = (savedView: SavedView) => {
      const id = moment().format('MM-DD-YYYY_HH:mm:ss');
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
      });

      applyGroupSettings(savedView.groupSettings);
    };

    const removeItem = (props): void => {
      store.set({
        items: store.state.items.filter(item => item.id !== props.id),
      });
    };

    const editItem = (props): void => {
      store.set({
        items: store.state.items.map(item => {
          if(item.id === props.id) {
            item.name = props.name;
          }
          return item;
        })
      })
    };

    const setSelectedFilter = (props): void => {
      let filters = [];
      store.state.categories.forEach(cat => {
        filters = [...filters, ...cat.items];
      });
      store.set({
        selectedFilter: props.id,
        columns: filters.filter(filter => filter.id === props.id)[0].columns,
      });
    };

    const setSelectedView = (props): void => {
      let savedViews = [];
      store.state.savedViews.forEach(view => {
        savedViews = [...savedViews, ...view.items];
      });

      store.set({
        selectedView: props.id,
        columns: savedViews.filter(view => view.id === props.id)[0].columns,
      });
      applyGroupSettings(savedViews.filter(filter => filter.id === props.id)[0].groupSettings);
    };


    const handleSelectRow = selectedRowKeys => {
      store.set({ selectedRows: selectedRowKeys });
    };

    const itemsCount = () => {
      if(Boolean(store.state.groupSettings)) {
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
              sorter: (a, b) => {
                if (a.first_name < b.first_name) return -1;
                if (a.first_name > b.first_name) return 1;
                return 0;
              },
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
              render: (last_activity) => moment(last_activity).format('DD/MM/YYYY HH:mm'),
              sorter: (a, b) => moment(a.last_activity).isBefore(moment(b.last_activity)) ? -1 : 1,
            }
          }
          default:
            return {
              ...column,
              title: column.name,
              dataIndex: column.key,
              sorter: (a, b) => {
                if (a[column.key] < b[column.key]) return -1;
                if (a[column.key] > b[column.key]) return 1;
                return 0;
              },
            };
        }
      })
    };

    const duplicateItem = (props): void => {
      action('Duplicate item');
    };

    const toggleItemFilterVisible = (): void => {
      store.set({ itemFilterVisible: !store.state.itemFilterVisible });
    };

    const groupByValue = (groupSettings) => {
      const {key} = groupSettings.column;
      const result = [];
      const columnValues = DATA_SOURCE.map(column => {
        return column[key];
      });
      const uniqueValues = new Set(columnValues);
      uniqueValues.forEach((uniqueValue, index) => {
        const group = DATA_SOURCE.filter(row => row[key] === uniqueValue);
        result.push({
          column: key,
          key: index,
          value: uniqueValue,
          rows: group,
          groupType: GROUP_BY.value,
        });
      });
      store.set({
        dataSource: result,
        groupSettings: groupSettings
      })
    };

    const getRange = (range, column): any[] => {
      const compare = (value) => {
        let val = value;
        let from = range.from.value;
        let to = range.to.value;
        if (column.type === 'text') {
          val = value[0].toUpperCase();
        }

        if(column.type === 'date') {
          val = moment(value, 'DD/MM/YYYY').format('x');
          from = moment(from, 'DD/MM/YYYY').format('x');
          to = moment(to, 'DD/MM/YYYY').format('x');
        }

        if(from && to) {
          return from <= val && val <= to;
        }

        if(from && (to === undefined || to === '')) {
          return from <= val;
        }

        if((from === undefined || from === '') && to) {
          return val <= to
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
        groupSettings: groupSettings,
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
        groupSettings: groupSettings
      })
    };

    const applyGroupSettings = (groupSettings) => {
      if(!groupSettings) {
        store.set({
          dataSource: DATA_SOURCE,
          groupSettings: undefined
        });
        return;
      }
      switch(groupSettings.settings.type){
        case GROUP_BY.value: {
          groupByValue(groupSettings);
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
            groupSettings: undefined
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

    const getSuggestions = (value) => {
      if(value) {
        const paramName = value.split(' ').join('_').toLowerCase();
        const data = store.state.groupSettings ? store.state.dataSource?.reduce((items, group) => {
          if (group.rows) {
            return [...items, ...group.rows];
          }
          return [...items];
        }, []) : store.state.dataSource;

        const allSuggestions = data.map(record => {
          return {
            text: record[paramName],
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

    const parameters = COLUMNS.map((column) => ({
      text: column.name,
      icon: COLUMN_ICONS[column.type]
    }));

    const recent = [];

    const filteredDataSource = () => {
      if(store.state.searchValue) {
        const param = store.state.searchFilterValue !== '' ? store.state.searchFilterValue : 'first_name';
        let result = [];
        if(store.state.groupSettings === undefined){
          result = store.state.dataSource.filter(record => {
            return record[param.toLowerCase()]?.includes(store.state.searchValue)
          })
        } else {
          const groupsWithSearchValues = store.state.dataSource.map(group => ({
            ...group,
            rows: group.rows.filter(row => {
              return row[param.toLowerCase()]?.includes(store.state.searchValue);
            })
          }));
          result = groupsWithSearchValues.filter(group => group.rows.length > 0);
        }
        return result;
      }

      return store.state.dataSource;

    };

    const selectEven = () => {
      const evenRows = store.state.dataSource.map(row => row.key).filter((key, index) => index % 2);
      store.set({selectedRows: evenRows});
    };

    return (
        <>
        <DSTable
          grouped={Boolean(store.state.groupSettings)}
          title={`${itemsCount()} records`}
          dataSource={filteredDataSource()}
          columns={getColumns()}
          loading={boolean('Set loading state', false)}
          roundedHeader={boolean('Rounded header', false)}
          cellSize={select('Set cells size', CELL_SIZES, CELL_SIZES.default)}
          locale={{pagination: {items: 'items', groups: 'groups'}}}
          filters={
            [
              {
                key: 'view',
                icon: <Grid2M />,
                tooltips: { default: 'Table view', clear: 'Clear view', define: 'Define view', list: 'Saved views' },
                openedLabel: 'Define',
                showList: () => store.set({savedViewsVisible: true}),
                show: () => store.set({columnManagerVisible: true}),
                handleClear: () => {
                  store.set({selectedView: undefined})
                  applyGroupSettings(undefined);
                },
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
                  key: 'even',
                  label: 'Select even',
                  onClick: selectEven,
                }
              ]
            }
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
            onApply={(columns, groupSettings) => {
              applyGroupSettings(groupSettings);
              store.set({columns: columns, columnManagerVisible: false})
            }}
            groupSettings={store.state.groupSettings}
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
