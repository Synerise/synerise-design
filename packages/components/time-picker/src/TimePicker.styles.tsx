import type { ForwardRefExoticComponent } from 'react';
import styled, {
  css,
  type FlattenSimpleInterpolation,
  type StyledComponent,
} from 'styled-components';

import DSDropdown, { type DropdownProps } from '@synerise/ds-dropdown';
import Icon, { type StyledIcon } from '@synerise/ds-icon';
import { Input, type StyledInput } from '@synerise/ds-input';
import { Label } from '@synerise/ds-typography';

export const Dropdown: StyledComponent<
  ForwardRefExoticComponent<DropdownProps>,
  object,
  object,
  never
> = styled(DSDropdown)`
  margin: 0;
`;
export const Container = styled.div`
  min-width: 104px;
  max-width: 208px;
  width: inherit;
  position: relative;
`;

export const OverlayContainer = styled.div`
  background-color: var(--ds-time-picker-overlay-bg);
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: hidden;
`;

export const Unit = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;

  .scrollbar-container {
    margin-right: -11px;
  }
`;

export const UnitSeperator = styled.div`
  width: 1px;
  height: inherit;
  display: flex;
  flex-shrink: 0;
  background-color: var(--ds-time-picker-overlay-separator-bg);
`;

export const CellText = styled(Label)`
  && {
    width: 22px;
    height: 18px;
    text-align: center;
    color: var(--ds-time-picker-item-text-default);
    transition: color 0.3s;
  }
`;

export const Cell = styled.button<{ active?: boolean }>`
  height: 32px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  cursor: pointer;
  background-color: var(--ds-time-picker-item-bg-default);

  && {
    border: none;
    padding: 0;
  }

  &:hover {
    background-color: var(--ds-time-picker-item-bg-hover);

    ${CellText} {
      color: var(--ds-time-picker-item-text-hover);
    }
  }

  &:disabled {
    && {
      cursor: not-allowed;
      background-color: var(--ds-time-picker-item-bg-default);

      ${(props) =>
        props.active &&
        `
          background-color: var(--ds-time-picker-item-bg-selected);
          opacity: var(--ds-opacity-muted);
          ${CellText}${CellText} {
            opacity: 1;
            color: var(--ds-time-picker-item-text-selected);
          }
      `}
    }

    ${CellText} {
      cursor: not-allowed;
      opacity: var(--ds-opacity-disabled);
    }
  }

  ${(props): FlattenSimpleInterpolation | false | undefined =>
    props.active &&
    css`
      && {
        cursor: initial;
        background-color: var(--ds-time-picker-item-bg-selected);
      }

      ${CellText}${CellText} {
        cursor: initial;
        color: var(--ds-time-picker-item-text-selected);
      }
    `};
`;

export const ClearIcon: StyledIcon = styled(Icon)`
  &&,
  &&:hover {
    color: var(--ds-color-icon-danger-default);
  }
`;

export const TimePickerInput: StyledInput = styled(Input)`
  margin-bottom: 0;
  &:not(.active) {
    input {
      &:focus {
        box-shadow: none;
        background-color: var(--ds-color-background-base-default);
        border-color: var(--ds-color-border-base-strong);
      }
    }
  }
`;

export const PlaceholderWrapper = styled.div`
  width: 100%;
  position: relative;
`;
export const Placeholder = styled.div<{ height: number }>`
  height: ${(props): number => props.height}px;
`;
