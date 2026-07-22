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
    /* ⚑ Shift: value chip bg grey-200 → --ds-color-background-base-muted (grey-100, lighter). */
    background: var(--ds-color-background-base-muted);
  }
  &::before {
    content: '';
    opacity: ${(props) => (props.gradientOverlap ? `1` : '0')};
    position: fixed;
    ${gradientOverlayStyles()}
    background-image: ${(props) => `-webkit-linear-gradient( left,
    ${props.focus ? 'var(--ds-form-field-bg-focus)' : 'var(--ds-form-field-bg-default)'} 0%,
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
    ${props.focus ? 'var(--ds-form-field-bg-focus)' : 'var(--ds-form-field-bg-default)'} 0%,
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
  position: relative;
`;

export const CollectorValue = styled(Value)<{ hasError?: boolean }>`
  ${(props) =>
    props.hasError &&
    css`
      && {
        background: var(--ds-color-background-danger-solid);
        color: var(--ds-color-text-onsolid-danger);
        ${IconWrapper} {
          color: var(--ds-color-icon-onsolid-danger);
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
  background: var(--ds-dropdown-bg);
  border-radius: 3px;
  padding: 8px 0 8px 8px;
  position: absolute;
  width: 100%;
  top: 4px;
  left: 0;
  /* ⚑ Shift: overlay shadow α 0.12 → --ds-dropdown-shadow (= shadow-2, α 0.10, marginally lighter). */
  box-shadow: var(--ds-dropdown-shadow);
  z-index: 99;
`;

export const Placeholder = styled.div`
  position: absolute;
  ppointer-events: none;
  top: 0;
  bottom: 0;
  left: 12px;
  right: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--ds-form-field-text-placeholder);
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
  border-top: 1px solid var(--ds-dropdown-footer-border);
  /* ⚑ Shift: footer bg grey-050 → --ds-dropdown-footer-bg (grey-100, marginally darker). */
  background: var(--ds-dropdown-footer-bg);
  padding: 12px 16px;
  margin-left: -8px;
  margin-bottom: -8px;
  /* Footer hint text + icon are grey-400. dropdown module has no footer-text/-icon token
     (only footer-bg/-border) → exact semantic grey-400; the icon inherits via currentColor
     (svg fill rule dropped). DS follow-up: add dropdown footer-text/footer-icon tokens. */
  color: var(--ds-color-text-base-disabled);
  display: flex;
  align-items: center;
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
