import styled from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';
import { macro } from '@synerise/ds-typography';

export const TabLabel = styled.span`
  ${macro.h300}
  line-height: 20px;
  white-space: nowrap;
  color: var(--ds-tabs-item-text-default);
`;
export const BlockContentWrapper = styled.div<{ block?: boolean }>`
  ${(props): string =>
    props.block
      ? `display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  `
      : ``}
`;
export const TabContent = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: flex-start;
  height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const applyBlockStyles = (): string => `
  margin-right: 0;
  flex: 1;
  ${TabContent} {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
  &: after {
    background-color: var(--ds-color-border-base-default);
    height:1px;
  }
  &: hover {
    &::after {
      background-color: var(--ds-color-border-base-strong);
      height: 1px;
    }
  }
  &:focus:active:not(:hover) {
  &::after {
      background-color: var(--ds-color-border-brand-default);
      background-image:none;
      height: 1px;
    }
  }
  &.pressed {
    && {
      &::after {
        height: 1px;
      }
    }
  }
`;

export const TabContainer = styled.button<{ block?: boolean }>`
  display: flex;
  height: 34px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-right: 24px;
  cursor: pointer;
  box-sizing: content-box;
  user-select: none;
  position: relative;
  background-color: transparent;
  background-image: none;

  border: 0;
  outline: 0;
  padding: 0;
  pointer-events: ${({ disabled }): string => (disabled ? 'none' : 'all')};
  opacity: ${({ disabled }): string =>
    disabled ? 'var(--ds-opacity-disabled)' : '1'};
  ${IconContainer} {
    margin-right: 4px;
  }

  &::after {
    content: '';
    display: flex;
    position: absolute;
    transition: background-color 0.15s ease-in-out;
    bottom: 0;
    left: 1px;
    width: 100%;
    height: 1px;
    background-color: transparent;
    background-image: none;
  }

  &:hover {
    ${TabLabel} {
      color: var(--ds-tabs-item-text-hover);
    }
    &:focus:active {
      ${TabLabel} {
        color: var(--ds-color-text-brand-hover);
      }
    }
    svg {
      color: var(--ds-tabs-item-text-hover);
    }
    &::after {
      height: 0;
    }
  }

  svg {
    color: var(--ds-color-icon-base-default);
  }

  &:focus {
    /* ⚑ Shift: focus text/icon blue-500 → --ds-color-focus-base-default (blue-600, darker).
       The only exact-value token is a background token; this is the role-correct one. */
    ${TabLabel} {
      color: var(--ds-color-focus-base-default);
    }
    svg {
      color: var(--ds-color-focus-base-default);
    }
    &:active {
      ${TabLabel} {
        color: var(--ds-tabs-item-text-active);
      }
      svg {
        color: var(--ds-tabs-item-text-active);
      }
    }
    &::after {
      height: 1px;
      background-color: transparent;
      background-image: linear-gradient(
        to right,
        var(--ds-color-background-base-default) 66%,
        var(--ds-color-border-brand-default) 34%
      );
      background-position: top;
      background-size: 5px 1px;
      background-repeat: repeat-x;
    }
  }

  ${TabLabel} {
    color: var(--ds-tabs-item-text-default);
  }

  &.active {
    svg {
      color: var(--ds-tabs-item-text-active);
    }

    ${TabLabel} {
      color: var(--ds-tabs-item-text-active);
    }

    && {
      &.underscore::after {
        height: 1px;
        background-color: var(--ds-tabs-item-border-active-color);
        background-image: none;
      }
    }
    &::after {
      background-color: transparent;
      background-image: none;
    }
  }

  &.pressed {
    svg {
      color: var(--ds-color-text-brand-hover);
    }

    ${TabLabel} {
      color: var(--ds-color-text-brand-hover);
    }
    && {
      &::after {
        height: 0;
      }
    }
    &::after {
      background-color: transparent;
      background-image: none;
    }
  }
  ${(props): string | false => !!props.block && applyBlockStyles()}
`;

export const SuffixWrapper = styled.div``;
export const DefaultSuffixWrapper = styled.div`
  font-size: 13px;
  line-height: 10px;
  text-align: center;
  && .ds-badge-count {
    padding: 0 0 0 3px;
  }
`;
