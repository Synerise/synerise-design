import styled, { css } from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';
import { Input as DSInput, type InputProps } from '@synerise/ds-input';

export const Prefixel = styled.div`
  border: 1px solid
    ${(props: ThemeProps): string => props.theme.palette['grey-300']};
  border-radius: 3px 0 0 3px;
  border-right-width: 0;
`;

export const Suffixel = styled.div`
  border: 1px solid
    ${(props: ThemeProps): string => props.theme.palette['grey-300']};
  border-radius: 0 3px 3px 0;
  border-left-width: 0;
`;

const activeStyle = (props: ThemeProps) => css`
  box-shadow: inset 0 0 0 1px ${props.theme.palette['blue-600']};
  border-color: ${props.theme.palette['blue-600']};
  background: ${props.theme.palette['blue-050']};
`;

export const Input = styled(DSInput)<InputProps & { active: boolean }>`
  & {
    .ant-input {
      ${(props) => !props.autoResize && 'min-width: 150px'};
      ${(props) => !!props.active && activeStyle(props)}
    }
  }
`;

export const PickerInputWrapper = styled.div<{
  prefixel: boolean;
  suffixel: boolean;
}>`
  display: flex;
  align-items: center;

  ${Prefixel}, ${Suffixel} {
    background: ${(props: ThemeProps): string =>
      props.theme.palette['grey-050']};
    display: flex;
    align-items: center;
    align-self: stretch;
    padding: 0 12px;
  }

  ${(props): false | string =>
    props.prefixel &&
    `
    ${Input} input {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  `}

  ${(props): false | string =>
    props.suffixel &&
    `
    ${Input} input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  `}
`;

export const Container = styled.div`
  width: 100%;
`;
export const ClearIconWrapper = styled.div`
  .ds-icon svg {
    fill: ${(props): string => props.theme.palette['red-600']};
  }
  &&:hover {
    .ds-icon svg {
      fill: ${(props): string => props.theme.palette['red-600']};
    }
  }
`;

export const DefaultIconWrapper = styled.div`
  .ds-icon svg {
    fill: ${(props): string => props.theme.palette['grey-400']};
  }
  &&:hover {
    .ds-icon svg {
      fill: ${(props): string => props.theme.palette['grey-600']};
    }
  }
`;
