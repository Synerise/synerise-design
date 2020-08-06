import {
  InputWrapper,
  BorderLessInput,
  InputWrapperProps,
  ContentAbove,
  Label,
  ContentBelow,
  Description,
  ErrorText,
  ValueText,
  ValueWrapper,
} from '@synerise/ds-input/dist/InputMultivalue/InputMultivalue.styles';
import styled from 'styled-components';
import { Props as DSInputProps } from '@synerise/ds-input/dist/Input';
import { InputProps } from 'antd/lib/input';
import Value from '@synerise/ds-input/dist/InputMultivalue/Elements/Value';

export const Wrapper = styled(InputWrapper)<InputWrapperProps>`
  width: 100%;
  height: 48px;
  padding: 8px;
`;
export const MainContent = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  .ds-input-value-wrapper {
    margin: 0;
    &:not(:first-child) {
      margin-left: 8px;
    }
    &:last-of-type {
      margin-right: 8px;
    }
    right: 0;
    background: ${(props): string => props.theme.palette['grey-200']};
  }
`;
export const Input = styled(BorderLessInput)<DSInputProps & InputProps & { disabled?: boolean }>`
  margin: 0;
`;
export const CollectorValue = styled(Value)``;
export { ContentAbove };
export { Label };
export { ContentBelow };
export { Description };
export { ErrorText };
export { ValueText };
