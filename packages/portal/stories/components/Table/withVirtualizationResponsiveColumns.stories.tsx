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

const dataSource = [...new Array(5000)].map((i, index) => ({
  key: String(index + 1),
  name: faker.name.findName(),
  city: faker.address.city(),
  address: faker.address.streetAddress(),
  number: String(faker.finance.amount()),
  transactionType: faker.finance.transactionType(),
}));

const columns = [
  {
    title: 'User name (min 200px -> max 400px)',
    key: 'name',
    dataIndex: 'name',
    icon: { component: <VarTypeStringM /> },
    iconTooltip: { component: <InfoFillS /> },
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortRender: 'string',
    fixed: 'left',
    minWidth: 200,
    maxWidth: 400
  },
  {
    title: 'Address (min 150px no max)',
    key: 'address',
    dataIndex: 'address',
    sorter: (a, b) => a.address.localeCompare(b.address),
    sortRender: 'string',
    minWidth: 150
  },
  {
    title: 'City (min 100px no max)',
    key: 'city',
    dataIndex: 'city',
    sorter: (a, b) => a.city.localeCompare(b.city),
    sortRender: 'string',
    minWidth: 100
  },
  {
    title: 'Number (100px)',
    key: 'number',
    dataIndex: 'number',
    sorter: (a, b) => a.number.localeCompare(b.number),
    width: 100
  },
  {
    title: 'Type (120px)',
    key: 'transactionType',
    fixed: 'right',
    dataIndex: 'transactionType',
    sorter: (a, b) => a.transactionType.localeCompare(b.transactionType),
    sortRender: 'string',
    width: 120
  },
];

const VirtualizationWithState: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  
  
  const filteredDataSource = React.useCallback(() => {
    return !searchValue
      ? dataSource
      : dataSource.filter(record => {
          return typeof record.name === 'string' && record.name.toLowerCase().includes(searchValue.toLowerCase());
        });
  }, [searchValue]);

  const numberOfRows = number('Number of rows (maximum 5000)', filteredDataSource().length, {
    max: filteredDataSource().length,
  });

  return (
    <div style={{ width: '100%'}}>
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
  name: 'Components/Table/Virtual table & responsive columns',
  decorator,
  stories,
  Component: Table,
};
