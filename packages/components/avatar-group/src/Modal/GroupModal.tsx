import React from 'react';

import Avatar from '@synerise/ds-avatar';
import Badge from '@synerise/ds-badge';
import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { OptionHorizontalM } from '@synerise/ds-icon';
import ModalProxy from '@synerise/ds-modal';
import {
  ActionCell,
  AvatarLabelCell,
  type ColumnDef,
  VirtualTable,
} from '@synerise/ds-table-new';

import { type DataSource } from '../AvatarGroup.types';
import * as S from './GroupModal.styles';
import { type GroupModalProps } from './GroupModal.types';

const TABLE_MAX_HEIGHT = 430;
const CELL_HEIGHT = 64;
/**
 * 32px single-icon button plus the cell's 24px horizontal padding on each side.
 * Rows are `table-layout: fixed` with `overflow: hidden` on the cell, so the
 * legacy declared width of 72 (which grew to fit under antd's auto layout)
 * would clip the button.
 */
const ACTIONS_COLUMN_WIDTH = 80;

const GroupModal = ({
  renderRowMenu,
  title,
  listTitle,
  dataSource,
  visible,
  hideModal,
  showStatus,
  handleInvite,
  handleOk,
  okText,
  cancelText,
  inviteText,
}: GroupModalProps) => {
  const columns = React.useMemo<ColumnDef<DataSource, unknown>[]>(
    () => [
      {
        id: 'avatarProps',
        header: '',
        cell: ({ row }): React.ReactNode => (
          <AvatarLabelCell
            avatar={
              <Badge status={row.original.status}>
                <Avatar
                  {...row.original.avatarProps}
                  hasStatus={showStatus}
                  size="medium"
                  shape="circle"
                >
                  {row.original.initials}
                </Avatar>
              </Badge>
            }
            title={`${row.original.firstname} ${row.original.lastname}`}
            labels={[row.original.email]}
          />
        ),
      },
      {
        id: 'actions',
        header: '',
        size: ACTIONS_COLUMN_WIDTH,
        cell: ({ row }): React.ReactNode => (
          <ActionCell contentAlign="right">
            <Dropdown
              asChild
              overlay={renderRowMenu(row.original)}
              trigger={['click']}
              placement="bottomRight"
              popoverProps={{
                testId: 'avatar-group-actions',
              }}
            >
              <Button type="ghost" mode="single-icon">
                <Icon component={<OptionHorizontalM />} />
              </Button>
            </Dropdown>
          </ActionCell>
        ),
      },
    ],
    [renderRowMenu, showStatus],
  );

  return (
    <ModalProxy
      bodyFullWidth
      size="small"
      title={title}
      closable
      open={visible}
      onCancel={hideModal}
      footer={
        <S.ModalFooter>
          <S.FooterSettings>
            <Button type="secondary" onClick={handleInvite}>
              {inviteText}
            </Button>
          </S.FooterSettings>

          <S.FooterActions>
            <Button type="ghost" onClick={hideModal}>
              {cancelText}
            </Button>

            <Button type="primary" onClick={handleOk}>
              {okText}
            </Button>
          </S.FooterActions>
        </S.ModalFooter>
      }
    >
      <VirtualTable<DataSource, unknown>
        hideColumnNames
        title={listTitle}
        columns={columns}
        maxHeight={TABLE_MAX_HEIGHT}
        cellHeight={CELL_HEIGHT}
        data={dataSource}
        rowKey="id"
      />
    </ModalProxy>
  );
};

export default GroupModal;
