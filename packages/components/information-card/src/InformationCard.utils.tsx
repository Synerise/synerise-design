import React, { type PropsWithChildren } from 'react';

import Alert from '@synerise/ds-alert';
import { type InlineAlertType } from '@synerise/ds-alert/dist/InlineAlert/InlineAlert.types';
import Avatar, { ObjectAvatar } from '@synerise/ds-avatar';
import {
  type Color,
  type ObjectAvatarProps,
} from '@synerise/ds-avatar/dist/Avatar.types';
import Badge from '@synerise/ds-badge';
import Icon from '@synerise/ds-icon';

import * as S from './InformationCard.styles';
import { type BadgeData } from './InformationCard.types';

export function buildInitialsBadge(name: string) {
  return <Initials name={name} />;
}

export function buildExtraInfo(message: string, level?: InlineAlertType) {
  return (
    <S.ExtraInfo>
      <Alert.InlineAlert type={level || 'warning'} message={message} />
    </S.ExtraInfo>
  );
}

export function getInitials(name: string) {
  const hasTokens = name.indexOf(' ') !== -1;
  return (
    name.substring(0, hasTokens ? 1 : 2) +
    (hasTokens ? name.charAt(name.lastIndexOf(' ') + 1) : '')
  );
}

type InitialsProps = PropsWithChildren<{
  name?: string;
}>;

export function Initials({ name, children }: InitialsProps) {
  return (
    <Badge>
      <Avatar size="medium" shape="circle" backgroundColor="blue">
        {(name && getInitials(name)) || children}
      </Avatar>
    </Badge>
  );
}

export function buildIconBadge(data: BadgeData) {
  const avatarExtra = { object: {} as ObjectAvatarProps['object'] };
  if (data.avatarTooltipText) {
    avatarExtra.object = {
      description: data.avatarTooltipText,
    };
  }
  return (
    <ObjectAvatar
      {...avatarExtra}
      color={data.iconColor as Color}
      iconComponent={<Icon component={data.iconElement} />}
    />
  );
}
