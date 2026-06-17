import styled, {
  type FlattenSimpleInterpolation,
  css,
  keyframes,
} from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';

type ToggleProps = {
  $checked?: boolean;
  $error?: boolean;
  $loading?: boolean;
};

const trackBackground = (
  props: ToggleProps & ThemeProps,
  hovered: boolean,
): string => {
  const { theme, $checked, $error } = props;
  if ($error) {
    return theme.palette['red-600'];
  }
  if ($checked) {
    return theme.palette[hovered ? 'green-500' : 'green-600'];
  }
  return theme.palette[hovered ? 'grey-500' : 'grey-400'];
};

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Toggle = styled.button<ToggleProps>`
  position: relative;
  box-sizing: border-box;
  min-width: 28px;
  width: 28px;
  height: 16px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 8px;
  background-color: ${(props): string => trackBackground(props, false)};
  cursor: pointer;
  vertical-align: middle;
  outline: none;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${(props): string => trackBackground(props, true)};
  }

  &:focus-visible {
    border-color: ${(props): string => props.theme.palette['blue-600']};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  ${(props): FlattenSimpleInterpolation | false =>
    !!props.$loading &&
    css`
      cursor: default;
    `}
`;

export const Handle = styled.span<{ $checked?: boolean }>`
  position: absolute;
  top: 0;
  left: ${(props): string => (props.$checked ? 'calc(100% - 12px)' : '0')};
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props): string => props.theme.palette.white};
  transition: left 0.2s ease;
`;

export const Spinner = styled.span`
  position: absolute;
  top: 1px;
  left: 1px;
  width: 10px;
  height: 10px;
  border: 1.5px solid ${(props): string => props.theme.palette['grey-400']};
  border-top-color: ${(props): string => props.theme.palette['green-600']};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
