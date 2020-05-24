import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withState } from '@dump247/storybook-state';
import Table, { GroupedTable, ItemsMenu, TableCell } from '@synerise/ds-table';
import * as React from 'react';
import { dataSource } from './content/groupedTable.data';
import Avatar from '@synerise/ds-avatar';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { EditM, FileDownloadM, TrashM } from '@synerise/ds-icon/dist/icons';

const decorator = storyFn => <div style={{ padding: 20, width: '100vw', minWidth: '100%' }}>{storyFn()}</div>;

const CELL_SIZES = {
  default: 'default',
  medium: 'medium',
  small: 'small',
};

const stories = {
  default: withState({
    selectedRows: [],
  })(({ store }) => {
      const { selectedRows } = store.state;

      const handleSelectRow = selectedRowKeys => {
        store.set({ selectedRows: selectedRowKeys });
      };

      const itemsCount = dataSource.reduce((count, group) => {
        return count + group.rows.length;
      }, 0);

      const getColumns = () => {
        return [
          {
            title: 'First name',
            dataIndex: 'first_name',
            key: 'first_name',
            render: (firstName) => {
              return (
                <TableCell.AvatarLabelCell
                  avatar={
                    <Avatar
                      backgroundColor='blue'
                      backgroundColorHue='600'
                      size='medium'
                    >
                      {firstName[0]}
                    </Avatar>}
                  title={firstName}
                />
              )
            }
          },
          {
            title: 'Last name',
            dataIndex: 'last_name',
            key: 'last_name',
          },
          {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            sorter: (a, b) => {
              if( a.city < b.city ) return -1;
              if( a.city > b.city ) return 1;
              return 0;
            },
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            sorter: (a, b) => a.age - b.age,
          },
        ];
      };

      return (
        <GroupedTable
          title={`${itemsCount} records`}
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
          addItem={action('ADD item action')}
          rowKey={row => row.key}
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
          selection={
            boolean('Enable row selection', true) && {
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
        />)
    }
  ),
};

export default {
  name: 'Table|Grouped table',
  decorator,
  stories,
  Component: Table,
};
