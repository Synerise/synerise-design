import { boolean, number, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import Table, { ItemsMenu, TableCell } from '@synerise/ds-table';
import React from 'react';
import { COLUMNS, DATA_SOURCE, EMPTY_VIEW, VIEWS, CATEGORIES } from './content/groupedTable.data';
import Button from '@synerise/ds-button';
import Icon, {
  AddM,
  EditM,
  FileDownloadM,
  FilterM,
  Grid2M,
  InfoFillS,
  TrashM,
  VarTypeBooleanM,
  VarTypeDateM,
  VarTypeListM,
  VarTypeStringM,
  VarTypeNumberM,
} from '@synerise/ds-icon';
import ColumnManager, { SavedView } from '@synerise/ds-column-manager/dist/ColumnManager';
import moment from 'moment';
import ItemFilter from '@synerise/ds-item-filter/dist/ItemFilter';
import { GROUP_BY } from '@synerise/ds-column-manager/dist/ColumnManagerGroupSettings/ColumnManagerGroupSettings.types';
import Search from '@synerise/ds-search/dist/Search';
import { FilterElement } from '@synerise/ds-search/dist/Search.types';
import Menu from '@synerise/ds-menu';
import Divider from '@synerise/ds-divider';
import { renderWithIconInHeaders } from './helpers/helpers';

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
  date: <VarTypeDateM />,
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
    starredRowKeys: [],
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
        },
      ];

      store.set({
        selectedView: id,
        savedViews,
        columns: [...savedView.columns],
      });

      applyGroupSettings(savedView.groupSettings);
    };

    const removeViewItem = (props, store): void => {
      store.set({
        savedViews: store.state.savedViews.map((category) => ({
          ...category,
          items: category.items.filter(item => item.id !== props.id)
        }))
      });
    };

    const editViewItem = (props, store): void => {
      store.set({
        savedViews: store.state.savedViews.map((view) => ({
          items: view.items.map((item) => ({
            ...item,
            name: props.id === item.id ? props.name : item.name,
          })),
        })),
      });
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
            if (item.id === props.id) {
              item.name = props.name;
            }
            return item;
          }),
        }))
      });
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
      action('selection.onChange')(selectedRowKeys)
      store.set({ selectedRows: selectedRowKeys });
    };

    const itemsCount = () => {
      if (Boolean(store.state.groupSettings)) {
        return store.state.dataSource.reduce((count, group) => {
          return count + group.rows.length;
        }, 0);
      } else {
        return store.state.dataSource.length;
      }
    };

    const getColumns = () => {
      return columns
        .filter(column => column.visible)
        .map(column => {
          switch (column.key) {
            case 'first_name': {
              return {
                icon: { component: <VarTypeStringM /> },
                iconTooltip: { component: <InfoFillS /> },
                title: 'First name',
                dataIndex: 'first_name',
                key: 'first_name',
                sorter: (a, b) => a.first_name.localeCompare(b.first_name),
                sortRender: 'string',
              };
            }
            case 'last_name': {
              return {
                title: 'Last name',
                dataIndex: 'last_name',
                key: 'last_name',
                sorter: (a, b) => a.last_name.localeCompare(b.last_name),
                sortRender: 'string',
              };
            }
            case 'city': {
              return {
                title: 'City',
                dataIndex: 'city',
                key: 'city',
                icon: { component: <VarTypeStringM /> },
                iconTooltip: { component: <InfoFillS /> },
                sorter: (a, b) => a.city.localeCompare(b.city),
                sortRender: 'string',
              };
            }
            case 'age': {
              return {
                title: 'Age',
                dataIndex: 'age',
                icon: { component: <VarTypeNumberM /> },
                iconTooltip: { component: <InfoFillS /> },
                key: 'age',
                sorter: (a, b) => a.age - b.age,
              };
            }
            case 'last_activity': {
              return {
                title: 'Last activity',
                icon: { component: <VarTypeDateM /> },
                iconTooltip: { component: <InfoFillS /> },
                dataIndex: 'last_activity',
                key: 'last_activity',
                render: last_activity => moment(last_activity).format('DD/MM/YYYY HH:mm'),
                sorter: (a, b) => (moment(a.last_activity).isBefore(moment(b.last_activity)) ? -1 : 1),
              };
            }
            default:
              return {
                ...column,
                title: column.name,
                icon: { component: <VarTypeListM /> },
                iconTooltip: { component: <InfoFillS /> },
                dataIndex: column.key,
                // sorter: (a, b) => {
                //   if (a[column.key] < b[column.key]) return -1;
                //   if (a[column.key] > b[column.key]) return 1;
                //   return 0;
                // },
              };
          }
        });
    };

    const duplicateItem = (props): void => {
      action('Duplicate item');
    };

    const duplicateViewItem = (): void => {
      action('Duplicate view item');
    };

    const toggleItemFilterVisible = (): void => {
      store.set({ itemFilterVisible: !store.state.itemFilterVisible });
    };

    const groupByValue = groupSettings => {
      const { key } = groupSettings.column;
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
        groupSettings: groupSettings,
      });
    };

    const getRange = (range, column): any[] => {
      const compare = value => {
        let val = value;
        let from = range.from.value;
        let to = range.to.value;
        if (column.type === 'text') {
          val = value[0].toUpperCase();
        }

        if (column.type === 'date') {
          val = moment(value, 'DD/MM/YYYY').format('x');
          from = moment(from, 'DD/MM/YYYY').format('x');
          to = moment(to, 'DD/MM/YYYY').format('x');
        }

        if (from && to) {
          return from <= val && val <= to;
        }

        if (from && (to === undefined || to === '')) {
          return from <= val;
        }

        if ((from === undefined || from === '') && to) {
          return val <= to;
        }
      };

      return DATA_SOURCE.filter(row => {
        return compare(row[column.key]);
      });
    };

    const groupByRanges = groupSettings => {
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
        };
      });
      const rest = DATA_SOURCE.filter(row => groupedRows.indexOf(row) === -1);
      if (rest.length) {
        groups.push({
          column: column.key,
          key: groups.length,
          value: `Others`,
          rows: rest,
        });
      }
      store.set({
        dataSource: groups,
        groupSettings: groupSettings,
      });
    };

    const groupByInterval = groupSettings => {
      const { interval } = groupSettings.settings;
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
        };
      });
      store.set({
        // @ts-ignore
        dataSource: result,
        groupSettings: groupSettings,
      });
    };

    const applyGroupSettings = groupSettings => {
      if (!groupSettings) {
        store.set({
          dataSource: DATA_SOURCE,
          groupSettings: undefined,
        });
        return;
      }
      switch (groupSettings.settings.type) {
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
            groupSettings: undefined,
          });
        }
      }
    };

    const getSelectedSavedView = () => {
      let savedViews = [];
      store.state.savedViews.forEach(view => {
        savedViews = [...savedViews, ...view.items];
      });

      return savedViews.find(view => view.id === store.state.selectedView);
    };

    const getSelectedCategory = () => {
      let categories = [];
      store.state.categories.forEach(cat => {
        categories = [...categories, ...cat.items];
      });

      return categories.find(filter => filter.id === store.state.selectedFilter);
    };

    const getSuggestions = value => {
      if (value) {
        const paramName = value
          .split(' ')
          .join('_')
          .toLowerCase();
        const data = store.state.groupSettings
          ? store.state.dataSource?.reduce((items, group) => {
            if (group.rows) {
              return [...items, ...group.rows];
            }
            return [...items];
          }, [])
          : store.state.dataSource;

        const allSuggestions = data.map(record => {
          return {
            text: record[paramName],
            filter: paramName,
          };
        });
        return allSuggestions.reduce((unique, item) => {
          const exist = unique.find(record => record.text === item.text);
          return exist ? unique : [...unique, item];
        }, []);
      }
      return [];
    };

    const parameters = COLUMNS.map(column => ({
      text: column.name,
      icon: COLUMN_ICONS[column.type],
    }));

    const recent = [];

    const filteredDataSource = () => {
      if (store.state.searchValue) {
        const param = store.state.searchFilterValue !== '' ? store.state.searchFilterValue : 'first_name';
        let result = [];
        if (store.state.groupSettings === undefined) {
          result = store.state.dataSource.filter(record => {
            return record[param.toLowerCase()]?.includes(store.state.searchValue);
          });
        } else {
          const groupsWithSearchValues = store.state.dataSource.map(group => ({
            ...group,
            rows: group.rows.filter(row => {
              return row[param.toLowerCase()]?.includes(store.state.searchValue);
            }),
          }));
          result = groupsWithSearchValues.filter(group => group.rows.length > 0);
        }
        return result;
      }

      return store.state.dataSource;
    };

    const randomStatus = (_record) => ({disabled: _record.disabled, unavailable: _record.unavailable});

    return (
      <>
        <Table
          title={text('Table title', 'Grouped table')}
          grouped={Boolean(store.state.groupSettings)}
          hideGroupExpander={boolean('Hide group expander', false)}
          initialGroupsCollapsed={boolean('Initial groups collapsed?', false)}
          dataSource={filteredDataSource()}
          dataSourceFull={store.state.dataSource}
          columns={renderWithIconInHeaders(getColumns(), boolean('Set icons in headers', false))}
          loading={boolean('Set loading state', false)}
          roundedHeader={boolean('Rounded header', false)}
          cellSize={select('Set cells size', CELL_SIZES, CELL_SIZES.default)}
          filters={[
            {
              key: 'view',
              icon: <Grid2M />,
              tooltips: { default: 'Table view', clear: 'Clear view', define: 'Define view', list: 'Saved views' },
              openedLabel: 'Define',
              showList: () => store.set({ savedViewsVisible: true }),
              show: () => store.set({ columnManagerVisible: true }),
              handleClear: () => {
                store.set({ selectedView: undefined });
                applyGroupSettings(undefined);
              },
              selected: getSelectedSavedView(),
            },
            {
              key: 'filter',
              icon: <FilterM />,
              tooltips: { default: 'Filter', clear: 'Clear filter', define: 'Define filter', list: 'Saved filters' },
              openedLabel: 'Define',
              showList: () => store.set({ itemFilterVisible: true }),
              show: () => store.set({ modalVisible: true }),
              handleClear: () => store.set({ selectedFilter: undefined }),
              selected: getSelectedCategory(),
            },
          ]}
          pagination={{
            showSizeChanger: boolean('Show size changer', true),
            showQuickJumper: boolean('Show quick jumper', true),
            onChange: action('pageChanged'),
          }}
          addItem={action('ADD item action')}
          rowKey={row => row.key}
          headerButton={
            boolean('Show header button', false) && (
              <Button type="ghost" mode="icon-label" onClick={action('Header button action')}>
                <Icon component={<AddM />} />
                {text('Header button label', 'Add row')}
              </Button>
            )
          }
          itemsMenu={
            <ItemsMenu>
              <Button onClick={action('Export')} type="secondary" mode="icon-label">
                <Icon component={<FileDownloadM />} />
                Export
              </Button>
              <Button onClick={action('Edit')} type="secondary" mode="icon-label">
                <Icon component={<EditM />} />
                Edit
              </Button>
              <Button onClick={action('Delete')} type="secondary" mode="icon-label">
                <Icon component={<TrashM />} />
                Delete
              </Button>
            </ItemsMenu>
          }
          selection={
            boolean('Enable row selection', true) && {
              onChange: handleSelectRow,
              selectedRowKeys: selectedRows,
              checkRowSelectionStatus: boolean('Selection disabled / unavailable for some rows?', true) ? randomStatus : undefined,
              selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
            }
          }
          rowStar={boolean('Enable row star', undefined) && {
            starredRowKeys: store.state.starredRowKeys,
            onChange: (starredRowKeys): void => {
              store.set({ starredRowKeys });
            }
          }}
          searchComponent={
            <Search
              clearTooltip="Clear"
              dropdownMaxHeight={400}
              filterLookupKey="filter"
              onClear={() => {
                store.set({
                  searchFilterValue: '',
                  searchValue: '',
                });
              }}
              onParameterValueChange={value => {
                store.set({
                  searchFilterValue: value,
                  searchSuggestions: getSuggestions(value),
                });
              }}
              onValueChange={value => store.set({ searchValue: value })}
              parameters={parameters.slice(0, number('Parameters count', 5))}
              parametersDisplayProps={{
                tooltip: 'Parameters',
                title: 'Parameters',
                rowHeight: 32,
                itemRender: (item: FilterElement) => (
                  <Menu.Item
                    highlight={store.state.searchValue}
                    prefixel={item && <Icon component={item && item.icon} />}
                  >
                    {item && item.text}
                  </Menu.Item>
                ),
              }}
              parameterValue={store.state.searchFilterValue}
              placeholder="Search"
              recent={recent.slice(0, number('Recent count', 5))}
              recentDisplayProps={{
                tooltip: 'Recent',
                title: 'Recent',
                rowHeight: 32,
                itemRender: (item: FilterElement) => (
                  <Menu.Item >{item && item.text}</Menu.Item>
                ),
                divider: (
                  <div style={{ padding: '12px', paddingBottom: '0px' }}>
                    {' '}
                    <Divider dashed={true} />{' '}
                  </div>
                ),
              }}
              suggestions={store.state.searchSuggestions}
              suggestionsDisplayProps={{
                tooltip: 'Suggestions',
                title: 'Suggestions',
                rowHeight: 32,
                itemRender: (item: FilterElement) => (
                  <Menu.Item >{item && item.text}</Menu.Item>
                ),
              }}
              textLookupConfig={{
                parameters: 'text',
                recent: 'text',
                suggestions: 'text',
              }}
              value={store.state.searchValue}
              width={300}
              inputProps={{ autoFocus: false }}
            />
          }
        />
        <ColumnManager
          hide={() => store.set({ columnManagerVisible: false })}
          visible={store.state.columnManagerVisible}
          savedViewsVisible={store.state.savedViewsVisible}
          hideSavedViews={() => store.set({ savedViewsVisible: false })}
          columns={store.state.columns}
          onApply={(columns, groupSettings) => {
            applyGroupSettings(groupSettings);
            store.set({ columns: columns, columnManagerVisible: false });
          }}
          groupSettings={store.state.groupSettings}
          onSave={savedView => saveFilter(savedView, store)}
          itemFilterConfig={{
            removeItem: params => removeViewItem(params, store),
            editItem: params => editViewItem(params, store),
            selectItem: params => setSelectedView(params, store),
            duplicateItem: params => duplicateViewItem(params, store),
            selectedItemId: store.state.selectedView,
            categories: store.state.savedViews,
            texts: {
              activateItemTitle: 'By activating this view, you will cancel your unsaved view settings',
              activate: 'Activate',
              cancel: 'Cancel',
              deleteConfirmationTitle: 'Delete view',
              deleteConfirmationDescription:
                'Deleting this view will permanently remove it from templates library. All tables using this view will be reset.',
              deleteConfirmationYes: text('Delete confirmation yes', 'Yes'),
              deleteConfirmationNo: text('Delete confirmation no', 'No'),
              deleteLabel: 'Delete',
              noResults: 'No results',
              searchPlaceholder: 'Search',
              searchClearTooltip: 'Clear',
              title: 'Views',
              itemActionRename: 'Rename',
              itemActionDuplicate: 'Duplicate',
              itemActionDelete: 'Delete',
            },
          }}
        />
        <ItemFilter
          visible={store.state.itemFilterVisible}
          hide={toggleItemFilterVisible}
          removeItem={props => removeItem(props, store)}
          editItem={props => editItem(props, store)}
          selectItem={props => setSelectedFilter(props, store)}
          duplicateItem={props => duplicateItem(props, store)}
          selectedItemId={store.state.selectedFilter}
          categories={store.state.categories}
        />
      </>
    );
  }),
};

export default {
  name: 'Components/Table/Grouped table',
  decorator,
  stories,
  Component: Table,
};
