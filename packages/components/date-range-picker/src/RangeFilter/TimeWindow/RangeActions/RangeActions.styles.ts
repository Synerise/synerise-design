import { AntdMenuProps } from '@synerise/ds-menu/dist/Menu.types';
import Menu from '@synerise/ds-menu';
import styled from 'styled-components';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

export const ActionsMenu = styled(Menu)<AntdMenuProps>`
  padding: 8px;
`;

export const ActionItem = styled(Menu.Item)<MenuItemProps>`
  max-height: 32px;
`;
