import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Input as DSInput } from '@synerise/ds-input';
import { Props as DSInputProps } from '@synerise/ds-input/dist/Input';
import { InputProps as AntdInputProps } from 'antd/lib/input';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

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

const activeStyle = (props: ThemeProps): FlattenSimpleInterpolation => css`
  box-shadow: inset 0 0 0 1px ${props.theme.palette['blue-600']};
  border-color: ${props.theme.palette['blue-600']};
  background: ${props.theme.palette['blue-050']};
`;

export const Input = styled(DSInput)<DSInputProps & AntdInputProps & { active: boolean }>`
  & {
    .ant-input {
      ${(props): false | FlattenSimpleInterpolation => !!props.active && activeStyle(props)}
    }
  }
`;
