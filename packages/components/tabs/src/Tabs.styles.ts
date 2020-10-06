import styled from 'styled-components';
import Button from '@synerise/ds-button';
import { Props as ButtonProps } from '@synerise/ds-button/dist/Button.types';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import Menu from '@synerise/ds-menu';
import { AntdMenuProps } from '@synerise/ds-menu/dist/Menu.types';

export const TabsContainer = styled.div<{ block?: boolean }>`
  padding-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: ${(props): string | false => (props.block ? `center` : `flex-end`)};
  justify-content: flex-start;
  max-width: 100%;
  overflow-x: hidden;
  margin-bottom: -1px;
`;

export const TabsDropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${({ theme }): string => theme.palette.white};
  opacity: 1;
  padding: 8px;
`;

export const TabsDropdownDivider = styled.div`
  margin: 7.5px 0;
  height: 1px;
  width: 100%;
  box-sizing: content-box;
  background-image: linear-gradient(
    to right,
    ${({ theme }): string => theme.palette.white} 66%,
    ${({ theme }): string => theme.palette['grey-300']} 34%
  );
  background-position: top;
  background-size: 5px 1px;
  background-repeat: repeat-x;
`;

export const ShowHiddenTabsTrigger = styled(Button)<ButtonProps>`
  margin-bottom: 4px;
`;

export const HiddenTabs = styled.div`
  position: absolute;
  width: 0;
  visibility: hidden;
`;
export const DropdownMenu = styled(Menu)<AntdMenuProps>`
`;
export const DropdownMenuItem = styled(Menu.Item)<MenuItemProps>`
  &&& {
    border: none;
  }
`;
