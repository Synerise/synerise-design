import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import { ItemsMenu, TableCell, VirtualTable } from '@synerise/ds-table';
import Icon from '@synerise/ds-icon';
import { EditM, FileDownloadM, InfoFillS, TrashM, VarTypeNumberM } from '@synerise/ds-icon/dist/icons';
import Table from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import * as React from 'react';
import { dataSource } from './content/expandable.data';
import ModalProxy from '@synerise/ds-modal';
import { renderWithIconInHeaders } from './helpers/helpers';
import DSTable from '@synerise/ds-table/dist/Table';
import VarTypeStringM from '@synerise/ds-icon/dist/icons/VarTypeStringM';

const decorator = storyFn => <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>{storyFn()}</div>;

const stories = {
  default: withState({
    expandedRows: [],
    selectedRows: [],
  })(({ store }) => {
      const { expandedRows, selectedRows } = store.state;
      const handleExpandRow = (key: number): void => {
        if (expandedRows.indexOf(key) < 0) {
          store.set({ expandedRows: [...expandedRows, key] });
        } else {
          store.set({ expandedRows: expandedRows.filter(k => k !== key) });
        }
      };

      const handleSelectRow = (selectedRowKeys) => {
        store.set({ selectedRows: selectedRowKeys });
      };

      const getColumns = () => {
        return [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            icon: { component: <VarTypeStringM/>},
            iconTooltip: { component: <InfoFillS/>},
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            icon: { component: <VarTypeNumberM/>},
            iconTooltip: { component: <InfoFillS/>},
          },
          {
            dataIndex: 'children',
            key: 'children',
            width: 72,
            render: (children, record) => {
              if(children !== undefined) {
                return (
                  <TableCell.ActionCell key={record.key}>
                    <Button.Expander expanded={expandedRows.indexOf(record.key) >= 0} onClick={(event) => {
                      event.stopPropagation();
                      handleExpandRow(record.key)
                    }} />
                  </TableCell.ActionCell>
                );
              }
            },
          }
        ];
      };

    const countRecords = () => {
      return dataSource.reduce((count, record) => {
        return record.hasOwnProperty('children') && record.children !== undefined ? count + record.children.length : count + 1;
      }, 0);
    };

    return (
        <ModalProxy visible size="medium" title="VirtualTable with expandable rows" bodyStyle={{padding: 0}}>
          <VirtualTable
            scroll={{y: 600}}
            initialWidth={792}
            cellHeight={50}
            title={`${countRecords()} results`}
            dataSource={dataSource}
            columns={renderWithIconInHeaders(getColumns(),boolean('Set icons in headers', false))}
            loading={boolean('Set loading state', false)}
            roundedHeader={boolean('Rounded header', false)}
            expandable={{
              expandIconColumnIndex: -1,
              expandedRowKeys: expandedRows,
            }}
            onRowClick={(record ) => {
              boolean('Expand on row click', true) && handleExpandRow(record.key)
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
  name: 'Table/Expandable virtualized table',
  decorator,
  stories,
  Component: Table,
};
