import React from 'react';

import Badge from '@synerise/ds-badge';
import Icon, { UserM, UserS } from '@synerise/ds-icon';

import Avatar from '../Avatar';
import type { UserAvatarProps } from '../Avatar.types';
import DefaultAvatarIcon, { TOTAL_DEFAULT_AVATARS } from '../DefaultAvatarIcon';
import {
  addIconColor,
  getColorByText,
  getDefaultAvatarIndex,
  getUserText,
} from '../utils';

const UserAvatar: React.FC<UserAvatarProps> = ({
  backgroundColor,
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
}) => {
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

  const iconColor = 'var(--ds-color-icon-base-subtle)';
  const iconElement = addIconColor(iconComponent, iconColor);

  let icon: React.ReactNode = null;
  if (useDefaultSvg) {
    const avatarIndex = getDefaultAvatarIndex(avatarId, TOTAL_DEFAULT_AVATARS);
    icon = <DefaultAvatarIcon index={avatarIndex} />;
  } else if (!avatarText) {
    icon = iconElement || (
      <Icon
        component={size === 'small' ? <UserS /> : <UserM />}
        color="var(--ds-color-icon-base-subtle)"
      />
    );
  }

  const [avatarBackgroundColor, avatarBackgroundHue] = getColorByText(
    avatarText,
    useDefaultSvg ? undefined : backgroundColor,
  );

  const avatarRender = (
    <Avatar
      iconComponent={icon}
      iconScale={!useDefaultSvg}
      shape="circle"
      hasStatus={disabled === true ? false : !!badgeStatus}
      backgroundColor={useDefaultSvg ? undefined : avatarBackgroundColor}
      backgroundColorHue={useDefaultSvg ? undefined : avatarBackgroundHue}
      size={size}
      src={avatar || src}
      tooltip={avatarTooltip}
      disabled={disabled}
      style={{
        ...(badgeStatus ? {} : style),
        ...(useDefaultSvg
          ? { background: 'transparent', overflow: 'hidden' }
          : {}),
      }}
      {...restProps}
    >
      {children || avatarText}
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
