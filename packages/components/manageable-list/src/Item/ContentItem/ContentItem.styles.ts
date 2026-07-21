import styled, { css } from 'styled-components';

import Button from '@synerise/ds-button';
import { type ThemeProps } from '@synerise/ds-core';
import { Tag } from '@synerise/ds-tag/dist/Tag.styles';

import { ItemLabel } from '../Item.styles';
import { ItemActionsWrapper } from '../ItemActions/ItemActions.styles';
import { ItemMeta } from '../ItemMeta/ItemMeta.styles';

const dashedStyle = () => css`
  && {
    box-shadow: 0 0 0 0 transparent;
    border: 1px dashed var(--ds-color-border-base-strong);
  }
  &&:hover {
    border: 1px dashed var(--ds-color-border-base-stronghover);
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
  opacity: ${({ disabled }) => (disabled ? 'var(--ds-opacity-disabled)' : '1')};
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
      color: var(--ds-color-icon-base-muted);
      fill: var(--ds-color-icon-base-muted);
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
        color: var(--ds-color-icon-brand-default);
        fill: var(--ds-color-icon-brand-default);
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
      color: var(--ds-color-text-base-default);
    }
    ${ItemActionsWrapper} {
      display: flex;
    }
    ${DraggerWrapper} {
      svg {
        color: var(--ds-color-icon-base-default);
        fill: var(--ds-color-icon-base-default);
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
  border-top: 1px solid var(--ds-color-border-base-default);
  opacity: 1;
`;

const standardShadow = ({
  greyBackground,
}: ThemeProps & { greyBackground?: boolean }) => {
  return greyBackground
    ? 'var(--ds-shadows-shadow-1)'
    : `0 0 0 1px var(--ds-color-border-base-default)`;
};

export const ItemContainer = styled.div<{
  opened: boolean;
  selected?: boolean;
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
    props.selected &&
    `
    outline: 2px solid var(--ds-color-border-brand-default) !important;
  `}

  ${(props) =>
    props.isDragOverlay
      ? `box-shadow: ${standardShadow(props)}, var(--ds-shadows-shadow-2);
`
      : css`
          box-shadow: ${standardShadow(props)};
        `}
  ${(props) =>
    props.isDragPlaceholder
      ? css`
          background-color: var(--ds-color-background-brand-subtle);
          outline: 1px dashed var(--ds-color-border-brand-strong) !important;
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
          background-color: var(--ds-color-background-base-default);
        `}
  ${(props) =>
    props.isDisabled &&
    `
    opacity: var(--ds-opacity-disabled);
    cursor: default;
    pointer-events: none;
  `}

  ${({ greyBackground, isDragOverlay }) =>
    !greyBackground &&
    !isDragOverlay &&
    `
      &:hover {
        box-shadow: 0 0 0 1px var(--ds-color-border-base-strong);
      }
  `}

  && .item-content-animation {
    width: 100%;
  }

  ${(props) => !!props.dashed && dashedStyle()}

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
