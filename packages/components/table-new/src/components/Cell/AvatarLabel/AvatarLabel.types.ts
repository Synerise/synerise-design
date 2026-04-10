import { type ReactElement, type ReactNode } from 'react';

import type { WithHTMLAttributes } from '@synerise/ds-utils';

export type BaseAvatarLabelProps = {
  avatar: ReactElement;
  avatarAction?: () => void;
  avatarLink?: string;
  title: ReactNode;
  labels?: ReactNode[];
  icon?: ReactElement;
  /** @deprecated */
  textSize?: 'small' | 'default';
  ellipsis?: boolean;
  maxWidth?: number;
  avatarSize?: string | 'large';
  loader?: ReactElement;
  disabled?: boolean;
};

export type AvatarLabelProps = WithHTMLAttributes<
  HTMLDivElement,
  BaseAvatarLabelProps
>;

/**
 *  @deprecated
 */
export type Props = AvatarLabelProps;
