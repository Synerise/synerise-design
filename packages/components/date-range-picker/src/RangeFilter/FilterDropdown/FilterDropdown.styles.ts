import Menu from '@synerise/ds-menu';
import styled from 'styled-components';
import { AntdMenuProps } from '@synerise/ds-menu/dist/Menu.types';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

export const DropdownMenu = styled(Menu)<AntdMenuProps>`
  padding: 8px;
  
`;
export const DropdownMenuItem = styled(Menu.Item)<MenuItemProps>`
  max-height: 32px;
  min-width: 200px;
`;

export const RemoveIconWrapper = styled.div`

`