import * as React from 'react';
import faker from 'faker';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean, text, number } from '@storybook/addon-knobs';
import Table from '@synerise/ds-table';
import { DSProvider } from '@synerise/ds-core';

const stories = storiesOf('Components|Table', module);

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

stories.add('default', () => {
  const pagination = {
    showSizeChanger: boolean('pagination.showSizeChanger', true),
    showQuickJumper: boolean('pagination.showQuickJumper', true),
    onChange: action('pageChanged'),
  };
  const rowSelection = {
    selectedRowKeys: [0, 5],
    onChange: action('checkboxChanged'),
  };
  const onSearch = action('onSearch')
  return (
    <div style={{ padding: 20, width: '100%', minWidth: '1500px' }}>
      <DSProvider code="pl_PL">
        <Table
          title="Tests"
          subTitle={`${dataSource.length} records`}
          dataSource={dataSource}
          columns={columns}
          loading={true}
          pagination={pagination}
          rowSelection={rowSelection}
          onSearch={onSearch}
        />
      </DSProvider>
    </div>
  );
});

export default stories;
