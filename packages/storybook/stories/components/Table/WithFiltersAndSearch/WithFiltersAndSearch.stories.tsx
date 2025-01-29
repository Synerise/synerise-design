import React, { useMemo } from 'react';
import { fn } from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Table, { DSTableProps } from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import Icon, { AddM, FilterM, Grid2M } from '@synerise/ds-icon';
import { CardProps } from '@synerise/ds-card';

import Search from '@synerise/ds-search';
import Menu from '@synerise/ds-menu';
import Divider from '@synerise/ds-divider';
import ColumnManager from '@synerise/ds-column-manager';
import Modal from '@synerise/ds-modal';
import Result from '@synerise/ds-result';
import ItemFilter from '@synerise/ds-item-filter';

import { renderWithIconInHeaders, TableMeta } from '../Table.utils';
import {
  COLUMN_MANAGER_TEXTS,
  DATA_SOURCE,
  PARAMETERS,
  ViewsType,
  CategoriesType,
  CATEGORIES,
  VIEWS,
  COLUMNS,
} from './WithFiltersAndSearch.data';
import { useFiltersAndSearch } from './useFiltersAndSearch';
import { getColumnsWithActions } from './utils';
import { cardDecorator } from '../../../utils';

type AnyObject = Record<string, any>;
type RowType = typeof DATA_SOURCE[number];
export type SuggestionType = { text: string; filter: string };
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
  title: 'Components/Table/WithFiltersAndSearch',
  render: ({ showIconsInHeader, multipleSortOrder, sortRenderType, showHeaderButton, dataSource = [], ...args }) => {
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

    const toggleItemFilterVisible = () => {
      setItemFilterVisible(!itemFilterVisible);
    };

    const finalColumns = renderWithIconInHeaders<RowType>(getColumnsWithActions(columns), showIconsInHeader);

    const filteredDataSource = useMemo(() => {
      if (searchFilterValue && searchValue) {
        return dataSource.filter(record => {
          const value = {
            name: record.name,
            age: record.age,
            status: record.active.toString(),
            country: record.country.name,
          };
          return value[searchFilterValue.toLowerCase()].includes(searchValue);
        });
      }
      return !searchValue
        ? dataSource
        : dataSource.filter(record => {
            return record.name.toLowerCase().includes(searchValue.toLowerCase());
          });
    }, [searchFilterValue, searchValue, dataSource]);

    const recent = dataSource.map(record => ({
      text: record.name,
      filter: 'name',
    }));

    const getSuggestions = (value: string): SuggestionType[] => {
      if (value) {
        const paramName = value.toLowerCase();
        const allSuggestions = dataSource.map(record => {
          const value = {
            name: record.name,
            age: record.age,
            status: record.active.toString(),
            country: record.country.name,
          };

          return {
            text: value[paramName],
            filter: paramName,
          };
        });
        return allSuggestions
          ? allSuggestions.reduce((unique, item) => {
              const exist = unique.find(record => record.text === item.text);
              return exist ? unique : [...unique, item];
            }, [] as SuggestionType[])
          : [];
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
          dataSource={filteredDataSource}
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
                itemRender: (item: AnyObject) => <Menu.Item>{item && item.text}</Menu.Item>,
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
          onApply={columns => {
            // @ts-ignore
            setColumns(columns);
            setColumnManagerVisible(false);
          }}
          onSave={savedView => saveFilter(savedView)}
          itemFilterConfig={{
            fetchData: () => {},
            removeItem: params => removeViewItem(params),
            editItem: params => editViewItem(params),
            selectItem: params => handleSetSelectedView(params),
            duplicateItem: action('duplicate item'),
            selectedItemId: selectedViewId as string,
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
          duplicateItem={action('duplicate item')}
          selectedItemId={selectedFilterId as string}
          categories={categories}
        />
        <Modal
          blank
          closable
          onCancel={() => setModalVisible(false)}
          visible={modalVisible}
          size={'small'}
          footer={null}
        >
          <Result
            type="info"
            title="In place of this modal you can implement any filter component."
            description="This is just an example of filter trigger."
          />
        </Modal>
      </>
    );
  },
  argTypes: {
    ...TableMeta.argTypes,
    sortRenderType: {
      table: { category: 'Story options' },
    },
    multipleSortOrder: {
      table: { category: 'Story options' },
    },
  },
  args: {
    ...TableMeta.args,
    dataSource: DATA_SOURCE,
  },
  component: Table,
} as Meta<StoryType>;

export const WithFiltersAndSearch: Story = {};

export const OnCard: Story = {
  decorators: [cardDecorator],
  args: {
    decoratorProps: {
      withHeader: true,
      title: 'Table on card',
      withoutPadding: true,
    },
  },
};
