import { ReactNode } from 'react';
import { MenuItemProps, AntdMenuProps } from '@synerise/ds-menu';

export type InformationCardActionsProps = {
  items: MenuItemProps[];
  menuProps?: Partial<AntdMenuProps>;
  buttonLabel?: ReactNode;
  navigationLabel?: ReactNode;
  onHeaderClick: () => void;
  maxHeight?: number;
};
