import { VirtualTable } from '@synerise/ds-table';
import faker from 'faker';
import Table from '@synerise/ds-table';
import * as React from 'react';
import { SearchInput } from '@synerise/ds-search/dist/Elements';
import { boolean, number, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Button from '@synerise/ds-button';
import Icon, { AddM, InfoFillS, VarTypeStringM } from '@synerise/ds-icon';
import { renderWithIconInHeaders } from './helpers/helpers';

const decorator = storyFn => <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>{storyFn()}</div>;

const dataSource = [...new Array(5000)].map((i, k) => ({
  key: String(k + 1),
  name: faker.name.findName(),
  city: faker.address.city(),
  address: faker.address.streetAddress(),
  number: String(faker.finance.amount()),
  unavailable: Math.random() < 0.1,
  disabled: Math.random() < 0.3,
  transactionType: faker.finance.transactionType(),
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
    width: 200
  },
  {
    title: 'Address',
    key: 'address',
    dataIndex: 'address',
    sorter: (a, b) => a.address.localeCompare(b.address),
    sortRender: 'string',
    width: '300px'
  },
  {
    title: 'City',
    key: 'city',
    dataIndex: 'city',
    sorter: (a, b) => a.city.localeCompare(b.city),
    sortRender: 'string',
    width: '400px'
  },
  {
    title: 'Number',
    key: 'number',
    dataIndex: 'number',
    sorter: (a, b) => a.number.localeCompare(b.number),
  },
  {
    title: 'Type',
    key: 'transactionType',
    dataIndex: 'transactionType',
    sorter: (a, b) => a.transactionType.localeCompare(b.transactionType),
    sortRender: 'string',
    width: 180
  },
  {
    title: 'Type',
    key: 'transactionType',
    dataIndex: 'transactionType',
    sorter: (a, b) => a.transactionType.localeCompare(b.transactionType),
    sortRender: 'string',
    width: 180
  },
];

const VirtualizationWithState: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [starredRowKeys, setStarredRowKey] = React.useState<React.Key[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);

  const filteredDataSource = React.useCallback(() => {
    return !searchValue
      ? dataSource
      : dataSource.filter(record => {
          return typeof record.name === 'string' && record.name.toLowerCase().includes(searchValue.toLowerCase());
        });
  }, [searchValue]);

  const handleSelectionChange = (selectedRowKeys) => {
    action('selection.onChange')(selectedRowKeys)
    setSelectedRowKeys(selectedRowKeys);
  };

  const numberOfRows = number('Number of rows (maximum 5000)', filteredDataSource().length, {
    max: filteredDataSource().length,
  });
  const statusOptions = {
    'random': (_record) => ({disabled: _record.disabled, unavailable: _record.unavailable}),
    'all disabled': (_record) => ({disabled: true, unavailable: _record.unavailable}),
    'all unavailable': (_record) => ({disabled: _record.disabled, unavailable: true}),
    'none': undefined
  }



  return (
    <div style={{ width: '100%' }}>
      <VirtualTable
        title={text('Table title', 'Virtualized table')}
        scroll={{ y: 500, x: 0 }}
        initialWidth={792}
        dataSource={filteredDataSource().slice(0, numberOfRows) || []}
        dataSourceFull={dataSource}
        columns={renderWithIconInHeaders(columns, boolean('Set icons in headers', false))}
        cellHeight={51}
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
            onChange: handleSelectionChange,
            selectedRowKeys: selectedRowKeys,
            checkRowSelectionStatus: select('Pick selection status for rows?', statusOptions, statusOptions['none']),
            selections: [
              Table.SELECTION_ALL,
              Table.SELECTION_INVERT
            ],
            limit: boolean('Show limit', false) ? number('Set limit', 5) : undefined,
          }
        }
        rowStar={
          boolean('Enable row star', false) && {
            starredRowKeys: starredRowKeys,
            onChange: (starredRowKeys): void => {
              setStarredRowKey(starredRowKeys);
            },
          }
        }
        onRowClick={record => {
          const { key } = record;
          const newSelectedRowKeys = [...selectedRowKeys];
          if (newSelectedRowKeys.indexOf(key) > -1) {
            newSelectedRowKeys.splice(newSelectedRowKeys.indexOf(key), 1);
          } else {
            newSelectedRowKeys.push(key);
          }
          setSelectedRowKeys(newSelectedRowKeys);
        }}
        searchComponent={
          <SearchInput
            placeholder="Search"
            clearTooltip="Clear"
            onChange={value => {
              setSearchValue(value);
            }}
            value={searchValue}
            onClear={() => {
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
