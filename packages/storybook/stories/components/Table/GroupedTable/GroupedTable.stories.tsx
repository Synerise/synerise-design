import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { fn } from 'storybook/test';
import { Meta, StoryObj } from '@storybook/react-webpack5';


import Table, { DSTableProps, GROUP_BY } from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import Icon, { AddM, InfoFillS, VarTypeDateM, VarTypeListM, VarTypeNumberM, VarTypeStringM } from '@synerise/ds-icon';
import { CardProps } from '@synerise/ds-card';
import Search from '@synerise/ds-search';
import Menu from '@synerise/ds-menu';
import Divider from '@synerise/ds-divider';

import { renderWithIconInHeaders, TableMeta } from '../Table.utils';
import { useFiltersAndSearch } from '../WithFiltersAndSearch/useFiltersAndSearch';
import { COLUMN_MANAGER_TEXTS, DATA_SOURCE, PARAMETERS, ViewsType, CategoriesType, RowType, CATEGORIES, VIEWS, COLUMNS, STRING_SORT_RENDER, GROUP_BY_RANGE_CONFIG, GROUP_BY_INTERVAL_CONFIG, GROUP_BY_VALUE_CONFIG } from './GroupedTable.data';


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
      exclude: ['decoratorProps', 'randomiseSelectionColumn'],
    },
  },
  title: 'Components/Table/GroupedTable',
  render: ({ groupSettings, showIconsInHeader, multipleSortOrder, sortRenderType, showHeaderButton, dataSource = [], ...args }) => {
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
      return result
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
      return groups;
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

      return result
    };
    const [localDataSource, setLocalDataSource] = useState<readonly (RowType | GroupedDataItem)[]>(() => {
      switch (groupSettings?.settings?.type) {
        case GROUP_BY.value: {
          return groupByValue(groupSettings);
        }
        case GROUP_BY.ranges: {
          return groupByRanges(groupSettings);
        }
        case GROUP_BY.interval: {
          return groupByInterval(groupSettings);
        }
      }
      return DATA_SOURCE
    });
    const {
      columns,
      // setColumns,
      selectedViewId,
      // setSavedViewsVisible,
      // setColumnManagerVisible,
      selectedFilterId,
      itemFilterVisible,
      setItemFilterVisible,
      // modalVisible,
      setModalVisible,
      // columnManagerVisible,
      // savedViewsVisible,
      handleSetSelectedFilter,
      // handleSetSelectedView,
      categories,
      searchFilterValue,
      setSearchFilterValue,
      searchSuggestions,
      setSearchSuggestions,
      searchValue,
      setSearchValue,
      // editItem,
      // saveFilter,
      savedViews,
      // removeViewItem,
      // removeItem,
      // editViewItem,
    } = useFiltersAndSearch(CATEGORIES, VIEWS, COLUMNS);
    // const [groupSettings, setGroupSettings] = useState(groupConfig);

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
                sortRender: STRING_SORT_RENDER,
                className: 'chromatic-ignore',
              };
            }
            case 'last_name': {
              return {
                title: 'Last name',
                dataIndex: 'last_name',
                key: 'last_name',
                sorter: (a, b) => a.last_name.localeCompare(b.last_name),
                sortRender: STRING_SORT_RENDER,
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
                sortRender: STRING_SORT_RENDER,
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
                sortRender: STRING_SORT_RENDER,
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
                sortRender: STRING_SORT_RENDER,
                render: last_activity => <span className="chromatic-ignore">{moment(last_activity).format('DD/MM/YYYY HH:mm')}</span>,
                sorter: (a, b) => (moment(a.last_activity).isBefore(moment(b.last_activity)) ? -1 : 1),
              };
            }
            default:
              return {
                sortRender: STRING_SORT_RENDER,
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

    // console.log(finalColumns)
    // console.log(filteredDataSource())
    return (
      <>
        <Table
          {...args}
          grouped={true}
          dataSource={filteredDataSource()}
          dataSourceFull={dataSource}
          columns={finalColumns}
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

      </>
    );
  },
  args: {
    dataSource: DATA_SOURCE
  }
} as Meta<StoryType>;

export const TableGroupedByRange: Story = {
  args: {
    groupSettings: GROUP_BY_RANGE_CONFIG
  }
};
export const TableGroupedByInterval: Story = {
  args: {
    groupSettings: GROUP_BY_INTERVAL_CONFIG
  }
};
export const TableGroupedByValue: Story = {
  args: {
    groupSettings: GROUP_BY_VALUE_CONFIG
  }
};
