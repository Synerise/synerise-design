import styled from 'styled-components';
import { IconContainer } from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';

import { ItemLabel } from '../Item.styles';
import { ItemMeta } from '../ItemMeta/ItemMeta.styles';

// eslint-disable-next-line import/prefer-default-export
export const SelectFilterItem = styled.div`
  margin-right: 12px;
  cursor: pointer;

  .selected-item-icon {
    position: relative;
    svg {
      position: relative;
    }
    &::before {
      display: flex;
      content: '';
      border-radius: 50%;
      background-color: ${(props): string => props.theme.palette['green-600']};
      width: 16px;
      height: 16px;
      position: absolute;
      z-index: 0;
      top: 4px;
      left: 4px;
    }
  }
`;

export const MenuItem = styled.div<{ danger?: boolean }>`
  && {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 3px; 
    height: 32px;
    width: 100%;
    font-size: 13px;
    line-height: 1.38;
    font-weight: 500;
    cursor: pointer;
    padding: 0 8px;
    
    background-color: ${(props): string => (props.danger ? props.theme.palette['red-050'] : props.theme.palette.white)};
    color: ${(props): string => (props.danger ? props.theme.palette['red-600'] : props.theme.palette['grey-700'])};
    &:hover {
      background-color: background-color: ${(props): string =>
        props.danger ? props.theme.palette['red-050'] : props.theme.palette.white};;
      color: ${(props): string => (props.danger ? props.theme.palette['red-600'] : props.theme.palette['grey-700'])};
    }
    
    ${IconContainer} {
      margin-right: 12px;
      svg {
        color: ${(props): string => (props.danger ? props.theme.palette['red-600'] : props.theme.palette['grey-600'])};
        fill: ${(props): string => (props.danger ? props.theme.palette['red-600'] : props.theme.palette['grey-600'])};
      }
    }
  }
`;

export const ItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  padding: 12px;
  max-height: 48px;

  &:hover {
    ${ItemLabel} {
      color: ${({ theme }): string => theme.palette['grey-800']};
    }
  }

  ${ItemMeta} {
    margin-right: 12px;
  }
`;

export const DropdownMenu = styled(Menu)`
  padding: 8px;
`;
