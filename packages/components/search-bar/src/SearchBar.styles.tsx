import styled from 'styled-components';
import { Input } from '@synerise/ds-input';

export const IconLeftWrapper = styled.div`
  position: absolute;
  left: 16px;
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 3;
`;

export const ClearInputWrapper = styled.div`
  right: 14px;
  position: absolute;
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 3;
  cursor: pointer;
`;
export const PlaceholderWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 2;
  height: 52px;
  left: 52px;
  color: ${props => props.theme.palette['grey-500']};
`;
export const SearchBar = styled(Input)`
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
        box-shadow: inset 0px -2px 0px 0px ${(props): string => props.theme.palette['blue-600']};
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
}>`
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid ${(props): string => props.theme.palette['grey-100']};
  pointer-events: ${(props): string => (props.disabled ? 'none' : '')};
  user-select: ${(props): string => (props.disabled ? 'none' : '')};
  border-radius: ${(props): string => (props.borderRadius ? '3px' : '')};

  &&& {
    svg {
      transition: all 0.3s ease-out;
      fill: ${(props): string => (props.disabled ? props.theme.palette['grey-400'] : '')};
    }

    input.ant-input {
      border-radius: 0;
      line-height: 18px;
      padding: ${(props): string => {
        if (props.iconLeft && !props.isEmpty) return '0 42px 0 52px';
        if (props.iconLeft && props.isEmpty) return '0 12px 0 52px';
        if (!props.iconLeft && !props.isEmpty) return '0 42px 0 12px';
        return '0 12px 0 12px';
      }};
      width: ${(props): string => {
        if (props.iconLeft && !props.isEmpty) return 'calc(100% - 92px)';
        if (props.iconLeft && props.isEmpty) return 'calc(100% - 62px)';
        if (!props.iconLeft && !props.isEmpty) return 'calc(100% - 52px)';
        return 'calc(100% - 24px)';
      }};
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
  }
`;
