import styled, { css } from 'styled-components';

import Button from '@synerise/ds-button';
import { type ThemeProps } from '@synerise/ds-core';
import { Tag } from '@synerise/ds-tag/dist/Tag.styles';

import { ItemLabel } from '../Item.styles';
import { ItemActionsWrapper } from '../ItemActions/ItemActions.styles';
import { ItemMeta } from '../ItemMeta/ItemMeta.styles';

const dashedStyle = (props: ThemeProps) => css`
  && {
    box-shadow: 0 0 0 0 transparent;
    border: 1px dashed ${props.theme.palette['grey-300']};
  }
  &&:hover {
    border: 1px dashed ${props.theme.palette['grey-400']};
  }
`;

export const AdditionalSuffix = styled.div`
  margin-left: 8px;
`;

export const DraggerWrapper = styled.div<{
  disabled: boolean;
}>`
  cursor: pointer;
  display: flex;
  opacity: ${({ disabled }) => (disabled ? '0.4' : '1')};
`;

export const IconWrapper = styled.div`
  display: flex;
`;

export const MoveItemButtons = styled.div`
  display: none;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-right: 8px;
  .ds-button {
    margin-left: 8px;
    &:first-child {
      margin-left: 0;
    }
  }
`;

export const ItemHeaderPrefix = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  ${Tag} {
    margin: 0;
  }

  ${DraggerWrapper} {
    svg {
      color: ${({ theme }) => theme.palette['grey-400']};
      fill: ${({ theme }) => theme.palette['grey-400']};
    }
  }
`;

export const ItemHeaderSuffix = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  .ds-dropdown-trigger {
    cursor: pointer;
    svg {
      transition: all 0.3s ease;
    }
    &.ant-dropdown-open,
    &:hover {
      svg {
        color: ${(props) => props.theme.palette['blue-600']};
        fill: ${(props) => props.theme.palette['blue-600']};
      }
    }
  }
`;

export const ItemHeader = styled.div<{
  hasPrefix: boolean;
  hasDescription: boolean;
  size?: 'default' | 'large';
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  padding: 12px;
  cursor: pointer;
  max-height: 48px;
  position: relative;

  ${(props) =>
    props.size === 'large' &&
    css`
      ${props.hasDescription && 'align-items: flex-start;'}
      ${DraggerWrapper} {
        position: absolute;
        left: 0;
      }
    `}

  ${ItemHeaderPrefix} {
    gap: ${(props) => (props.size === 'large' ? 16 : 12)}px;
  }
  gap: ${(props) => (props.size === 'large' ? 16 : 12)}px;

  ${(props) => !props.hasPrefix && `padding-left:16px;`}

  ${ItemMeta} {
    padding: 0;
  }

  &:hover {
    .suffix--hide-on-hover {
      display: none;
    }
    ${ItemLabel} {
      color: ${({ theme }) => theme.palette['grey-800']};
    }
    ${ItemActionsWrapper} {
      display: flex;
    }
    ${DraggerWrapper} {
      svg {
        color: ${({ theme }) => theme.palette['grey-600']};
        fill: ${({ theme }) => theme.palette['grey-600']};
      }
    }
    ${MoveItemButtons} {
      display: flex;
    }
  }
`;

export const ContentWrapper = styled.div<{ withoutPadding: boolean }>`
  padding: ${(props) => (props.withoutPadding ? '0px' : '16px 24px 24px')};
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.palette['grey-200']};
  opacity: 1;
`;

const standardShadow = ({
  greyBackground,
  theme,
}: ThemeProps & { greyBackground?: boolean }) => {
  return greyBackground
    ? '0 4px 12px 0 rgba(35, 41, 54, 0.04)'
    : `0 0 0 1px ${theme.palette['grey-200']}`;
};

export const ItemContainer = styled.div<{
  opened: boolean;
  greyBackground: boolean | undefined;
  size?: 'default' | 'large';
  dashed?: boolean;
  isDisabled?: boolean;
  isDragOverlay?: boolean;
  isDragPlaceholder?: boolean;
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 16px;
  border-radius: 3px;
  position: relative;

  ${(props) =>
    props.isDragOverlay
      ? `box-shadow: ${standardShadow(props)}, 0px 16px 32px 0px ${props.theme.palette['grey-200']};
`
      : css`
          box-shadow: ${standardShadow(props)};
        `}
  ${(props) =>
    props.isDragPlaceholder
      ? css`
          background-color: ${props.theme.palette['blue-050']};
          outline: 1px dashed ${props.theme.palette['blue-300']} !important;
          box-shadow: 0;
          box-sizing: border-box;
          border-radius: 3px;
          ${ItemHeader} {
            visibility: hidden;
            opacity: 0;
          }
          ${ContentWrapper} {
            display: none;
          }
        `
      : css`
          background-color: ${props.theme.palette.white};
        `}
  ${(props) =>
    props.isDisabled &&
    `
    opacity: 0.4;
    cursor: default;
    pointer-events: none;
  `}

  ${({ greyBackground, isDragOverlay, theme }) =>
    !greyBackground &&
    !isDragOverlay &&
    `
      &:hover {
        box-shadow: 0 0 0 1px ${theme.palette['grey-300']};
      }
  `}

  && .item-content-animation {
    width: 100%;
  }

  ${(props) => !!props.dashed && dashedStyle(props)}

  ${(props) =>
    props.size === 'large' &&
    css`
      ${ItemHeader} {
        max-height: none;
        padding: 24px;
      }
    `}
`;

export const ToggleContentWrapper = styled.div`
  margin-left: 12px;
  line-height: 0;
`;
export const DropdownTrigger = styled(Button)`
  margin-left: 12px;
`;
export const FilterDropdownTrigger = styled(Button)`
  margin-left: 0px;
`;
export const DropdownWrapper = styled.div``;
