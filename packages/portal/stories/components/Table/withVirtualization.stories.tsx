import { DSVirtualTable } from '@synerise/ds-table';
import faker from 'faker';
import Table from '@synerise/ds-table';
import * as React from 'react';
import { SearchInput } from '@synerise/ds-search/dist/Elements';
import { withState } from '@dump247/storybook-state';
import { number } from '@storybook/addon-knobs';

const decorator = (storyFn) => (
  <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>
    {storyFn()}
  </div>
);

const dataSource = [...new Array(100000)].map((i, k) => ({
  key: k + 1,
  name: faker.name.findName(),
}));

const columns = [
  {
    title: 'User name',
    key: 'name',
    dataIndex: 'name'
  }
];

const stories = {
  default: withState({
    searchValue: '',
  })(({store}) => {
    const filteredDataSource = () => {
      return !store.state.searchValue ? dataSource : dataSource.filter(record => {
        return record.name.toLowerCase().includes(store.state.searchValue.toLowerCase());
      });
    };

    return (
      <>
        <DSVirtualTable
          scroll={{y: 500, x: 20}}
          title={`${filteredDataSource().length} records`}
          dataSource={filteredDataSource()}
          columns={columns}
          cellHeight={number('Height of table row', 50)}
          searchComponent={
            <SearchInput
              placeholder={'Type here...'}
              clearTooltip={'Clear value'}
              onValueChange={value => {
                store.set({searchValue: value});
              }}
              value={store.state.searchValue}
              onClear={() => {
                store.set({searchValue: ''});
              }}
              closeOnClickOutside={true}
            />
          }
        />
      </>
    )
  })
};

export default {
  name: 'Table|Table with virtualization',
  decorator,
  stories,
  Component: Table,
};
