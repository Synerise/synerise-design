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
} from '@synerise/ds-input/dist/InputMultivalue/InputMultivalue.styles';
import styled from 'styled-components';
import { Props as DSInputProps } from '@synerise/ds-input/dist/Input';
import { InputProps } from 'antd/lib/input';
import Value from '@synerise/ds-input/dist/InputMultivalue/Elements/Value';
import Button from '@synerise/ds-button';

export const Container = styled.div`
`
export const CollectorInput = styled(InputWrapper)<InputWrapperProps>`
  width: 100%;
  min-height: 48px;
  padding: 4px 0;
  position: relative;
`;
export const MainContent = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-wrap: wrap;
  padding-right: 4px;
  .ds-input-value-wrapper {
    margin: 4px 0 4px 12px;
    right: 0;
    background: ${(props): string => props.theme.palette['grey-200']};
  }
`;
export const RightSide = styled.div`
  display: flex;
  margin: 4px 8px;
  .ds-button:not(:last-child) {
    margin-right: 8px;
  }
`;
export const Input = styled(BorderLessInput)<DSInputProps & InputProps & { disabled?: boolean }>`
  margin: 0 0 0 12px;
`;
export const CollectorValue = styled(Value)``;
export { ContentAbove };
export { Label };
export { ContentBelow };
export { Description };
export { ErrorText };
export { ValueText };
export const DropdownWrapper = styled.div`
  position: relative;
`;
export const DropdownContent = styled.div<{ visible?: boolean }>`
  background: ${(props): string => props.theme.palette.white};
  border-radius: 3px;
  padding: 8px 0 8px 8px;
  position: absolute;
  width: 100%;
  top: 4px;
  left: 0;
  box-shadow: 0 4px 12px 0 rgba(35, 41, 54, 0.04);
`;

export const DropdownAddButton = styled(Button)`
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;

  && {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-weight: 400;
    text-align: left;
  }
  .ds-icon {
    margin-left: 16px;
    margin-right: 8px;
  }
  strong {
    font-weight: 500;
    margin: 0 0 0 3px;
  }
`;
export const DropdownTop = styled.div`
  padding-right: 8px;
`;
export const DividerContainer = styled.div`
  padding: 8px 12px;
`;
