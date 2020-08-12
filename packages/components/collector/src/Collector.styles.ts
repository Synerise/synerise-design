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
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { Props as DSInputProps } from '@synerise/ds-input/dist/Input';
import { InputProps } from 'antd/lib/input';
import Value from '@synerise/ds-input/dist/InputMultivalue/Elements/Value';
import Button from '@synerise/ds-button';

export const Container = styled.div``;
const gradientOverlayStyles = (): FlattenSimpleInterpolation => css`
  border-redius: 3px 0 0 3px;
  position: absolute;
  left: 2px;
  top: 2px;
  display: block;
  pointer-events: none;
  z-index: 2;
  width: 100px;
  height: 44px;
`;
export const CollectorInput = styled(InputWrapper)<InputWrapperProps & { gradientOverlap: boolean }>`
  width: 100%;
  min-height: 48px;
  padding: 4px 0;
  position: relative;
  &::before {
    content: ${(props): string => (props.gradientOverlap ? `''` : 'none')};
    transition: opacity 0.3s ease-in-out;
    ${gradientOverlayStyles()}
    background-image: ${(props): string => `-webkit-linear-gradient( left,
    ${props.focus ? props.theme.palette['blue-050'] : props.theme.palette.white} 0%,
    rgba(255,255,255,0) 100%
  )`};
  }
  }
`;
export const MainContent = styled.div<{ wrap: boolean }>`
  display: flex;
  flex: 1;
  align-items: center;
  flex-wrap: ${(props): string => (props.wrap ? 'wrap' : 'nowrap')};
  overflow-x: scroll;
  overflow-y: hidden;

  padding-right: 4px;
  scroll-snap-align: start;
  ::-webkit-scrollbar {
    display: none;
  }
  margin-left: 2px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  .ds-input-value-wrapper {
    min-width: fit-content;
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
  min-width: unset;
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
