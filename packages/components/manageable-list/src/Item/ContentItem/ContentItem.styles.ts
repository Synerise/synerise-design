import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Tag } from '@synerise/ds-tag/dist/Tag.styles';
import Button from '@synerise/ds-button';
import { ThemeProps } from '@synerise/ds-core';
import { ItemLabel } from '../SimpleItem/SimpleItem.styles';
import { ItemActionsWrapper } from '../ItemActions/ItemActions.styles';
import { ItemMeta } from '../ItemMeta/ItemMeta.styles';

type ItemContainerProps = {
  opened: boolean;
  greyBackground: boolean | undefined;
  dashed?: boolean;
};

type DraggerWrapperProps = {
  disabled: boolean;
};

type ItemHeaderProps = {
  hasPrefix: boolean;
};

const dashedStyle = (props: ThemeProps): FlattenSimpleInterpolation => css`
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

export const DraggerWrapper = styled.div<DraggerWrapperProps>`
  cursor: pointer;
  display: flex;
  opacity: ${({ disabled }): string => (disabled ? '0.4' : '1')};
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
    margin: 0 12px 0 0;
  }

  ${IconWrapper} {
    margin-right: 12px;
  }

  ${DraggerWrapper} {
    margin-right: 12px;
    svg {
      color: ${({ theme }): string => theme.palette['grey-400']};
      fill: ${({ theme }): string => theme.palette['grey-400']};
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
        color: ${(props): string => props.theme.palette['blue-600']};
        fill: ${(props): string => props.theme.palette['blue-600']};
      }
    }
  }
`;

export const ItemHeader = styled.div<ItemHeaderProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  padding: 12px;
  cursor: pointer;
  max-height: 48px;

  ${(props): string | false => !props.hasPrefix && `padding-left:16px;`}

  ${ItemMeta} {
    padding: 0;
  }

  &:hover {
    .suffix--hide-on-hover {
      display: none;
    }
    ${ItemLabel} {
      color: ${({ theme }): string => theme.palette['grey-800']};
    }
    ${ItemActionsWrapper} {
      display: flex;
    }
    ${DraggerWrapper} {
      svg {
        color: ${({ theme }): string => theme.palette['grey-600']};
        fill: ${({ theme }): string => theme.palette['grey-600']};
      }
    }
    ${MoveItemButtons} {
      display: flex;
    }
  }
`;

export const ContentWrapper = styled.div<{ withoutPadding: boolean }>`
  padding: ${(props): string => (props.withoutPadding ? '0px' : '16px 24px 24px')};
  width: 100%;
  border-top: 1px solid ${({ theme }): string => theme.palette['grey-200']};
  opacity: 1;
`;

export const ItemContainer = styled.div<ItemContainerProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 16px;
  border-radius: 3px;
  position: relative;
  background-color: ${({ theme }): string => theme.palette.white};
  box-shadow: ${({ greyBackground, theme }): string =>
    greyBackground ? '0 4px 12px 0 rgba(35, 41, 54, 0.04)' : `0 0 0 1px ${theme.palette['grey-200']}`};

  && .item-content-animation {
    width: 100%;
  }

  ${({ greyBackground, theme }): string | false =>
    !greyBackground &&
    `
      &:hover {
        box-shadow: 0 0 0 1px ${theme.palette['grey-300']};
      }
  `}
  ${(props): FlattenSimpleInterpolation | false => !!props.dashed && dashedStyle(props)}
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
