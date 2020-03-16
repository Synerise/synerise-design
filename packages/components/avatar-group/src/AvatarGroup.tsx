import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import Badge from '@synerise/ds-badge';
import Avatar from '@synerise/ds-avatar';
import { AvatarProps } from '@synerise/ds-avatar/dist/Avatar';
import * as S from './AvatarGroup.styles';

export type Status = 'active' | 'inactive' | 'blocked' | undefined;
export type Size = number | 'small' | 'medium' | 'large' | undefined;
export type AvatarGroupProps = {
  numberOfVisibleUsers: number;
  hasStatus?: boolean;
  size?: Size;
  users: AvatarProps & { initials: string; status: Status }[];
  moreInfoTooltip: string;
};

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  users,
  size,
  hasStatus,
  numberOfVisibleUsers,
  moreInfoTooltip,
}: AvatarGroupProps): React.ReactElement => {
  const moreInfo = React.useMemo(() => {
    const diff = users.length - numberOfVisibleUsers;
    return diff <= 0 ? (
      false
    ) : (
      <Tooltip title={`${diff} ${moreInfoTooltip}`}>
        <S.MoreInfo size={size}>+{diff}</S.MoreInfo>
      </Tooltip>
    );
  }, [users, numberOfVisibleUsers, size, moreInfoTooltip]);
  return (
    <S.Group size={size} className="ds-group-avatar">
      {users.slice(0, numberOfVisibleUsers).map(user => (
        <Badge key={user.initials} status={user.status}>
          <Avatar size={size} shape="circle" hasStatus={hasStatus} {...user}>
            {user.initials}
          </Avatar>
        </Badge>
      ))}
      {moreInfo}
    </S.Group>
  );
};

export default AvatarGroup;
