import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Input as DSInput } from '@synerise/ds-input';
import { Props as DSInputProps } from '@synerise/ds-input/dist/Input.types';
import { InputProps as AntdInputProps } from 'antd/lib/input';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

export const Prefixel = styled.div`
  border: 1px solid ${(props: ThemeProps): string => props.theme.palette['grey-300']};
  border-radius: 3px 0 0 3px;
  border-right-width: 0;
`;

export const Suffixel = styled.div`
  border: 1px solid ${(props: ThemeProps): string => props.theme.palette['grey-300']};
  border-radius: 0 3px 3px 0;
  border-left-width: 0;
`;

const activeStyle = (props: ThemeProps): FlattenSimpleInterpolation => css`
  box-shadow: inset 0 0 0 1px ${props.theme.palette['blue-600']};
  border-color: ${props.theme.palette['blue-600']};
  background: ${props.theme.palette['blue-050']};
`;

export const Input = styled(DSInput)<DSInputProps & AntdInputProps & { active: boolean }>`
  & {
    .ant-input {
      min-width: 150px;
      ${(props): false | FlattenSimpleInterpolation => !!props.active && activeStyle(props)}
    }
  }
`;

export const PickerInputWrapper = styled.div<{ prefixel: boolean; suffixel: boolean }>`
  display: flex;
  align-items: center;

  ${Prefixel}, ${Suffixel} {
    background: ${(props: ThemeProps): string => props.theme.palette['grey-050']};
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

export const Container = styled.div``;
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
  &&:hover {
    .ds-icon svg {
      fill: ${(props): string => props.theme.palette['grey-600']};
    }
  }
`;
