import styled from 'styled-components';
import Menu from '@synerise/ds-menu';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { AntdMenuProps } from '@synerise/ds-menu/dist/Menu.types';

export const ActionsWrapper = styled.div`
  && {
    display: flex;
    .ds-icon {
      svg {
        margin: 0;
        fill: ${(props): string => props.theme.palette['grey-500']};
      }
    }
    .ds-icon:hover svg {
      fill: ${(props): string => props.theme.palette['blue-600']};
    }

    .delete .ds-icon svg {
      fill: ${(props): string => props.theme.palette['red-600']};
    }
    .settings .ds-icon {
      margin: 0 3px;
    }
  }
`;
export const DropdownMenu = styled(Menu)<AntdMenuProps>`
  padding: 8px;
`;
export const DropdownMenuItem = styled(Menu.Item)<MenuItemProps>`
  max-height: 32px;
`;
