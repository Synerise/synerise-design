import { type ReactNode } from 'react';

export type BroadcastBarType = 'success' | 'warning' | 'negative';

export type BroadcastBarProps = {
  type: BroadcastBarType;
  button?: ReactNode;
  withClose?: boolean;
  onCloseClick?: () => void;
  customIcon?: ReactNode;
  description?: ReactNode;
};
