import * as React from 'react';

export type Props = {
  avatar: React.ReactElement;
  avatarAction?: () => void;
  title: string | React.ReactNode;
  labels?: (string | React.ReactNode)[];
  icon?: React.ReactElement;
  textSize?: 'small' | 'default';
  ellipsis?: boolean;
  maxWidth?: number;
};
