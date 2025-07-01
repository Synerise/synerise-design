import React from 'react';

import Badge from '@synerise/ds-badge';
import { theme } from '@synerise/ds-core';
import Icon, { UserM, UserS } from '@synerise/ds-icon';

import Avatar from '../Avatar';
import { type UserAvatarProps } from '../Avatar.types';
import { addIconColor, getColorByText, getUserText } from '../utils';

export const DEFAULT_COLOR = 'grey';
export const DEFAULT_COLOR_HUE = '500';

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
  const { firstName = '', lastName = '', email = '', avatar } = user || {};
  const avatarText = getUserText(user, src, text);
  const defaultTooltip = {
    title: `${firstName || ''} ${lastName || ''}`.trim(),
    description: email || '',
  };
  const avatarTooltip =
    (tooltip === undefined || tooltip === true) &&
    (defaultTooltip.title || defaultTooltip.description)
      ? defaultTooltip
      : tooltip;

  const iconColor = theme.palette[`${DEFAULT_COLOR}-${DEFAULT_COLOR_HUE}`];
  const iconElement = addIconColor(iconComponent, iconColor);

  const icon = !avatarText
    ? iconElement || (
        <Icon
          component={size === 'small' ? <UserS /> : <UserM />}
          color={theme.palette['grey-500']}
        />
      )
    : null;

  const [avatarBackgroundColor, avatarBackgroundHue] = getColorByText(
    avatarText,
    backgroundColor,
  );

  const avatarRender = (
    <Avatar
      iconComponent={icon}
      shape="circle"
      hasStatus={disabled === true ? false : !!badgeStatus}
      backgroundColor={avatarBackgroundColor}
      backgroundColorHue={avatarBackgroundHue}
      size={size}
      src={avatar || src}
      tooltip={avatarTooltip}
      disabled={disabled}
      style={badgeStatus ? {} : style}
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
