import React from 'react';
import ModalProxy from '@synerise/ds-modal';
import { VirtualTable, TableCell } from '@synerise/ds-table';
import Avatar from '@synerise/ds-avatar';
import Dropdown from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';
import Icon, { OptionHorizontalM } from '@synerise/ds-icon';
import Badge from '@synerise/ds-badge';
import { AvatarProps } from '@synerise/ds-avatar/dist/Avatar.types';

import { DataSource } from '../AvatarGroup.types';
import * as S from './GroupModal.styles';
import { GroupModalProps } from './GroupModal.types';

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
  const getColums = React.useMemo(() => {
    return [
      {
        key: 'avatarProps',
        dataIndex: 'avatarProps',
        render: (avatar: AvatarProps, record: DataSource): React.ReactNode => {
          return (
            <TableCell.AvatarLabelCell
              avatar={
                <Badge key={record.id} status={record.status}>
                  <Avatar {...avatar} hasStatus={showStatus} size="medium" shape="circle">
                    {record.initials}
                  </Avatar>
                </Badge>
              }
              textSize="small"
              title={`${record.firstname} ${record.lastname}`}
              labels={[record.email]}
            />
          );
        },
      },
      {
        key: 'actions',
        dataIndex: 'id',
        width: 72,
        render: (id: React.ReactText, record: DataSource): React.ReactNode => (
          <TableCell.ActionCell contentAlign="right">
            <Dropdown overlay={renderRowMenu(record)} trigger={['click']} placement="bottomRight">
              <Button type="ghost" mode="single-icon">
                <Icon component={<OptionHorizontalM />} />
              </Button>
            </Dropdown>
          </TableCell.ActionCell>
        ),
      },
    ];
  }, [renderRowMenu, showStatus]);
  return (
    <ModalProxy
      bodyStyle={{ padding: 0 }}
      size="small"
      title={title}
      closable
      visible={visible}
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
      <VirtualTable
        hideColumnNames
        title={listTitle}
        columns={getColums}
        scroll={{ y: 430 }}
        cellHeight={64}
        initialWidth={520}
        dataSource={dataSource}
        rowKey="id"
      />
    </ModalProxy>
  );
};

export default GroupModal;
