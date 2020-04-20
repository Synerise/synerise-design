import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import { ItemsMenu, TableCell } from '@synerise/ds-table';
import Icon from '@synerise/ds-icon';
import { AngleDownS, EditM, FileDownloadM, TrashM } from '@synerise/ds-icon/dist/icons';
import Table from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import * as React from 'react';

const decorator = (storyFn) => (
  <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>
    {storyFn()}
  </div>
);

const dataSource = [
  {
    key: '0',
    name: 'John Doe',
  },
  {
    key: '1',
    name: 'John Doe',
  },
  {
    key: '2',
    name: 'John Doe',
    children: [
      {
        key: '3',
        name: 'John Doe',
      },
      {
        key: '4',
        name: 'John Doe',
      }
    ]
  },
  {
    key: '5',
    name: 'John Doe',
  },
  {
    key: '6',
    name: 'John Doe',
  },
  {
    key: '7',
    name: 'John Doe',
    children: [
      {
        key: '8',
        name: 'John Doe',
      },
      {
        key: '9',
        name: 'John Doe',
        children: [
          {
            key: '10',
            name: 'John Doe',
          },
          {
            key: '11',
            name: 'John Doe',
          }
        ]
      }
    ]
  },
  {
    key: '12',
    name: 'John Doe',
  },
  {
    key: '13',
    name: 'John Doe',
  },
  {
    key: '14',
    name: 'John Doe',
  },
  {
    key: '15',
    name: 'John Doe',
  },
  {
    key: '16',
    name: 'John Doe',
  },
  {
    key: '17',
    name: 'John Doe',
  },
  {
    key: '18',
    name: 'John Doe',
  },
];

const CELL_SIZES = {
  default: 'default',
  medium: 'medium',
  small: 'small',
};

const stories = {
  default: withState({
    expandedRows: [],
    selectedRows: [],
  })(({store}) => {
    const { expandedRows, selectedRows } = store.state;
    const handleExpandRow = (key: string): void => {
      if(expandedRows.indexOf(key) < 0) {
        store.set({expandedRows: [...expandedRows, key]});
      }else {
        store.set({expandedRows: expandedRows.filter(k => k !== key)});
      }
    };

    const handleSelectRow = (selectedRowKeys) => {
      store.set({selectedRows: selectedRowKeys});
    };

    const getColumns = () => {
      return [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },{
          dataIndex: 'children',
          key: 'children',
          render: (children, record) => {
            if(children !== undefined) {
              return (
                <TableCell.ActionCell>
                  <Button type='secondary' mode='single-icon' shape='circle' onClick={() => {handleExpandRow(record.key)}}>
                    <Icon component={<AngleDownS />} />
                  </Button>
                </TableCell.ActionCell>
              );
            }
          }
        }
      ]};

    return (<Table
      title={`${dataSource.length} records`}
      dataSource={dataSource}
      columns={getColumns()}
      loading={boolean('Set loading state', false)}
      roundedHeader={boolean('Rounded header', false)}
      cellSize={select('Set cells size', CELL_SIZES, CELL_SIZES.default)}
      pagination={{
        showSizeChanger: boolean('pagination.showSizeChanger', true),
        showQuickJumper: boolean('pagination.showQuickJumper', true),
        onChange: action('pageChanged'),
      }}
      expandable={{
        expandIconColumnIndex: -1,
        expandedRowKeys: expandedRows
      }}
      selection={boolean('Enable row selection', false) && {
        onChange: handleSelectRow,
        selectedRowKeys: selectedRows,
        selections: [
          Table.SELECTION_ALL,
          Table.SELECTION_VISIBLE,
          Table.SELECTION_INVERT,
          {
            onClick: action('select_custom'),
            label: 'Select custom',
          }
        ],
        setRowSelection: handleSelectRow
      }}
      onSearch={console.log}
      itemsMenu={
        <ItemsMenu>
          <Button onClick={action('Export')} type='secondary' mode='icon-label'>
            <Icon component={<FileDownloadM/>}/>
            Export
          </Button>
          <Button onClick={action('Edit')} type='secondary' mode='icon-label'>
            <Icon component={<EditM/>}/>
            Edit
          </Button>
          <Button onClick={action('Delete')} type='secondary' mode='icon-label'>
            <Icon component={<TrashM/>}/>
            Delete
          </Button>
        </ItemsMenu>
      }
    />)
  }),
};

export default {
  name: 'Table|Expandable table',
  decorator,
  stories,
  Component: Table,
};
