import styled from 'styled-components';
import Menu from '@synerise/ds-menu';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { AntdMenuProps } from '@synerise/ds-menu/dist/Menu.types';
import Icon, { IconProps } from '@synerise/ds-icon';

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
  }
`;
export const DropdownMenu = styled(Menu)<AntdMenuProps>`
  && {
    padding: 8px;
    width: 230px;
  }
`;
export const DropdownMenuItem = styled(Menu.Item)<MenuItemProps>`
  max-height: 32px;
`;
export const FavouriteIconWrapper = styled.div<{ favourite: boolean }>`
  .ds-icon svg {
    transition: fill 0.2s ease;
    fill: ${(props): string => (props.favourite ? props.theme.palette['yellow-600'] : props.theme.palette['grey-600'])};
  }
`;

export const DropdownTrigger = styled(Icon)<IconProps>`
  svg {
    fill: ${(props): string => props.theme.palette['grey-600']};
  }
  &:hover {
    svg {
      fill: ${(props): string => props.theme.palette['blue-600']};
    }
  }
`;
