import styled, { css } from 'styled-components';

import Button, { type StyledButton } from '@synerise/ds-button';
import Value from '@synerise/ds-input/dist/InputMultivalue/Elements/Value';
import {
  BorderLessInput,
  ContentAbove,
  ContentBelow,
  Description,
  ErrorText,
  IconWrapper,
  InputWrapper,
  Label,
  ValueText,
} from '@synerise/ds-input/dist/InputMultivalue/InputMultivalue.styles';
import DSScrollbar from '@synerise/ds-scrollbar';

export const Container = styled.div``;
const gradientOverlayStyles = () => css`
  display: block;
  pointer-events: none;
  z-index: 2;
  width: 100px;
  height: 32px;
  transition: opacity 0.3s ease-in-out;
`;
export const CollectorInput = styled(InputWrapper)<{
  error?: boolean;
  focus?: boolean;
  disabled?: boolean;
}>`
  width: 100%;
  min-height: 48px;
  padding: 8px 4px;
  border-radius: 5px;
  flex-wrap: nowrap;
  justify-content: space-between;
`;

export const Scrollbar = styled(DSScrollbar)`
  width: 100%;
`;

export const MainContent = styled.div<{
  fixedHeight?: boolean;
  hasValues?: boolean;
  gradientOverlap?: boolean;
  focus?: boolean;
}>`
  display: flex;
  position: relative;
  padding: ${(props) => (props.hasValues ? '0' : '2px 0')};
  flex: 1;
  align-items: flex-start;
  flex-wrap: ${(props) => (props.fixedHeight ? 'nowrap' : 'wrap')};
  overflow-x: ${(props) => (props.fixedHeight ? 'scroll' : 'hidden')};
  overflow-y: ${(props) => (props.fixedHeight ? 'hidden' : 'scroll')};
  padding-right: ${(props) => (props.fixedHeight ? '4px' : '12px')};
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  .ds-input-value-wrapper {
    min-width: fit-content;
    margin: 4px 0 4px 8px;
    right: 0;
    background: ${(props) => props.theme.palette['grey-200']};
  }
  &::before {
    content: '';
    opacity: ${(props) => (props.gradientOverlap ? `1` : '0')};
    position: fixed;
    ${gradientOverlayStyles()}
    background-image: ${(props) => `-webkit-linear-gradient( left,
    ${props.focus ? props.theme.palette['blue-050'] : props.theme.palette.white} 0%,
    rgba(255,255,255,0) 100%
  )`};
  }
`;
export const RightSide = styled.div<{
  gradientOverlap?: boolean;
  focus?: boolean;
}>`
  display: flex;
  margin: 0 4px;
  gap: 8px;
  position: relative;

  &::before {
    content: ${(props) => (props.gradientOverlap ? `''` : 'none')};
    ${gradientOverlayStyles()}
    background-image: ${(props) => `-webkit-linear-gradient( right,
    ${props.focus ? props.theme.palette['blue-050'] : props.theme.palette.white} 0%,
    rgba(255,255,255,0) 100%
  )`};
    position: absolute;
    left: -102px;
  }
`;
export const Input = styled(BorderLessInput)<{
  disabled?: boolean;
  hasValues?: boolean;
  transparent: boolean;
  hidden: boolean;
}>`
  margin: ${(props) => (props.hasValues ? '6px 0 6px 12px' : '4px 0 4px 12px')};
  padding: 1px 0;
  min-width: unset;
  line-height: 18px;
  width: calc(100% - 12px);

  ${(props) =>
    props.hidden &&
    css`
      display: none;
    `}

  ${(props) =>
    props.transparent &&
    css`
      color: transparent;
    `}
`;

export const SearchWrapper = styled.div`
  flex: 1 0 auto;
`;

export const CollectorValue = styled(Value)<{ hasError?: boolean }>`
  ${(props) =>
    props.hasError &&
    css`
      && {
        background: ${props.theme.palette['red-600']};
        color: ${props.theme.palette.white};
        ${IconWrapper} {
          color: ${props.theme.palette.white};
        }
      }
    `}
`;
export { ContentAbove };
export { Label };
export { ContentBelow };
export { Description };
export { ErrorText };
export { ValueText };
export const DropdownWrapper = styled.div`
  position: relative;
  user-select: none;
`;
export const CustomContentWrapper = styled.div`
  position: absolute;
  z-index: 99;
`;
export const DropdownContent = styled.div<{ visible?: boolean }>`
  background: ${(props) => props.theme.palette.white};
  border-radius: 3px;
  padding: 8px 0 8px 8px;
  position: absolute;
  width: 100%;
  top: 4px;
  left: 0;
  box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.12);
  z-index: 99;
`;

export const DropdownAddButton: StyledButton = styled(Button)`
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
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const DropdownTop = styled.div`
  padding-right: 8px;
`;
export const DividerContainer = styled.div`
  padding: 8px 12px;
`;
export const NavigationWrapper = styled.div`
  margin-top: 8px;
  border-top: 1px solid ${(props) => props.theme.palette['grey-100']};
  background: ${(props) => props.theme.palette['grey-050']};
  padding: 12px 16px;
  margin-left: -8px;
  margin-bottom: -8px;
  color: ${(props) => props.theme.palette['grey-400']};
  display: flex;
  align-items: center;
  .ds-icon > svg {
    fill: ${(props) => props.theme.palette['grey-400']};
  }
  span {
    margin-left: 2px;
    margin-right: 8px;
    font-weight: 500;
  }
`;
export const Counter = styled.div`
  display: flex;
  height: 26px;
  align-items: center;
  column-gap: 4px;
`;
