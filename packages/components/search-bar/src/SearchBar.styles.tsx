import type { ReactNode } from 'react';
import styled from 'styled-components';

import { Input, type StyledInput } from '@synerise/ds-input';
import { Title } from '@synerise/ds-typography';

import {
  CLEAR_ICON_MARGIN_LEFT,
  CLEAR_ICON_SIZE,
  ICON_LEFT_MARGIN_RIGHT,
  ICON_LEFT_SIZE,
  SEARCH_BAR_PADDING_LEFT,
  SEARCH_BAR_PADDING_RIGHT,
  VALUE_PREFIX_WRAPPER_LEFT_VALUE,
  VALUE_PREFIX_WRAPPER_RIGHT_MARGIN,
} from './SearchBar.constants';

const getPaddingAndWidthForSearchBarAntInput = ({
  iconLeft,
  isEmpty,
  valuePrefixWidth,
}: {
  iconLeft: ReactNode;
  isEmpty: boolean;
  valuePrefixWidth: number;
}) => {
  const leftPadding =
    SEARCH_BAR_PADDING_LEFT +
    (iconLeft ? ICON_LEFT_SIZE + ICON_LEFT_MARGIN_RIGHT : 0) +
    valuePrefixWidth +
    (valuePrefixWidth ? VALUE_PREFIX_WRAPPER_RIGHT_MARGIN : 0);
  const rightPadding =
    SEARCH_BAR_PADDING_RIGHT +
    (!isEmpty ? CLEAR_ICON_SIZE + CLEAR_ICON_MARGIN_LEFT : 0);

  return `
    padding: 0 ${rightPadding}px 0 ${leftPadding}px;
    width: calc(100% - ${rightPadding + leftPadding}px);
  `;
};

export const IconLeftWrapper = styled.div`
  position: absolute;
  left: ${SEARCH_BAR_PADDING_LEFT}px;
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 3;
`;

export const ValuePrefixWrapper = styled.div`
  position: absolute;
  left: ${VALUE_PREFIX_WRAPPER_LEFT_VALUE}px;
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 3;
`;

export const ValuePrefixTitle = styled(Title)`
  line-height: 18px;
`;

export const ClearInputWrapper = styled.div`
  right: ${SEARCH_BAR_PADDING_RIGHT}px;
  position: absolute;
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 3;
  cursor: pointer;
`;
export const PlaceholderWrapper = styled.div<{ valuePrefixWidth: number }>`
  pointer-events: none;
  position: absolute;
  display: flex;
  white-space: nowrap;
  align-items: center;
  z-index: 2;
  height: 52px;
  left: ${({ valuePrefixWidth }) =>
    VALUE_PREFIX_WRAPPER_LEFT_VALUE +
    valuePrefixWidth +
    (valuePrefixWidth ? VALUE_PREFIX_WRAPPER_RIGHT_MARGIN : 0)}px;
  color: ${(props) => props.theme.palette['grey-500']};
  line-height: 18px;
`;
export const SearchBar: StyledInput = styled(Input)`
  &&& {
    position: relative;
    height: 52px;
    padding: 0;
    input.ant-input {
      position: absolute;
      top: 0;
      left: 0;
      max-width: 100%;
      height: 52px;
      border: 0;
      background: ${(props): string => props.theme.palette['grey-050']};
      box-sizing: content-box;

      &:focus {
        box-shadow: inset 0px -2px 0px 0px
          ${(props): string => props.theme.palette['blue-600']};
      }
      ::-webkit-input-placeholder {
        line-height: 52px;
        color: transparent;
      }
      :-moz-placeholder {
        line-height: 52px;
        color: transparent;
      }
      ::-moz-placeholder {
        line-height: 52px;
        color: transparent;
      }
      :-ms-input-placeholder {
        line-height: 52px;
        color: transparent;
      }
    }
  }
`;
// placeholder styling rules have to be separated
// https://stackoverflow.com/questions/44971077/why-do-comma-separated-placeholder-rules-not-get-applied-in-css

export const SearchBarWrapper = styled.div<{
  iconLeft: React.ReactNode;
  isEmpty: boolean;
  disabled: boolean;
  borderRadius: boolean | undefined;
  valuePrefixWidth: number;
}>`
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid ${(props): string => props.theme.palette['grey-100']};
  pointer-events: ${(props): string => (props.disabled ? 'none' : '')};
  user-select: ${(props): string => (props.disabled ? 'none' : '')};
  border-radius: ${(props): string => (props.borderRadius ? '3px' : '')};
  min-width: 150px;

  &&& {
    svg {
      transition: all 0.3s ease-out;
      fill: ${(props): string =>
        props.disabled ? props.theme.palette['grey-400'] : ''};
    }

    input.ant-input {
      border-radius: 0;
      line-height: 18px;
      ${getPaddingAndWidthForSearchBarAntInput}
    }

    &:hover {
      ${IconLeftWrapper} {
        svg {
          fill: ${(props): string => props.theme.palette['blue-600']};
        }
      }
      ${ClearInputWrapper} {
        svg {
          fill: ${(props): string => props.theme.palette['red-600']};
        }
      }
      ${ValuePrefixTitle} {
        color: ${(props) => props.theme.palette['blue-600']};
      }
    }
  }

  &.is-focused {
    ${IconLeftWrapper} {
      svg {
        fill: ${(props): string => props.theme.palette['blue-600']};
      }
    }
    ${ClearInputWrapper} {
      svg {
        fill: ${(props): string => props.theme.palette['red-600']};
      }
    }
    ${ValuePrefixTitle} {
      color: ${(props) => props.theme.palette['blue-600']};
    }
  }
`;
