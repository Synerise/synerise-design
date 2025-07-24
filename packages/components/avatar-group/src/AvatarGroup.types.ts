import type React from 'react';

import { type AvatarProps } from '@synerise/ds-avatar/dist/Avatar.types';
import type { BadgeProps } from '@synerise/ds-badge/dist/Badge.types';

export type Size = 'small' | 'medium' | 'large';

export type DataSource = Omit<BadgeProps, 'children'> & {
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
  inviteText: string | React.ReactNode;
  okText: string | React.ReactNode;
  cancelText: string | React.ReactNode;
};

export type AvatarGroupProps = {
  numberOfVisibleUsers: number;
  hasStatus?: boolean;
  size?: Size;
  dataSource: DataSource[];
  moreInfoTooltip: string;
  groupModal?: GroupModalSettings;
};
