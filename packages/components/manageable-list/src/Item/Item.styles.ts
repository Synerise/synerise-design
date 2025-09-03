import styled, { css } from 'styled-components';

import Icon from '@synerise/ds-icon';
import { macro } from '@synerise/ds-typography';

import { ItemActionsWrapper } from './ItemActions/ItemActions.styles';

export const ItemLabel = styled.span`
  ${macro.h300};
  color: ${({ theme }): string => theme.palette['grey-600']};
  height: 24px;
  display: inline-block;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 24px;
  user-select: none;
  flex-shrink: 0;
  max-width: 100%;

  &.full-width {
    max-width: unset;
  }
  .search-highlight {
    font-weight: 500;
    color: ${(props): string => props.theme.palette['grey-800']};
  }
`;
export const ItemTagList = styled.div`
  margin-left: 8px;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  flex-grow: 1;
  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 20px;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }
`;

export const ItemLabelWrapper = styled.div<{ largeSize?: boolean }>`
  flex: 1;
  display: flex;
  flex-grow: 1;
  min-width: 0;

  .ant-tooltip-inner {
    max-width: 164px;
    padding: 16px 16px 19px;
  }

  ${(props) =>
    props.largeSize
      ? css`
          flex-direction: column;
          gap: 10px;
          overflow-y: visible;
          ${ItemTagList} {
            margin-left: 24px;
          }
        `
      : css`
          flex-direction: row;
          align-items: center;
          overflow: hidden;
          height: 24px;
          justify-content: flex-start;
        `}
`;

export const ItemContainer = styled.div<{
  isSelected: boolean;
  isDisabled: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  ${(props) =>
    props.isDisabled &&
    `
    opacity: 0.4;
    cursor: default;
    pointer-events: none;
  `}
  background-color: ${({ theme, isSelected }): string =>
    isSelected ? theme.palette['blue-050'] : theme.palette.white};
  li {
    width: 100%;
    .title {
      color: ${({ theme, isSelected }): string =>
        isSelected ? theme.palette['blue-600'] : theme.palette['grey-600']};
    }
    & > div {
      height: 24px;
      &:nth-child(2) {
        overflow: hidden;
      }
    }
  }

  .ds-manageable-list-item-icon {
    svg {
      color: ${({ theme, isSelected }): string =>
        isSelected ? theme.palette['blue-600'] : theme.palette['grey-600']};
      fill: ${({ theme, isSelected }): string =>
        isSelected ? theme.palette['blue-600'] : theme.palette['grey-600']};
    }
  }

  &:hover {
    ${ItemActionsWrapper} {
      display: flex;
    }

    .ds-manageable-list-item-icon {
      svg {
        color: ${({ theme }): string => theme.palette['blue-600']};
        fill: ${({ theme }): string => theme.palette['blue-600']};
      }
    }
  }
`;

export const DescriptionIcon = styled(Icon)`
  margin-left: 2px;
`;

export const ItemLabelWithIcon = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex-grow: 1;
`;

export const ItemDescription = styled.div`
  overflow-wrap: break-word;
  min-width: 0;
`;
export const ItemUniqueKey = styled.div``;
export const ItemLabelTop = styled.div`
  display: flex;
  line-height: 12px;
  height: 12px;
  align-items: center;
  gap: 8px;
`;
