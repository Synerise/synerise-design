import { type ForwardRefExoticComponent } from 'react';
import styled, {
  type FlattenSimpleInterpolation,
  type StyledComponent,
  css,
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
  background-color: ${(props): string => props.theme.palette.white};
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
  background-color: ${(props): string => props.theme.palette['grey-200']};
`;

export const CellText = styled(Label)`
  && {
    width: 22px;
    height: 18px;
    text-align: center;
    color: ${(props): string => props.theme.palette['grey-600']};
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
  background-color: ${(props): string => props.theme.palette.white};

  && {
    border: none;
    padding: 0;
  }

  &:hover {
    background-color: ${(props): string => props.theme.palette['grey-050']};

    ${CellText} {
      color: ${(props): string => props.theme.palette['blue-600']};
    }
  }

  &:disabled {
    && {
      cursor: not-allowed;
      background-color: ${(props): string => props.theme.palette.white};

      ${(props) =>
        props.active &&
        `
          background-color: ${props.theme.palette['blue-600']};
          opacity: 0.2;
          ${CellText}${CellText} {
            opacity: 1;
            color: ${props.theme.palette.white};
          }
      `}
    }

    ${CellText} {
      cursor: not-allowed;
      opacity: 0.4;
    }
  }

  ${(props): FlattenSimpleInterpolation | false | undefined =>
    props.active &&
    css`
      && {
        cursor: initial;
        background-color: ${props.theme.palette['blue-600']};
      }

      ${CellText}${CellText} {
        cursor: initial;
        color: ${props.theme.palette.white};
      }
    `};
`;

export const ClearIcon: StyledIcon = styled(Icon)`
  &&,
  &&:hover {
    svg {
      color: ${(props): string => props.theme.palette['red-600']};
      fill: ${(props): string => props.theme.palette['red-600']};
    }
  }
`;

export const TimePickerInput: StyledInput = styled(Input)`
  margin-bottom: 0;
  &:not(.active) {
    input {
      &:focus {
        box-shadow: none;
        background-color: ${(props): string => props.theme.palette.white};
        border-color: ${(props): string => props.theme.palette['grey-300']};
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
