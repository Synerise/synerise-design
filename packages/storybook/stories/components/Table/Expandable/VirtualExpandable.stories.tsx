import React from 'react';
import { fn } from '@storybook/test';
import { Meta, StoryObj } from '@storybook/react';

import { ObjectAvatar } from '@synerise/ds-avatar';
import Icon, {
  AddM,
  EditM,
  FileDownloadM,
  InfoFillS,
  MailM,
  TrashM,
  VarTypeNumberM,
  VarTypeStringM,
} from '@synerise/ds-icon';
import Table, { VirtualTable, VirtualTableProps, DSColumnType, TableCell, ItemsMenu } from '@synerise/ds-table';
import Button from '@synerise/ds-button';
import ModalProxy from '@synerise/ds-modal';

import { AdditionalColumnData } from '../Table.types';
import { chromaticCellRender, renderWithIconInHeaders, TableMeta } from '../Table.utils';
import { DATA_SOURCE } from './Expandable.data';
import { useExpandableData } from './useExpandableData';
import { fixedWrapper1000 } from '../../../utils';

type RowType = typeof DATA_SOURCE[number];
type Story = StoryObj<StoryType>;
type StoryType = VirtualTableProps<RowType> & {
  showIconsInHeader: boolean;
  showHeaderButton: boolean;
  columnsData: Array<any>;
  independentSelectionExpandedRows: boolean;
  randomiseSelectionColumn: boolean;
};

export default {
  ...TableMeta,
  parameters: {
    ...TableMeta.parameters,
  },
  title: 'Components/Table/ExpandableRows',
  decorators: [fixedWrapper1000],
  render: ({ showIconsInHeader, showHeaderButton, randomiseSelectionColumn, independentSelectionExpandedRows, ...args }) => {
    const { selectedRows, expandedRows, handleExpandRow, handleSelectRow } = useExpandableData();
    const columnsData: (DSColumnType<RowType> & AdditionalColumnData)[] = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        className: 'chromatic-ignore',
        icon: { component: <VarTypeStringM /> },
        iconTooltip: { component: <InfoFillS /> },
        render: name => {
          return (
            <TableCell.AvatarLabelCell
              avatarAction={fn()}
              avatar={<ObjectAvatar size="medium" iconComponent={<Icon component={<MailM />} color="red" />} />}
              title={name}
            />
          );
        },
        childRender: name => {
          return <TableCell.StatusLabelCell status={'active'} label={name} />;
        },
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        className: 'chromatic-ignore',
        icon: { component: <VarTypeNumberM /> },
        iconTooltip: { component: <InfoFillS /> },
        // render: chromaticCellRender,
      },
      {
        dataIndex: 'children',
        key: 'children',
        width: 72,
        className: 'chromatic-ignore',
        render: (children, record) => {
          if (children !== undefined) {
            return (
              <TableCell.ActionCell key={record.key}>
                <Button.Expander
                  expanded={expandedRows.indexOf(record.key) >= 0}
                  onClick={event => {
                    event.stopPropagation();
                    handleExpandRow(record.key);
                  }}
                />
              </TableCell.ActionCell>
            );
          }
        },
      },
    ];

    const randomStatus = _record => ({ disabled: _record.disabled, unavailable: _record.unavailable });
    const columns = renderWithIconInHeaders<RowType>(columnsData, showIconsInHeader);
    const headerButton = showHeaderButton && (
      <Button type="ghost" mode="icon-label" onClick={fn()}>
        <Icon component={<AddM />} />
        Add row
      </Button>
    );
    return (
      <ModalProxy visible size="medium" title="VirtualTable with expandable rows" bodyStyle={{ padding: 0 }}>
        <VirtualTable
          {...args}
          columns={columns}
          expandable={{
            expandIconColumnIndex: -1,
            expandedRowKeys: expandedRows,
          }}
          onRow={record => ({
            onClick: () => handleExpandRow(String(record.key)),
          })}
          selection={{
            onChange: handleSelectRow,
            selectedRowKeys: selectedRows,
            checkRowSelectionStatus: randomiseSelectionColumn ? randomStatus : undefined,
            selections: [Table.SELECTION_ALL, undefined, null, Table.SELECTION_INVERT],
            independentSelectionExpandedRows,
          }}
          headerButton={headerButton}
        />
      </ModalProxy>
    );
  },
  argTypes: {
    ...TableMeta.argTypes,
  },
  args: {
    ...TableMeta.args,
    scroll: { y: 600 },
    initialWidth: 792,
    cellHeight: 72,
    dataSource: DATA_SOURCE,
    itemsMenu: (
      <ItemsMenu>
        <Button onClick={fn()} type="secondary" mode="icon-label">
          <Icon component={<FileDownloadM />} />
          Export
        </Button>
        <Button onClick={fn()} type="secondary" mode="icon-label">
          <Icon component={<EditM />} />
          Edit
        </Button>
        <Button onClick={fn()} type="secondary" mode="icon-label">
          <Icon component={<TrashM />} />
          Delete
        </Button>
      </ItemsMenu>
    ),
  },
  component: VirtualTable,
} as Meta<StoryType>;

export const Virtualised: Story = {};
