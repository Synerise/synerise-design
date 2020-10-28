import { VirtualTable } from '@synerise/ds-table';
import faker from 'faker';
import Table from '@synerise/ds-table';
import * as React from 'react';
import { SearchInput } from '@synerise/ds-search/dist/Elements';
import { withState } from '@dump247/storybook-state';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Button from '@synerise/ds-button';
import { AddM, InfoFillS, VarTypeStringM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import { renderWithIconInHeaders } from './helpers/helpers';

const decorator = storyFn => <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>{storyFn()}</div>;

const dataSource = [...new Array(5000)].map((i, k) => ({
  key: k + 1,
  name: faker.name.findName(),
}));

const columns = [
  {
    title: 'User name',
    key: 'name',
    dataIndex: 'name',
    icon: { component: <VarTypeStringM/>},
    iconTooltip: { component: <InfoFillS/>},
  },
];

const stories = {
  default: withState({
    searchValue: '',
    selectedRows: [],
  })(({ store }) => {
    const filteredDataSource = () => {
      return !store.state.searchValue
        ? dataSource
        : dataSource.filter(record => {
            return record.name.toLowerCase().includes(store.state.searchValue.toLowerCase());
          });
    };

    const handleSelectRow = selectedRowKeys => {
      store.set({ selectedRows: selectedRowKeys });
    };

    const selectEven = () => {
      const evenRows = filteredDataSource()
        .map(row => row.key)
        .filter((key, index) => index % 2);
      store.set({ selectedRows: evenRows });
    };

    return (
      <div style={{ width: 792 }}>
        <VirtualTable
          scroll={{ y: 500, x: 0 }}
          initialWidth={792}
          title={`${filteredDataSource().length} ${text('Set name of table items', 'results')}`}
          dataSource={filteredDataSource()}
          columns={renderWithIconInHeaders(columns,boolean('Set icons in headers', false))}
          cellHeight={50}
          rowKey={row => row.key}
          headerButton={
            boolean('Show header button', false) && (
              <Button type="ghost" mode="icon-label" onClick={action('Header button action')}>
                <Icon component={<AddM />} />
                {text('Header button label', 'Add row')}
              </Button>
            )
          }
          selection={{
            onChange: handleSelectRow,
            selectedRowKeys: store.state.selectedRows,
            selections: [
              Table.SELECTION_ALL,
              Table.SELECTION_INVERT,
              {
                key: 'even',
                label: 'Select even',
                onClick: selectEven,
              },
            ],
          }}
          onRowClick={record => {
            store.state.selectedRows.indexOf(record.key) >= 0
              ? store.set({ selectedRows: store.state.selectedRows.filter(k => k !== record.key) })
              : store.set({ selectedRows: [...store.state.selectedRows, record.key] });
          }}
          searchComponent={
            <SearchInput
              placeholder="Search"
              clearTooltip="Clear"
              onChange={value => {
                console.log('value', value);
                store.set({ searchValue: value });
              }}
              value={store.state.searchValue}
              onClear={() => {
                console.log('clear');
                store.set({ searchValue: '' });
              }}
              closeOnClickOutside={true}
            />
          }
        />
      </div>
    );
  }),
};

export default {
  name: 'Table/Table with virtualization',
  decorator,
  stories,
  Component: Table,
};
