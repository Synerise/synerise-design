import React from 'react';

import Badge from '@synerise/ds-badge';
import Icon, { UserM, UserS } from '@synerise/ds-icon';

import Avatar from '../Avatar';
import type { UserAvatarProps } from '../Avatar.types';
import DefaultAvatarIcon, { TOTAL_DEFAULT_AVATARS } from '../DefaultAvatarIcon';
import { getDefaultAvatarIndex, getUserText } from '../utils';

const UserAvatar = ({
  size,
  text,
  tooltip,
  badgeStatus,
  user = {},
  src,
  iconComponent,
  children,
  disabled,
  style,
  ...restProps
}: UserAvatarProps) => {
  const {
    firstName = '',
    lastName = '',
    email = '',
    avatar,
    avatarId,
  } = user || {};

  const hasPhoto = !!(avatar || src);
  const hasNameInitials = !!(firstName || lastName) || !!text;
  const useDefaultSvg =
    avatarId !== undefined &&
    !hasNameInitials &&
    !hasPhoto &&
    TOTAL_DEFAULT_AVATARS > 0;
  const avatarText = useDefaultSvg ? null : getUserText(user, src, text);

  const defaultTooltip = {
    title: `${firstName || ''} ${lastName || ''}`.trim(),
    description: email || '',
  };
  const avatarTooltip =
    (tooltip === undefined || tooltip === true) &&
    (defaultTooltip.title || defaultTooltip.description)
      ? defaultTooltip
      : tooltip;

  // No colour is forced onto the icon: it inherits `--ds-avatar-icon-icon` from the avatar, so a
  // container can recolour it and an object icon keeps its own token colours. Same as ObjectAvatar.
  const iconElement = iconComponent as React.ReactElement;

  // The default illustration is content, not an icon, so it sits on a transparent background.
  const illustration = useDefaultSvg ? (
    <DefaultAvatarIcon
      index={getDefaultAvatarIndex(avatarId, TOTAL_DEFAULT_AVATARS)}
    />
  ) : null;

  let icon: React.ReactNode = null;
  if (!useDefaultSvg && !avatarText) {
    icon = iconElement || (
      <Icon component={size === 'small' ? <UserS /> : <UserM />} />
    );
  }

  const avatarRender = (
    <Avatar
      iconComponent={icon}
      shape="circle"
      hasStatus={disabled === true ? false : !!badgeStatus}
      size={size}
      src={avatar || src}
      tooltip={avatarTooltip}
      disabled={disabled}
      style={badgeStatus ? {} : style}
      {...restProps}
    >
      {children || illustration || avatarText}
    </Avatar>
  );

  return badgeStatus ? (
    <span style={style}>
      <Badge status={badgeStatus}>{avatarRender}</Badge>
    </span>
  ) : (
    avatarRender
  );
};

export default UserAvatar;
