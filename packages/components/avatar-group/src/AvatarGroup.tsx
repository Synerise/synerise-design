import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import Badge from '@synerise/ds-badge';
import Avatar from '@synerise/ds-avatar';
import { AvatarProps } from '@synerise/ds-avatar/dist/Avatar';
import { BadgeProps } from '@synerise/ds-badge/dist/Badge';
import { ReactNode } from 'react';
import * as S from './AvatarGroup.styles';
import GroupModal from './Modal/GroupModal';

export type Size = 'small' | 'medium' | 'large' | undefined;

export type DataSource = BadgeProps & {
  initials: string;
  avatarProps: AvatarProps;
  firstname: string;
  lastname: string;
  email: string;
  id: React.ReactText;
};

export type GroupModalSettings = {
  title: string | React.ReactNode;
  renderRowMenu: (record: DataSource) => JSX.Element;
  listTitle: string | React.ReactNode;
  handleOk: () => void;
  handleInvite: () => void;
  inviteText: string | ReactNode;
  okText: string | ReactNode;
  cancelText: string | ReactNode;
};

export type AvatarGroupProps = {
  numberOfVisibleUsers: number;
  hasStatus?: boolean;
  size?: Size;
  dataSource: DataSource[];
  moreInfoTooltip: string;
  groupModal?: GroupModalSettings;
};

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  dataSource,
  size = 'medium',
  hasStatus,
  numberOfVisibleUsers = 3,
  moreInfoTooltip,
  groupModal,
}: AvatarGroupProps): React.ReactElement => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  const hideModal = React.useCallback(() => {
    setModalVisible(false);
  }, [setModalVisible]);

  const showModal = React.useCallback(() => {
    if (groupModal) {
      setModalVisible(true);
    }
  }, [setModalVisible, groupModal]);

  const dataSourceWithKeys = React.useMemo(() => {
    return dataSource.map((avatar, index) => ({ ...avatar, key: `${avatar.initials}-${index}` }));
  }, [dataSource]);

  const renderMoreInfo = React.useMemo(() => {
    const diff = dataSource.length - numberOfVisibleUsers;
    return (
      diff > 0 && (
        <Tooltip title={`${diff} ${moreInfoTooltip}`}>
          <S.MoreInfo onClick={showModal} size={size}>
            +{diff}
          </S.MoreInfo>
        </Tooltip>
      )
    );
  }, [dataSource, numberOfVisibleUsers, size, moreInfoTooltip, showModal]);

  const renderGroupModal = React.useMemo(() => {
    if (!groupModal) return null;
    return (
      <GroupModal
        {...groupModal}
        visible={modalVisible}
        hideModal={hideModal}
        dataSource={dataSource}
        showStatus={Boolean(hasStatus)}
      />
    );
  }, [dataSource, groupModal, modalVisible, hideModal, hasStatus]);
  return (
    <S.Group size={size} className="ds-avatar-group">
      {dataSourceWithKeys.slice(0, numberOfVisibleUsers).map(avatar => (
        <Badge key={avatar.key} status={avatar.status}>
          <Avatar size={size} shape="circle" hasStatus={hasStatus} {...avatar.avatarProps}>
            {avatar.initials}
          </Avatar>
        </Badge>
      ))}
      {renderMoreInfo}
      {renderGroupModal}
    </S.Group>
  );
};

export default AvatarGroup;
