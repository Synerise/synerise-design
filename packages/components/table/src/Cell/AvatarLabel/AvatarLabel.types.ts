import { ReactElement, ReactNode } from 'react';

export type AvatarLabelProps = {
  avatar: ReactElement;
  avatarAction?: () => void;
  avatarLink?: string;
  title: ReactNode;
  labels?: ReactNode[];
  icon?: ReactElement;
  // @deprecated
  textSize?: 'small' | 'default';
  ellipsis?: boolean;
  maxWidth?: number;
  avatarSize?: string | 'large';
  loader?: ReactElement;
};
// @deprecated - use AvatarLabelProps instead
export type Props = AvatarLabelProps;
