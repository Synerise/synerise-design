import styled, { css } from 'styled-components';

import type { ThemeProps } from '@synerise/ds-core';
import { macro } from '@synerise/ds-typography';

type InPlaceEditableInputContainerProps = {
  size: 'large' | 'small' | 'normal';
  disabled?: boolean;
  error?: boolean;
  pressed?: boolean;
  scrolled?: boolean;
};
const applyColor = (props: InPlaceEditableInputContainerProps) => {
  if (props.error) {
    return 'var(--ds-inline-edit-text-error)';
  }
  return 'var(--ds-inline-edit-text-default)';
};

const applyColorFocus = (
  props: ThemeProps & InPlaceEditableInputContainerProps,
) => {
  if (props.error) {
    return 'var(--ds-color-text-danger-default)';
  }
  return 'var(--ds-color-focus-base-default)';
};

const applyDots = (props: ThemeProps & InPlaceEditableInputContainerProps) => {
  if (props.error) {
    return 'var(--ds-color-text-danger-default)';
  }
  return 'var(--ds-color-icon-base-muted)';
};

const applyDotsOnError = (
  props: ThemeProps & InPlaceEditableInputContainerProps,
) => {
  if (props.error) {
    return `background-image: linear-gradient(to right, ${applyDots(props)} 20%, rgba(255, 255, 255, 0) 10%);
  background-color: transparent;
  background-position: bottom left;
  background-size: 5px 1px;
  background-repeat: repeat-x;`;
  }
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

export const IconWrapper = styled.div<
  { size: string; disabled?: boolean; customIcon?: boolean } & ThemeProps
>`
  display: ${(props) => (props.disabled ? 'none' : 'flex')};
  border-radius: 24px;
  color: var(--ds-inline-edit-icon-btn-icon-default);
  background: ${(props) =>
    props.customIcon ? undefined : 'var(--ds-inline-edit-icon-btn-bg-default)'};
  margin: 0;
  font-size: 11px;
  justify-content: center;
  align-items: center;
  margin-left: ${(props) => (props.size === 'small' ? '4px' : '8px')};
  width: 24px;
  height: 24px;
  line-height: inherit;
  cursor: pointer;
  &&&:hover {
    background-color: var(--ds-color-background-base-default);
  }
  div :active {
    border-radius: ${(props) => (props.customIcon ? '0px' : '24px')};
    background-color: ${(props) =>
      props.customIcon ? undefined : props.theme.palette['grey-300']};
  }
`;

export const InPlaceEditableInputContainer = styled.div<InPlaceEditableInputContainerProps>`
  display: flex;
  max-width: 100%;
  align-items: center;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
  ${IconWrapper} {
    svg {
      color: ${(props) => applyColor(props)};
      fill: ${(props) => applyColor(props)};
    }
  }
  input {
    ${(props) => applyDotsOnError(props)}
  }
  &:hover {
    input {
      color: var(--ds-inline-edit-text-default);
      background-image: linear-gradient(
        to right,
        ${(props) => applyDots(props)} 20%,
        rgba(255, 255, 255, 0) 10%
      );
    }
    ${IconWrapper} {
      background-color: var(--ds-inline-edit-icon-btn-bg-hover);
    }
  }

  ${(props) =>
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
            background-image: linear-gradient(
              to right,
              ${applyColorFocus(props)} 20%,
              rgba(255, 255, 255, 0) 10%
            );
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
    ${(props) => fontSize[props.size]}
    overflow: hidden;
    text-overflow: ${(props) => (props.scrolled ? 'initial' : 'ellipsis')};
    max-width: 100%;
    padding-bottom: ${(props) => (props.size === 'small' ? '2px' : '0')};
    margin: 0;
    vertical-align: top;
    color: ${(props) => applyColor(props)};
    ::placeholder {
      color: ${(props) =>
        props.error
          ? 'var(--ds-inline-edit-text-error)'
          : 'var(--ds-color-text-base-disabled)'};
    }
  }
`;
