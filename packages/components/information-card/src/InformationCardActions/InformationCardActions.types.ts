import { type ReactNode } from 'react';

import { type ListItemProps } from '@synerise/ds-list-item';

export type InformationCardActionsProps = {
  items: ListItemProps[];
  buttonLabel?: ReactNode;
  navigationLabel?: ReactNode;
  onHeaderClick: () => void;
  maxHeight?: number;
};
