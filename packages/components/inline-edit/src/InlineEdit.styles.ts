import styled, { css, FlattenInterpolation, FlattenSimpleInterpolation } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core';
import { macro } from '@synerise/ds-typography';

type InPlaceEditableInputContainerProps = {
  size: 'large' | 'small' | 'normal';
  disabled?: boolean;
  error?: boolean;
  pressed?: boolean;
  scrolled?: boolean;
};
const applyColor = (props: ThemeProps & InPlaceEditableInputContainerProps): string => {
  if (props.error) return props.theme.palette['red-600'];
  return props.theme.palette['grey-800'];
};

const applyColorFocus = (props: ThemeProps & InPlaceEditableInputContainerProps): string => {
  if (props.error) return props.theme.palette['red-600'];
  return props.theme.palette['blue-600'];
};

const applyDots = (props: ThemeProps & InPlaceEditableInputContainerProps): string => {
  if (props.error) return props.theme.palette['red-600'];
  return props.theme.palette['grey-400'];
};

const applyDotsOnError = (props: ThemeProps & InPlaceEditableInputContainerProps): string => {
  if (props.error)
    return `background-image: linear-gradient(to right, ${applyDots(props)} 20%, rgba(255, 255, 255, 0) 10%);
  background-color: transparent;
  background-position: bottom left;
  background-size: 5px 1px;
  background-repeat: repeat-x;`;
  return '';
};

const fontSize = {
  large: macro.h600,
  normal: macro.h400,
  small: macro.small,
};

export const FontStyleWatcher = styled.div`
  visibility: hidden;
  pointer-events: none;
`;

export const IconWrapper = styled.div<{ size: string; disabled?: boolean; customIcon?: boolean } & ThemeProps>`
  display: ${(props): string => (props.disabled ? 'none' : 'flex')};
  border-radius: 24px;
  color: ${(props): string => props.theme.palette['grey-600']};
  background: ${(props): string => (props.customIcon ? undefined : props.theme.palette['grey-100'])};
  margin: 0;
  font-size: 11px;
  justify-content: center;
  align-items: center;
  margin-left: ${(props): string => (props.size === 'small' ? '4px' : '8px')};
  width: 24px;
  height: 24px;
  line-height: inherit;
  cursor: pointer;
  &&&:hover {
    background-color: ${(props): string => props.theme.palette.white};
  }
  div :active {
    border-radius: ${(props): string => (props.customIcon ? '0px' : '24px')};
    background-color: ${(props): string => (props.customIcon ? undefined : props.theme.palette['grey-300'])};
  }
`;

export const InPlaceEditableInputContainer = styled.div<InPlaceEditableInputContainerProps>`
  display: flex;
  max-width: 100%;
  align-items: center;
  pointer-events: ${({ disabled }): string => (disabled ? 'none' : 'all')};
  ${IconWrapper} {
    svg {
      color: ${(props): string => applyColor(props)};
      fill: ${(props): string => applyColor(props)};
    }
  }
  input {
    ${(props): string => applyDotsOnError(props)}
  }
  &:hover {
    input {
      color: ${(props): string => props.theme.palette['grey-800']};
      background-image: linear-gradient(
        to right,
        ${(props): string => applyDots(props)} 20%,
        rgba(255, 255, 255, 0) 10%
      );
    }
    ${IconWrapper} {
      background-color: ${({ theme }): string => theme.palette['grey-200']};
    }
  }

  ${(props): FlattenSimpleInterpolation | false =>
    !props.pressed &&
    css`
      &&& {
        &:focus:not(:active),
        &:focus-within {
          input {
            cursor: pointer;
            background-color: transparent;
            background-position: bottom left;
            background-size: 5px 1px;
            background-repeat: repeat-x;
            background-image: linear-gradient(to right, ${applyColorFocus(props)} 20%, rgba(255, 255, 255, 0) 10%);
          }
        }
      }
    `}

  > .autosize-input {
    display: inline-block;
    overflow: hidden;
  }

  > .autosize-input > input,
  > ${FontStyleWatcher} {
    border: none;
    background-color: transparent;
    background-position: bottom left;
    background-size: 5px 1px;
    background-repeat: repeat-x;
    ${(props): FlattenInterpolation<ThemeProps> => fontSize[props.size]}
    overflow: hidden;
    text-overflow: ${(props): string => (props.scrolled ? 'initial' : 'ellipsis')};
    max-width: 100%;
    padding-bottom: ${(props): string => (props.size === 'small' ? '2px' : '0')};
    margin: 0;
    vertical-align: top;
    color: ${(props): string => applyColor(props)};
    ::placeholder {
      color: ${(props): string => props.theme.palette[props.error ? 'red-600' : 'grey-400']};
    }
  }
`;
