import * as React from 'react';
import faker from 'faker';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import Table from '@synerise/ds-table';

const decorator = (storyFn) => (
  <div style={{ padding: 20, width: '100%', minWidth: '1500px' }}>
    {storyFn()}
  </div>
);

const dataSource = [...new Array(55)].map((i, k) => ({
  key: k + 1,
  name: faker.name.findName(),
  age: (Math.random() * 50 + 10).toFixed(0),
  address: faker.address.streetAddress(),
}));

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const rowSelection = {
  selectedRowKeys: [0, 5],
  onChange: action('checkboxChanged'),
};

const stories = {
  default: () => ({
    title: 'Tests',
    subTitle: `${dataSource.length} records`,
    dataSource,
    columns,
    loading: true,
    pagination: {
      showSizeChanger: boolean('pagination.showSizeChanger', true),
      showQuickJumper: boolean('pagination.showQuickJumper', true),
      onChange: action('pageChanged'),
    },
    rowSelection: (boolean('show selection', false) ? rowSelection : undefined),
    onSearch: action('onSearch'),
  }),
};

export default {
  name: 'Components|Table',
  decorator,
  stories,
  Component: Table,
};
