import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { InputWrapper } from '@synerise/ds-input/dist/InputMultivalue/InputMultivalue.styles';
import { Label as DSLabel } from '@synerise/ds-input';

export const Container = styled.div``;

export const ClearIconWrapper = styled.div`
  .ds-icon > svg {
    fill: ${(props): string => props.theme.palette['red-600']};
  }
  &:hover {
    .ds-icon > svg {
      fill: ${(props): string => props.theme.palette['red-600']};
    }
  }
`;

export const DefaultIconWrapper = styled.div`
  &&:hover {
    .ds-icon > svg {
      fill: ${(props): string => props.theme.palette['grey-600']};
    }
  }
`;
const disabledStyled = (props: ThemeProps): FlattenSimpleInterpolation => css`
  &:hover,
  &,
  && > * {
    cursor: not-allowed;
  }
  opacity: 0.8;
  color: ${props.theme.palette[`grey-600`]};
  background: ${props.theme.palette['grey-050']};
`;
const errorInputStyle = (props: ThemeProps): string => `
  &&, .ant-input {
    border-color: ${props.theme.palette['red-600']};
    box-shadow: inset 0 0 0 2px ${props.theme.palette['red-600']};
    background: ${props.theme.palette['red-050']};
    border-radius: 4px;
  }
`;
const activeStyle = (props: ThemeProps): FlattenSimpleInterpolation => css`
  box-shadow: inset 0 0 0 1px ${props.theme.palette['blue-600']};
  border-color: ${props.theme.palette['blue-600']};
  background: ${props.theme.palette['blue-050']};
`;

export const RangeInputWrapper = styled(InputWrapper)<{
  error?: boolean;
  focus?: boolean;
  disabled?: boolean;
  hover?: boolean;
  active?: boolean;
}>`
  display: flex;
  align-items: center;
  & {
    .ant-input {
      ${(props): false | FlattenSimpleInterpolation => !!props.active && activeStyle(props)}
      ${(props): string => (props.error ? errorInputStyle(props) : '')}
      ${(props): FlattenSimpleInterpolation | false => !!props.disabled && disabledStyled(props)}
    }
    padding: 2px 8px 2px 12px;
  }
`;
export const DateWrapper = styled.div<{ highlight?: boolean }>`
  color: ${(props): string => (props.highlight ? props.theme.palette['blue-600'] : props.theme.palette['grey-500'])};
`;
export const DateValue = styled.div`
  color: ${(props): string => props.theme.palette['grey-600']};
`;
export const IconSeparator = styled.div`
  display: flex;
  flex: 1;
`;
export const SuffixWrapper = styled.div``;
export const Label = styled(DSLabel)`
  margin-bottom: 8px;
  span > .ds-icon > svg {
    margin-top: 0px;
  }
`;
export const ErrorText = styled.div`
  color: ${(props): string => props.theme.palette['red-600']};
  margin-bottom: 4px;
`;
export const Description = styled.div`
  color: ${(props): string => props.theme.palette['grey-600']};
`;

export const ContentBelow = styled.div`
  margin-top: 8px;
`;
