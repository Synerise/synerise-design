import React, { useState } from 'react';
import moment from 'moment';
import { fn } from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Table, { DSTableProps } from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import Icon, { AddM, FilterM, Grid2M, InfoFillS, VarTypeDateM, VarTypeListM, VarTypeNumberM, VarTypeStringM } from '@synerise/ds-icon';
import { CardProps } from '@synerise/ds-card';
import Search from '@synerise/ds-search';
import Menu from '@synerise/ds-menu';
import Divider from '@synerise/ds-divider';
import ColumnManager, { GroupSettings, GROUP_BY } from '@synerise/ds-column-manager';
import ItemFilter from '@synerise/ds-item-filter';

import { renderWithIconInHeaders, TableMeta } from '../Table.utils';
import { useFiltersAndSearch } from '../WithFiltersAndSearch/useFiltersAndSearch';
import { COLUMN_MANAGER_TEXTS, DATA_SOURCE, PARAMETERS, ViewsType, CategoriesType, RowType, CATEGORIES, VIEWS, COLUMNS } from './GroupedTable.data';


type AnyObject = Record<string, any>;

export type SuggestionType = { text: string; filter: string };
type GroupedDataItem = {
  column: number;
  key: number;
  value: string;
  rows: RowType[];
  groupType: string;
};
type Story = StoryObj<StoryType>;
type StoryType = DSTableProps<RowType> & {
  showIconsInHeader: boolean;
  showHeaderButton: boolean;
  decoratorProps: Partial<CardProps>;
  sortRenderType: {
    name: string;
    company: string;
    transactionValue: string;
    transactionType: string;
  };
  multipleSortOrder: {
    name: number;
    company: number;
    transactionValue: number;
    transactionType: number;
  };
};

export default {
  ...TableMeta,
  parameters: {
    ...TableMeta.parameters,
    controls: {
      exclude: ['decoratorProps'],
    },
  },
  title: 'Components/Table/GroupedTable',
  render: ({ showIconsInHeader, multipleSortOrder, sortRenderType, showHeaderButton, dataSource = [], ...args }) => {
    const [localDataSource, setLocalDataSource] = useState<(RowType | GroupedDataItem)[]>(dataSource);
    const {
      columns,
      setColumns,
      selectedViewId,
      setSavedViewsVisible,
      setColumnManagerVisible,
      selectedFilterId,
      itemFilterVisible,
      setItemFilterVisible,
      modalVisible,
      setModalVisible,
      columnManagerVisible,
      savedViewsVisible,
      handleSetSelectedFilter,
      handleSetSelectedView,
      categories,
      searchFilterValue,
      setSearchFilterValue,
      searchSuggestions,
      setSearchSuggestions,
      searchValue,
      setSearchValue,
      editItem,
      saveFilter,
      savedViews,
      removeViewItem,
      removeItem,
      editViewItem,
    } = useFiltersAndSearch(CATEGORIES, VIEWS, COLUMNS);
    const [groupSettings, setGroupSettings] = useState<GroupSettings | undefined>();

    const toggleItemFilterVisible = () => {
      setItemFilterVisible(!itemFilterVisible);
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
                className: 'chromatic-ignore',
              };
            }
            case 'last_name': {
              return {
                title: 'Last name',
                dataIndex: 'last_name',
                key: 'last_name',
                sorter: (a, b) => a.last_name.localeCompare(b.last_name),
                sortRender: 'string',
                className: 'chromatic-ignore',
              };
            }
            case 'city': {
              return {
                title: 'City',
                dataIndex: 'city',
                key: 'city',
                icon: { component: <VarTypeStringM /> },
                iconTooltip: { component: <InfoFillS /> },
                sortRender: 'string',
                sorter: (a, b) => a.city.localeCompare(b.city),
                className: 'chromatic-ignore',
              };
            }
            case 'age': {
              return {
                title: 'Age',
                dataIndex: 'age',
                icon: { component: <VarTypeNumberM /> },
                iconTooltip: { component: <InfoFillS /> },
                key: 'age',
                sortRender: 'string',
                className: 'chromatic-ignore',
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
                sortRender: 'string',
                className: 'chromatic-ignore',
                render: last_activity => moment(last_activity).format('DD/MM/YYYY HH:mm'),
                sorter: (a, b) => (moment(a.last_activity).isBefore(moment(b.last_activity)) ? -1 : 1),
              };
            }
            default:
              return {
                sortRender: 'string',
                ...column,
                title: column.name,
                icon: { component: <VarTypeListM /> },
                iconTooltip: { component: <InfoFillS /> },
                dataIndex: column.key,
                className: 'chromatic-ignore',
              };
          }
        });
    };
    
    const finalColumns = renderWithIconInHeaders<RowType>(getColumns(), showIconsInHeader);
    const groupByValue = groupSettings => {
      const { key } = groupSettings.column;
      const result: GroupedDataItem[] = [];
      const columnValues = DATA_SOURCE.map(column => {
        return column[key];
      });
      const uniqueValues = new Set(columnValues);
      uniqueValues.forEach((uniqueValue, index) => {
        const group = dataSource.filter(row => row[key] === uniqueValue);
        result.push({
          column: key,
          key: index,
          value: uniqueValue,
          rows: group,
          groupType: GROUP_BY.value,
        });
      });
      setLocalDataSource(result);
      setGroupSettings(groupSettings);
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
      let groupedRows: any[] = [];
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
      setLocalDataSource(groups);
      setGroupSettings(groupSettings);
    };

    const groupByInterval = groupSettings => {
      const { interval } = groupSettings.settings;
      const groups: any[] = [];
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

      setLocalDataSource(result);
      setGroupSettings(groupSettings);
    };

    const applyGroupSettings = groupSettings => {
      if (!groupSettings) {
        setLocalDataSource(DATA_SOURCE);
        setGroupSettings(undefined);
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
          setLocalDataSource(DATA_SOURCE);
          setGroupSettings(undefined);
        }
      }
    };

    const filteredDataSource = () => {
      if (searchValue) {
        const param = searchFilterValue !== '' ? searchFilterValue : 'first_name';
        let result: any[] = [];
        if (groupSettings === undefined) {
          result = localDataSource.filter(record => {
            return record[param.toLowerCase()]?.includes(searchValue);
          });
        } else {
          const groupsWithSearchValues = localDataSource.map(group => ({
            ...group,
            rows: group.rows.filter(row => {
              return row[param.toLowerCase()]?.includes(searchValue);
            }),
          }));
          result = groupsWithSearchValues.filter(group => group.rows.length > 0);
        }
        return result;
      }
      return localDataSource;
    };

    const recent = [];

    const getSuggestions = value => {
      if (value) {
        const paramName = value
          .split(' ')
          .join('_')
          .toLowerCase();
        const data = groupSettings
          ? dataSource.reduce((items, group) => {
            if (group.rows) {
              return [...items, ...group.rows];
            }
            return [...items];
          }, [])
          : dataSource;

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
    const headerButton = showHeaderButton && (
      <Button type="ghost" mode="icon-label" onClick={fn()}>
        <Icon component={<AddM />} />
        Add row
      </Button>
    );
    const getSelectedView = () => {
      let allItems: ViewsType['items'] = [];
      savedViews.forEach(cat => {
        allItems = [...allItems, ...cat.items];
      });
      return allItems.find(filter => filter.id === selectedViewId);
    };

    const getSelectedFilter = () => {
      let allItems: CategoriesType['items'] = [];
      categories.forEach(cat => {
        allItems = [...allItems, ...cat.items];
      });
      return allItems.find(filter => filter.id === selectedFilterId);
    };

    return (
      <>
        <Table
          {...args}
          grouped={Boolean(groupSettings)}
          dataSource={filteredDataSource()}
          dataSourceFull={dataSource}
          columns={finalColumns}
          filters={[
            {
              key: 'view',
              icon: <Grid2M />,
              tooltips: { default: 'Table view', clear: 'Clear view', define: 'Define view', list: 'Saved views' },
              openedLabel: 'Define',
              showList: () => setSavedViewsVisible(true),
              show: () => setColumnManagerVisible(true),
              handleClear: () => handleSetSelectedView(undefined),
              selected: getSelectedView(),
            },
            {
              key: 'filter',
              icon: <FilterM />,
              tooltips: { default: 'Filter', clear: 'Clear filter', define: 'Define filter', list: 'Saved filters' },
              openedLabel: 'Define',
              showList: () => setItemFilterVisible(true),
              show: () => setModalVisible(true),
              handleClear: () => handleSetSelectedFilter(undefined),
              selected: getSelectedFilter(),
            },
          ]}
          headerButton={headerButton}
          searchComponent={
            <Search
              clearTooltip="Clear"
              dropdownMaxHeight={400}
              filterLookupKey="filter"
              onClear={() => {
                setSearchFilterValue('');
                setSearchValue('');
              }}
              onParameterValueChange={value => {
                setSearchFilterValue(value);
                setSearchSuggestions(getSuggestions(value));
              }}
              onValueChange={value => setSearchValue(value)}
              parameters={PARAMETERS.slice(0, 5)}
              parametersDisplayProps={{
                tooltip: 'Parameters',
                title: 'Parameters',
                rowHeight: 32,
                itemRender: (item: AnyObject) => (
                  <Menu.Item
                    highlight={searchValue}
                    prefixel={item && <Icon component={item && item.icon} />}
                  >
                    {item && item.text}
                  </Menu.Item>
                ),
              }}
              parameterValue={searchFilterValue}
              placeholder="Search"
              recent={recent?.slice(0, 5) || []}
              recentDisplayProps={{
                tooltip: 'Recent',
                title: 'Recent',
                rowHeight: 32,
                itemRender: (item: AnyObject) => <Menu.Item>{item && item.text}</Menu.Item>,
              }}
              divider={
                <div style={{ padding: '12px', paddingBottom: '0px' }}>
                  {' '}
                  <Divider dashed={true} />{' '}
                </div>
              }
              suggestions={searchSuggestions}
              suggestionsDisplayProps={{
                tooltip: 'Suggestions',
                title: 'Suggestions',
                rowHeight: 32,
                itemRender: (item: AnyObject) => <Menu.Item >{item && item.text}</Menu.Item>,
              }}
              textLookupConfig={{
                parameters: 'text',
                recent: 'text',
                suggestions: 'text',
              }}
              value={searchValue}
              width={300}
              inputProps={{ autoFocus: false }}
            />
          }
        />
        <ColumnManager
          hide={() => setColumnManagerVisible(false)}
          visible={columnManagerVisible}
          savedViewsVisible={savedViewsVisible}
          hideSavedViews={() => setSavedViewsVisible(false)}
          columns={columns}
          onApply={(columns, groupSettings) => {
            applyGroupSettings(groupSettings);
            setColumns(columns);
            setColumnManagerVisible(false);
          }}
          groupSettings={groupSettings}
          onSave={savedView => saveFilter(savedView)}
          itemFilterConfig={{
            removeItem: params => removeViewItem(params),
            editItem: params => editViewItem(params),
            selectItem: params => handleSetSelectedView(params),
            duplicateItem: params => action('Duplicate item')(params),
            selectedItemId: selectedViewId,
            categories: savedViews,
            texts: COLUMN_MANAGER_TEXTS,
          }}
        />
        <ItemFilter
          fetchData={() => {}}
          visible={itemFilterVisible}
          hide={toggleItemFilterVisible}
          removeItem={props => removeItem(props)}
          editItem={props => editItem(props)}
          selectItem={props => handleSetSelectedFilter(props)}
          duplicateItem={props => action('Duplicate item')(props)}
          selectedItemId={selectedFilterId}
          categories={categories}
        />
      </>
    );
  },
  args: {
    dataSource: DATA_SOURCE
  }
} as Meta<StoryType>;

export const GroupedTable: Story = {};
