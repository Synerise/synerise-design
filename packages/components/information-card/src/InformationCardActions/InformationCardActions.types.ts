import { type ReactNode } from 'react';

import { type AntdMenuProps, type MenuItemProps } from '@synerise/ds-menu';

export type InformationCardActionsProps = {
  items: MenuItemProps[];
  menuProps?: Partial<AntdMenuProps>;
  buttonLabel?: ReactNode;
  navigationLabel?: ReactNode;
  onHeaderClick: () => void;
  maxHeight?: number;
};
