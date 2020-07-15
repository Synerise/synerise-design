import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import { ItemsMenu, TableCell, VirtualTable } from '@synerise/ds-table';
import Icon from '@synerise/ds-icon';
import { EditM, FileDownloadM, TrashM } from '@synerise/ds-icon/dist/icons';
import Table from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import * as React from 'react';
import { dataSource, dataSourceForVirtualTable } from './content/expandable.data';
import Card from '@synerise/ds-card';
import ModalProxy from '@synerise/ds-modal';

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

      const selectEven = () => {
        const evenRows = dataSourceForVirtualTable.map(row => row.key).filter((key, index) => index % 2);
        store.set({selectedRows: evenRows});
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
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
          },
          {
            dataIndex: 'children',
            key: 'children',
            width: 72,
            render: (children, record) => {
              if(children !== undefined) {
                return (
                  <TableCell.ActionCell key={record.key}>
                    <Button.Expander expanded={expandedRows.indexOf(record.key) >= 0} onClick={() => {handleExpandRow(record.key)}} />
                  </TableCell.ActionCell>
                );
              }
            },
          }
        ];
      };

    const countRecords = () => {
      const result = dataSourceForVirtualTable.reduce((count, record) => {
        return record.hasOwnProperty('children') && record.children !== undefined ? count + record.children.length : count + 1;
      }, 0);
      return result;
    };

    return (
        <ModalProxy visible size="medium" title="VirtualTable with expandable rows" bodyStyle={{padding: 0}}>
          <VirtualTable
            scroll={{y: 600}}
            initialWidth={792}
            cellHeight={50}
            title={`${countRecords()} results`}
            dataSource={dataSourceForVirtualTable}
            columns={getColumns()}
            loading={boolean('Set loading state', false)}
            roundedHeader={boolean('Rounded header', false)}
            expandable={{
              expandIconColumnIndex: -1,
              expandedRowKeys: expandedRows,
            }}
            rowKey={row => row.key}
            selection={{
                onChange: handleSelectRow,
                selectedRowKeys: selectedRows,
                selections: [
                  Table.SELECTION_ALL,
                  undefined,
                  null,
                  Table.SELECTION_INVERT,
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
          />
        </ModalProxy>)
    }
  ),
};

export default {
  name: 'Table|Expandable virtualized table',
  decorator,
  stories,
  Component: Table,
};
