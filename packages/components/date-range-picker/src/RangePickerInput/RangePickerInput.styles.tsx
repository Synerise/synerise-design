import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { InputWrapper } from '@synerise/ds-input/dist/InputMultivalue/InputMultivalue.styles';

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
    }
  }
`;
export const DateWrapper = styled.div<{ highlight?: boolean }>`
  color: ${(props): string => (props.highlight ? props.theme.palette['blue-600'] : props.theme.palette['grey-400'])};
`;
export const DateValue = styled.div`
  color: ${(props): string => props.theme.palette['grey-600']};
`;
export const IconSeparator = styled.div`
  display: flex;
  flex: 1;
`;
export const SuffixWrapper = styled.div``;
