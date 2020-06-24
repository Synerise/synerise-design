import * as React from 'react';
import faker from 'faker';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import Table from '@synerise/ds-table';
import { COLUMNS } from './content/withFixedColumns.data';
import { withState } from '@dump247/storybook-state';

const decorator = (storyFn) => (
  <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>
    {storyFn()}
  </div>
);

const dataSource = [...new Array(55)].map((i, k) => ({
  key: k + 1,
  name: faker.name.findName(),
  city: faker.random.arrayElement(['Berlin', 'London', 'Paris', 'Warsaw', 'New York', 'Denver']),
  age: (Math.random() * 50 + 10).toFixed(0),
  system: faker.random.arrayElement(['OSX', 'Windows', 'Linux']),
  format: faker.random.arrayElement(['JPG', 'Zip', 'png']),
  lang: faker.random.arrayElement(['pl', 'en', 'es']),
}));

const CELL_SIZES = {
  default: 'default',
  medium: 'medium',
  small: 'small',
};

const stories = {
  fixedColumns: withState({
    selectedRows: [],
  })(({ store }) => {
    const handleSelectRow = (selectedRowKeys) => {
      store.set({ selectedRows: selectedRowKeys });
    };

    const selectEven = () => {
      const evenRows = dataSource.map(row => row.key).filter((key, index) => index % 2);
      store.set({selectedRows: evenRows});
    };


    return (
      <Table
        title={`${dataSource.length} records`}
        dataSource={dataSource}
        layout='fixed'
        columns={COLUMNS}
        loading={boolean('Set loading state', false)}
        roundedHeader={boolean('Rounded header', false)}
        pagination={{
          showSizeChanger: boolean('Show size changer', true),
          showQuickJumper: boolean('Show quick jumper', true),
          onChange: action('pageChanged')
        }}
        rowKey={(row) => row.key}
        scroll={{x: 0}}
        selection={boolean('Enable row selection', true) && {
          onChange: handleSelectRow,
          selectedRowKeys: store.state.selectedRows,
          selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            {
              key: 'even',
              label: 'Select even',
              onClick: selectEven,
            }
          ],
        }}
        onSearch={action('onSearch')}
        cellSize={select('Set cells size', CELL_SIZES, CELL_SIZES.default)}
      />
    )
  })
};

export default {
  name: 'Table|Table with fixed columns',
  decorator,
  stories,
  Component: Table,
};
