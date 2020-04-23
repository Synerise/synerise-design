import * as React from 'react';
import faker from 'faker';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import Table from '@synerise/ds-table';
import VirtualTable from '@synerise/ds-table/dist/Virtualized/Virtualized';
import { withState } from '@dump247/storybook-state';

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
  withVirtualization: withState({
    selectedRowKeys: [],
  })(({store}) => {
    return (
      <div style={{width: 500}}>
        <VirtualTable
          scroll={{ x: 0, y: 480 }}
          rowSelection={{ onChange: (selectedRows, records) => store.set({selectedRowKeys: selectedRows}), selectedRowKeys: store.state.selectedRowKeys }}
          dataSource={dataSource}
          columns={[{name: 'Segment name', key: 'name', dataIndex: 'name'}, {name: 'Age', key: 'age', dataIndex: 'age'}]}
          rowKey="key"
          pagination={false}
          onRowClick={(record) => {
            if(store.state.selectedRowKeys.indexOf(record.key) >= 0) {
              store.set({selectedRowKeys: store.state.selectedRowKeys.filter(k => k !== record.key)});
            }else {
              store.set({selectedRowKeys: [...store.state.selectedRowKeys, record.key]});
            }
          }}
          cellHeight={64}
        />
      </div>
    )
  })
};

export default {
  name: 'Components|Table',
  decorator,
  stories,
  Component: Table,
};
