import React, { useMemo, isValidElement, useState, Key } from 'react';
import { fn } from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Table, { VirtualTableProps, VirtualTable } from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import Icon, { AddM } from '@synerise/ds-icon';
import Modal from '@synerise/ds-modal';
import { SearchInput } from '@synerise/ds-search';

import { renderWithIconInHeaders, TableMeta } from '../Table.utils';
import { BOOLEAN_CONTROL, fixedWrapper1000, NUMBER_CONTROL } from '../../../utils';
import { COLUMNS, DATA_SOURCE } from './TableInModal.data';

type RowType = typeof DATA_SOURCE[number];
type Story = StoryObj<StoryType>;
type StoryType = VirtualTableProps<RowType> & {
  showIconsInHeader: boolean;
  showHeaderButton: boolean;
  columnsData: Array<any>;
  selectionLimit: number;
  selectionHideSelectAll: boolean;
};

export default {
  ...TableMeta,
  parameters: {
    ...TableMeta.parameters,
    actions: { argTypesRegex: 'onSort' },
  },
  title: 'Components/Table/InModal',
  decorators: [fixedWrapper1000],
  render: ({ showIconsInHeader, showHeaderButton, selectionLimit, selectionHideSelectAll, columnsData, dataSource, ...args }) => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>(['1','3','4','5']);
    const [starredRowKeys, setStarredRowKeys] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    const filteredDataSource = useMemo(() => {
      return !searchValue
        ? dataSource
        : dataSource?.filter(record => {
            let nameLowercase = '';
            if (typeof record.name === 'string') {
              nameLowercase = record.name.toLowerCase();
            } else if (isValidElement(record.name) && typeof record.name.props.children === 'string') {
              nameLowercase = record.name.props.children.toLowerCase();
            }
            return nameLowercase.includes(searchValue.toLowerCase());
          });
    }, [searchValue]);

    const handleSelectRow = (selectedRowKeys: Key[], dataSourceSubset: RowType[]) => {
      args.selection?.onChange?.(selectedRowKeys, dataSourceSubset);
      setSelectedRowKeys(selectedRowKeys);
    };

    const columns = renderWithIconInHeaders<RowType>(columnsData, showIconsInHeader);
    const headerButton = showHeaderButton && (
      <Button type="ghost" mode="icon-label" onClick={fn()}>
        <Icon component={<AddM />} />
        Add row
      </Button>
    );

    const randomStatus = (record: RowType) => ({ disabled: record.disabled, unavailable: record.unavailable });

    return (
      <>
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Show table
        </Button>
        <Modal
          size="medium"
          visible={modalVisible}
          title={'Table'}
          bodyStyle={{ padding: 0 }}
          onCancel={() => {
            setModalVisible(false);
            setSelectedRowKeys([]);
          }}
        >
          <VirtualTable
            {...args}
            columns={columns}
            headerButton={headerButton}
            dataSource={filteredDataSource}
            dataSourceFull={dataSource}
            selection={{
              onChange: handleSelectRow,
              selectedRowKeys,
              checkRowSelectionStatus: randomStatus,
              selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                {
                  key: 'even',
                  label: 'Select even',
                  onClick: () => {
                    const evenRowKeys: string[] = [];
                    dataSource?.forEach((row, index) => {
                      if (index % 2 === 0) {
                        evenRowKeys.push(row.key);
                      }
                    });
                    setSelectedRowKeys(evenRowKeys);
                  },
                },
              ],
              limit: selectionLimit ? selectionLimit : undefined,
              hideSelectAll: selectionHideSelectAll ? selectionHideSelectAll : undefined,
            }}
            rowStar={{
              starredRowKeys: starredRowKeys,
              onChange: (starredRowKeys): void => {
                setStarredRowKeys(starredRowKeys);
              },
            }}
            searchComponent={
              <SearchInput
                placeholder="Search"
                clearTooltip="Clear"
                onChange={value => {
                  setSearchValue(value);
                }}
                value={searchValue}
                onClear={() => {
                  setSearchValue('');
                }}
                closeOnClickOutside={true}
                inputProps={{ autoFocus: false }}
              />
            }
          />
        </Modal>
      </>
    );
  },
  argTypes: {
    ...TableMeta.argTypes,
    selectionLimit: NUMBER_CONTROL,
    selectionHideSelectAll: BOOLEAN_CONTROL,
  },
  args: {
    ...TableMeta.args,
    dataSource: DATA_SOURCE,
    pagination: false,
  },
  component: Table,
} as Meta<StoryType>;

export const InModal: Story = {
  args: {
    selection: {onChange: action('selection.onChange') },
    columnsData: COLUMNS,
    selectionLimit: 5,
    scroll: { y: 500, x: 0 },
    initialWidth: 792,
    cellHeight: 50,
  },
};

export const HiddenBatchSelection: Story = {
  args: {
    columnsData: COLUMNS,
    selectionHideSelectAll: true,
    scroll: { y: 500, x: 0 },
    initialWidth: 792,
    cellHeight: 50,
  },
};
