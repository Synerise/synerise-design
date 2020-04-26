import { VirtualTable } from '@synerise/ds-table';
import faker from 'faker';
import Table from '@synerise/ds-table';
import * as React from 'react';
import { SearchInput } from '@synerise/ds-search/dist/Elements';
import { withState } from '@dump247/storybook-state';

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
    selectedRows: [],
  })(({store}) => {
    const filteredDataSource = () => {
      return !store.state.searchValue ? dataSource : dataSource.filter(record => {
        return record.name.toLowerCase().includes(store.state.searchValue.toLowerCase());
      });
    };

    const handleSelectRow = (selectedRowKeys) => {
      store.set({selectedRows: selectedRowKeys});
    };

    return (
      <div style={{width: 960}}>
        <VirtualTable
          scroll={{y: 500, x: 0}}
          initialWidth={960}
          title={`${filteredDataSource().length} records`}
          dataSource={filteredDataSource()}
          columns={columns}
          cellHeight={50}
          selection={{
            onChange: handleSelectRow,
            selectedRowKeys: store.state.selectedRows,
            setRowSelection: handleSelectRow
          }}
          onRowClick={record => {
            store.state.selectedRows.indexOf(record.key) >= 0 ? store.set({selectedRows: store.state.selectedRows.filter(k => k !== record.key)}) : store.set({selectedRows: [...store.state.selectedRows, record.key]});
          }}
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
      </div>
    )
  })
};

export default {
  name: 'Table|Table with virtualization',
  decorator,
  stories,
  Component: Table,
};
