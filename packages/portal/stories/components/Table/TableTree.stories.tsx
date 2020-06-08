import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import { ItemsMenu, TreeTable } from '@synerise/ds-table';
import Icon from '@synerise/ds-icon';
import { ChildRowLeftDownM, EditM, FileDownloadM, TrashM } from '@synerise/ds-icon/dist/icons';
import Table from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import * as React from 'react';
import { dataSource } from './content/tabletree.data';
import Checkbox from '@synerise/ds-checkbox';

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
            render: (name) => {
              return (
                <span style={{fontWeight: 500, color: '#576116', fontSize: '13px', lineHeight: '18px'}}>{name}</span>
              )
            }
          },
          {
            title: 'Create',
            dataIndex: 'create',
            key: 'create',
            width: 120,
            render: (value) => <Checkbox withoutPadding checked={value} />
          },
          {
            title: 'Read',
            dataIndex: 'read',
            key: 'read',
            width: 120,
            render: (value) => <Checkbox withoutPadding checked={value} />
          },
          {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
            width: 120,
            render: (value) => <Checkbox withoutPadding checked={value} />
          },
          {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            width: 120,
            render: (value) => <Checkbox withoutPadding checked={value} />
          }
        ];
      };

      return (
        <TreeTable
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
          expandIcon={(props) => {
            const { expandable, expanded, onExpand, record } = props;

            return expandable ? (
              <td className="ant-table-cell">
                <Button.Expander expanded={expanded} onClick={(e) => onExpand(record, e)} />
              </td>
            ) : (
              <Icon component={<ChildRowLeftDownM />} />
            )
          }}
          rowKey={row => row.key}
          selection={
            boolean('Enable row selection', false) && {
              onChange: handleSelectRow,
              selectedRowKeys: selectedRows,
              selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                {
                  key: 'select_custom',
                  onClick: action('select_custom'),
                  label: 'Select custom',
                },
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
  name: 'Table|Table tree',
  decorator,
  stories,
  Component: Table,
};
