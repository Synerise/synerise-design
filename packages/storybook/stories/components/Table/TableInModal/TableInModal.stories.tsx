import React, { Key, isValidElement, useMemo, useState } from 'react';
import { action } from 'storybook/actions';
import { fn } from 'storybook/test';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Button from '@synerise/ds-button';
import Icon, { AddM } from '@synerise/ds-icon';
import Modal from '@synerise/ds-modal';
import { SearchInput } from '@synerise/ds-search';
import Table, { VirtualTable, VirtualTableProps } from '@synerise/ds-table';

import {
  BOOLEAN_CONTROL,
  NUMBER_CONTROL,
  fixedWrapper1000,
} from '../../../utils';
import { TableMeta, renderWithIconInHeaders } from '../Table.utils';
import {
  COLUMNS,
  COLUMNS_WITH_CELL_TOOLTIPS,
  DATA_SOURCE,
} from './TableInModal.data';

type RowType = (typeof DATA_SOURCE)[number];
type Story = StoryObj<StoryType>;
type StoryType = VirtualTableProps<RowType> & {
  showIconsInHeader: boolean;
  showHeaderButton: boolean;
  columnsData: Array<any>;
  selectionLimit: number;
  selectionHideSelectAll: boolean;
  randomiseSelectionColumn: boolean;
};

export default {
  ...TableMeta,
  parameters: {
    ...TableMeta.parameters,
    actions: { argTypesRegex: 'onSort' },
  },
  title: 'Components/Table/InModal',
  decorators: [fixedWrapper1000],
  render: ({
    showIconsInHeader,
    showHeaderButton,
    randomiseSelectionColumn,
    selectionLimit,
    selectionHideSelectAll,
    columnsData,
    dataSource,
    ...args
  }) => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([
      '1',
      '3',
      '4',
      '5',
    ]);
    const [starredRowKeys, setStarredRowKeys] = useState<string[]>([]);
    const [modalVisible, setModalVisible] = useState(false);

    const filteredDataSource = useMemo(() => {
      return !searchValue
        ? dataSource
        : dataSource?.filter((record) => {
            let nameLowercase = '';
            if (typeof record.name === 'string') {
              nameLowercase = record.name.toLowerCase();
            } else if (
              isValidElement(record.name) &&
              typeof record.name.props.children === 'string'
            ) {
              nameLowercase = record.name.props.children.toLowerCase();
            }
            return nameLowercase.includes(searchValue.toLowerCase());
          });
    }, [searchValue]);

    const handleSelectRow = (
      selectedRowKeys: Key[],
      dataSourceSubset: RowType[],
    ) => {
      args.selection?.onChange?.(selectedRowKeys, dataSourceSubset);
      setSelectedRowKeys(selectedRowKeys);
    };

    const columns = renderWithIconInHeaders<RowType>(
      columnsData,
      showIconsInHeader,
    );
    const headerButton = showHeaderButton && (
      <Button type="ghost" mode="icon-label" onClick={fn()}>
        <Icon component={<AddM />} />
        Add row
      </Button>
    );

    const randomStatus = (record: RowType) => ({
      disabled: record.disabled,
      unavailable: record.unavailable,
    });
    const selections = selectionLimit
      ? [Table.SELECTION_ALL]
      : [
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
        ];
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
              ...args.selection,
              onChange: handleSelectRow,
              selectedRowKeys,
              checkRowSelectionStatus: randomiseSelectionColumn
                ? randomStatus
                : undefined,
              selections,
              limit: selectionLimit ? selectionLimit : undefined,
              hideSelectAll: selectionHideSelectAll
                ? selectionHideSelectAll
                : undefined,
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
                onChange={(value) => {
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
    selection: { onChange: fn(), selectedRowKeys: [] },
    columnsData: COLUMNS,
    selectionLimit: 5,
    scroll: { y: 500, x: 0 },
    initialWidth: 792,
    cellHeight: 50,
  },
};

export const WithRowTooltips: Story = {
  args: {
    ...InModal.args,
    getRowTooltipProps: (rowData: (typeof DATA_SOURCE)[number]) => {
      return rowData.unavailable || rowData.disabled
        ? {
            placement: 'topLeft',
            align: { offset: [15, 0] },
            title: 'This item cannot be selected',
          }
        : {
            placement: 'topLeft',
            align: { offset: [15, 0] },
            title: rowData.name,
          };
    },
  },
};

export const WithCellTooltips: Story = {
  args: {
    ...InModal.args,
    columnsData: COLUMNS_WITH_CELL_TOOLTIPS,
  },
};

export const WithSelectionTooltips: Story = {
  args: {
    ...InModal.args,
    selection: {
      onChange: fn(),
      selectedRowKeys: [],
      getSelectionTooltipProps: (record: RowType) => ({
        title: <>tooltip for record {record.name}</>,
      }),
    },
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
