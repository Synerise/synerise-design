import { VirtualTable } from '@synerise/ds-table';
import faker from 'faker';
import Table from '@synerise/ds-table';
import * as React from 'react';
import { SearchInput } from '@synerise/ds-search/dist/Elements';
import { boolean, number, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Button from '@synerise/ds-button';
import Icon, { AddM, InfoFillS, VarTypeStringM } from '@synerise/ds-icon';
import { renderWithIconInHeaders } from './helpers/helpers';

const decorator = storyFn => <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>{storyFn()}</div>;

const dataSource = [...new Array(5000)].map((i, k) => ({
  key: String(k + 1),
  name: faker.name.findName(),
  city: faker.address.city(),
  number: String(faker.finance.amount())
}));
const columns = [
  {
    title: 'User name',
    key: 'name',
    dataIndex: 'name',
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortRender: 'string',
  },
  {
    title: 'City',
    key: 'city',
    dataIndex: 'city',
    sorter: (a, b) => a.city.localeCompare(b.city),
    sortRender: 'string',
  },
  {
    title: 'Number',
    key: 'number',
    dataIndex: 'number',
    sorter: (a, b) => a.number.localeCompare(b.number),
  },
];

const VirtualizationWithState: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [starredRowKeys, setStarredRowKey] = React.useState([]);
  const [selectedRowsMap, setSelectedRowsMap] = React.useState({});


  const filteredDataSource = React.useCallback(() => {
    return !searchValue
      ? dataSource
      : dataSource.filter(record => {
        return typeof record.name === 'string' && record.name.toLowerCase().includes(searchValue.toLowerCase());
      });
  }, [searchValue]);

  const handleSelectRow = selectedRowKeys => {
    const newSelectedRowsMap = { ...selectedRowsMap };
    selectedRowKeys.forEach(key => {
      const row = filteredDataSource().find(row => row.key === key);
      if (row) {
        newSelectedRowsMap[key] = row;
      }
    });
    setSelectedRowsMap(newSelectedRowsMap);
  };

  const selectEven = React.useCallback(() => {
    const evenRowsMap = {};
    filteredDataSource().forEach((row, index) => {
      if (index % 2 === 0) {
        const key = row.key;
        evenRowsMap[key] = row;
      }
    });
    setSelectedRowsMap(evenRowsMap);
  }, [filteredDataSource]);
  const numberOfRows = number('Number of rows (maximum 5000)', filteredDataSource().length, {
    max: filteredDataSource().length,
  });

  return (
    <div style={{ width: 792 }}>
      <VirtualTable
        title={text('Table title', 'Virtualized table')}
        scroll={{ y: 500, x: 0 }}
        initialWidth={792}
        dataSource={filteredDataSource().slice(0, numberOfRows) || []}
        columns={renderWithIconInHeaders(columns, boolean('Set icons in headers', false))}
        cellHeight={50}
        rowKey={row => row.key}
        onSort={action('onSort')}
        headerButton={
          boolean('Show header button', false) && (
            <Button type="ghost" mode="icon-label" onClick={action('Header button action')}>
              <Icon component={<AddM />} />
              {text('Header button label', 'Add row')}
            </Button>
          )
        }
        selection={
          boolean('Enable row selection', true) && {
            onChange: handleSelectRow,
            selectedRowKeys: Object.keys(selectedRowsMap),
            selections: [
              Table.SELECTION_ALL,
              Table.SELECTION_INVERT,
              {
                key: 'even',
                label: 'Select even',
                onClick: selectEven,
              },
            ],
            limit: boolean('Show limit', false) ? number('Set limit', 5) : undefined,
          }
        }
        rowStar={
          boolean('Enable row star', undefined) && {
            starredRowKeys: starredRowKeys,
            onChange: (starredRowKeys): void => {
              setStarredRowKey(starredRowKeys);
            },
          }
        }
        onRowClick={record => {
          const newSelectedRowsMap = { ...selectedRowsMap };
          if (newSelectedRowsMap[record.key]) {
            delete newSelectedRowsMap[record.key];
          } else {
            newSelectedRowsMap[record.key] = record;
          }
          setSelectedRowsMap(newSelectedRowsMap);
        }}
        searchComponent={
          <SearchInput
            placeholder="Search"
            clearTooltip="Clear"
            onChange={value => {
              console.log('value', value);
              setSearchValue(value);
            }}
            value={searchValue}
            onClear={() => {
              console.log('clear');
              setSearchValue('');
            }}
            closeOnClickOutside={true}
            inputProps={{ autoFocus: false }}
          />
        }
      />
    </div>
  );
};
const stories = {
  default: <VirtualizationWithState />,
};

export default {
  name: 'Components/Table/Table with virtualization',
  decorator,
  stories,
  Component: Table,
};
