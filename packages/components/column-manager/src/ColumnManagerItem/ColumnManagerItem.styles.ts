import styled from 'styled-components';

import Icon, { IconContainer } from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';

export const DragHandler = styled(Icon)`
  position: absolute;
  top: 16px;
  left: -24px;
  opacity: 0;
  cursor: pointer;
`;

export const Icons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${IconContainer} {
    margin-left: 8px;
  }
`;

export const ItemPart = styled.div<{ align: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 56px;
  justify-content: ${(props): string =>
    props.align === 'left' ? 'flex-start' : 'flex-end'};
  flex: ${(props): string => (props.align === 'left' ? '1' : 'auto')};
  max-width: ${(props): string =>
    props.align === 'left' ? 'calc(100% - 80px)' : '68px'};

  .switch-texts {
    margin: 0;
  }

  .ds-switch {
    margin-left: 8px;
  }
`;

export const ColumnManagerItem = styled.div<{ isDragged?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 56px;
  justify-content: space-between;
  width: 100%;
  padding: 13px 24px;
  position: relative;
  background: ${(props) => props.theme.palette.white};
  border-bottom: 1px solid ${(props): string => props.theme.palette['grey-200']};

  ${(props) =>
    props.isDragged &&
    `
      opacity: 0;
    `}

  &:hover {
    background-color: ${(props): string => props.theme.palette['grey-050']};
    &:before {
      width: 2px;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background-color: ${(props): string => props.theme.palette['blue-600']};
      content: '';
    }
    ${DragHandler} {
      opacity: 1;
    }
    ${Icons} {
      display: none;
    }
    && {
      .ds-button {
        visibility: visible;
        opacity: 1;
      }
    }
  }
  && {
    .ds-button {
      position: absolute;
      right: 36px;
      top: 12px;
      display: flex;
      visibility: hidden;
      opacity: 0;
      transition: all 0s;
    }
  }
`;

export const ColumnManagerItemName = styled.span`
  font-size: 13px;
  line-height: 1.38;
  color: ${(props): string => props.theme.palette['grey-600']};
  margin-left: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1;

  .search-highlight {
    font-weight: 500;
    color: ${(props): string => props.theme.palette['grey-800']};
  }
`;

export const FixedMenu = styled(Menu)`
  padding: 8px;

  .ant-dropdown-menu-item {
    padding: 0 8px !important;
  }
`;
