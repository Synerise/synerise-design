import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import { ItemsMenu, TableCell } from '@synerise/ds-table';
import Icon from '@synerise/ds-icon';
import { EditM, FileDownloadM, TrashM } from '@synerise/ds-icon/dist/icons';
import Table from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import * as React from 'react';
import { dataSource } from './content/expandableWithContainer.data';

const decorator = storyFn => <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>{storyFn()}</div>;

const CELL_SIZES = {
  default: 'default',
  medium: 'medium',
  small: 'small',
};

const stories = {
  default: withState({
    expandedRows: [],
    selectedRows: [],
  })(({ store }) => {
    const { expandedRows, selectedRows } = store.state;
    const handleExpandRow = (key: string): void => {
      if (expandedRows.indexOf(key) < 0) {
        store.set({ expandedRows: [...expandedRows, key] });
      } else {
        store.set({ expandedRows: expandedRows.filter(k => k !== key) });
      }
    };

    const handleSelectRow = selectedRowKeys => {
      store.set({ selectedRows: selectedRowKeys });
    };

    const getColumns = () => {
      return [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          dataIndex: 'more',
          key: 'more',
          width: 72,
          render: (more, record) => {
            if(more !== undefined) {
              return (
                <TableCell.ActionCell>
                  <Button.Expander expanded={expandedRows.indexOf(record.key) >= 0} onClick={() => {handleExpandRow(record.key)}} />
                </TableCell.ActionCell>
              );
            }
          },
        },
      ];
    };

    return (
      <Table
        title={`${dataSource.length} records`}
        dataSource={dataSource}
        columns={getColumns()}
        loading={boolean('Set loading state', false)}
        roundedHeader={boolean('Rounded header', false)}
        cellSize={select('Set cells size', CELL_SIZES, CELL_SIZES.default)}
        pagination={{
          showSizeChanger: boolean('Show size changer', true),
          showQuickJumper: boolean('Show quick jumper', true),
          onChange: action('pageChanged'),
        }}
        expandable={{
          expandIconColumnIndex: -1,
          expandedRowKeys: expandedRows,
          expandedRowRender: (record) => {
            return record.more.text;
          },
        }}
        rowKey={row => row.key}
        selection={
          boolean('Enable row selection', false) && {
            onChange: handleSelectRow,
            selectedRowKeys: selectedRows,
            selections: [
              Table.SELECTION_ALL,
              Table.SELECTION_INVERT
            ]
          }
        }
        onSearch={console.log}
        onRow={(record, index: number) => ({
          onClick: event => {
            boolean('Expand on row click', false) && handleExpandRow(record.key)
          },
        })}
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
    }
  ),
};

export default {
  name: 'Table|Expandable table with container',
  decorator,
  stories,
  Component: Table,
};
