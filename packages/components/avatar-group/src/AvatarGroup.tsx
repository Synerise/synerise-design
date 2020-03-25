import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import Badge from '@synerise/ds-badge';
import Avatar from '@synerise/ds-avatar';
import { AvatarProps } from '@synerise/ds-avatar/dist/Avatar';
import { BadgeProps } from '@synerise/ds-badge/dist/Badge';
import * as S from './AvatarGroup.styles';

export type Size = 'small' | 'medium' | 'large' | undefined;
export type Avatar = BadgeProps & { initials: string; avatarProps: AvatarProps };
export type AvatarGroupProps = {
  numberOfVisibleUsers: number;
  hasStatus?: boolean;
  size?: Size;
  avatars: Avatar[];
  moreInfoTooltip: string;
};

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  size = 'medium',
  hasStatus,
  numberOfVisibleUsers = 3,
  moreInfoTooltip,
}: AvatarGroupProps): React.ReactElement => {
  const avatarsWithKeys = React.useMemo(() => {
    return avatars.map((avatar, index) => ({ ...avatar, key: `${avatar.initials}-${index}` }));
  }, [avatars]);

  const moreInfo = React.useMemo(() => {
    const diff = avatars.length - numberOfVisibleUsers;
    return (
      diff > 0 && (
        <Tooltip title={`${diff} ${moreInfoTooltip}`}>
          <S.MoreInfo size={size}>+{diff}</S.MoreInfo>
        </Tooltip>
      )
    );
  }, [avatars, numberOfVisibleUsers, size, moreInfoTooltip]);
  return (
    <S.Group size={size} className="ds-avatar-group">
      {avatarsWithKeys.slice(0, numberOfVisibleUsers).map(avatar => (
        <Badge key={avatar.key} status={avatar.status}>
          <Avatar size={size} shape="circle" hasStatus={hasStatus} {...avatar.avatarProps}>
            {avatar.initials}
          </Avatar>
        </Badge>
      ))}
      {moreInfo}
    </S.Group>
  );
};

export default AvatarGroup;
