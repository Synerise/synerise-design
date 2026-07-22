import styled, { keyframes } from 'styled-components';

import {
  ANIMATION_DURATION,
  LABEL_LEFT_OFFSET,
  MAX_FILTER_WIDTH,
} from './const';

export const openDropdownAnimation = keyframes`
  0% {
    opacity:0;
    overflow:hidden;
  }
  50% {
    opacity:0;
    overflow:hidden;
  }
  100% {
    opacity: 1;
 
  }
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  direction: rtl;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 32px;
`;

export const SearchWrapper = styled.div<{
  $width?: number;
  inputOpen?: boolean;
}>`
  ${(props): string | false =>
    !!props.$width &&
    `
   ${props.inputOpen ? `width:${props.$width}px;` : `width:32px`};
  `};
  position: relative;
  direction: rtl;
`;

export const LeftSide = styled.span<{ isOpen: boolean }>`
  position: absolute;
  z-index: 1;
  height: 100%;
  align-items: center;
  display: ${(props): string => (props.isOpen ? 'flex' : 'none')};
  left: 4px;
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;
  color: var(--ds-color-text-brand-default);
  font-weight: 500;
  max-width: ${MAX_FILTER_WIDTH}px;
  direction: ltr;
  position: relative;
  padding-right: 2px;
  span {
    margin-left: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
  }
  &::after {
    content: ':';
  }
  .ds-icon {
    margin-left: 4px;
  }
  svg {
    fill: var(--ds-color-icon-brand-default);
  }
`;

export const Icon = styled.div`
  padding: 0 4px 0 8px;
`;

export const Label = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: var(--ds-color-text-brand-default);
`;

export const SearchButton = styled.div<{
  isOpen: boolean;
  clickable?: boolean;
  inputFocused?: boolean;
}>`
  position: absolute;
  ${(props): string | false =>
    !props.clickable && `pointer-events:none !important;`};
  z-index: 1;
  top: 0;
  right: 0;
  transition: width 0.5s ease-in-out;
  svg {
    fill: ${(props): string =>
      props.inputFocused && props.isOpen
        ? 'var(--ds-color-icon-brand-default)'
        : 'var(--ds-form-icon-color-default)'} !important;
  }

  .btn-search-open:hover {
    background: transparent !important;
  }
  && {
    ${(props): string | false =>
      !!props.isOpen &&
      `
    .btn-focus{
       border-color: transparent;
       box-shadow: none;
    }
    `}
    button {
      padding: 4px;
      transition:
        padding-right 0.15s ease-in-out,
        background 0.2s ease-in-out;
      ${(props): string | false =>
        !props.clickable && `pointer-events:none !important;`}
    }
  }
`;
export const SearchInner = styled.div<{
  hasValue: boolean;
  alwaysHighlight?: boolean;
}>`
  direction: ltr;
  margin-bottom: 0;
  ${(props): string | false | undefined =>
    (props.hasValue || props.alwaysHighlight) &&
    `
  input, input:hover{
        box-shadow: inset 0 0 0 1px var(--ds-form-field-border-focus);
        border-color: var(--ds-form-field-border-focus);
        background-color: var(--ds-form-field-bg-focus);
   }

  `}
  /* Blue focus ring — owned here (the search field has no external input
     stylesheet to inherit it from). !important keeps it winning over the
     resting border set on the native input above. */
  &:focus-within input,
  &:focus-within input:hover {
    box-shadow: inset 0 0 0 1px var(--ds-form-field-border-focus) !important;
    border-color: var(--ds-form-field-border-focus);
    background-color: var(--ds-form-field-bg-focus);
  }
  input::placeholder {
    line-height: 1.29;
  }
`;

/* DS-native search input. Reproduces the base input chrome antd's input LESS
   used to provide (border/radius/background/font/disabled) — the surrounding
   SearchInner / SearchInputContent rules still layer opacity, the open-state
   padding and the blue focus ring on top. Mirrors the DS-native input standard
   (ds-autocomplete's NativeInput). No antd class hook — the styled input owns
   its styling and carries a `ds-search-input` hook for consumers/tests to target. */
export const SearchNativeInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  margin: 0;
  padding: 7px 12px;
  border: 1px solid var(--ds-form-field-border-default);
  border-radius: 3px;
  background-color: var(--ds-form-field-bg-default);
  color: var(--ds-form-field-text-value);
  font-family: inherit;
  font-size: 13px;
  line-height: 1.54;
  font-feature-settings: 'tnum';
  outline: none;
  transition: all 0.3s;

  &::placeholder {
    color: var(--ds-form-field-text-placeholder);
  }

  &:hover:not(:disabled) {
    border-color: var(--ds-form-field-border-hover);
  }

  &:disabled {
    /* ⚑ Shift: disabled bg grey-050 → --ds-form-field-bg-disabled (grey-100, aligns to form standard). */
    background-color: var(--ds-form-field-bg-disabled);
    color: var(--ds-form-field-text-disabled);
    cursor: not-allowed;
  }
`;

export const SearchInputContent = styled.div<{
  offset: number;
  filterLabel: object | null | undefined;
}>`
  overflow: hidden;
  direction: rtl;
  transition: width ${ANIMATION_DURATION}s ease-in-out;
  width: 0;
  input {
    opacity: 0;
    height: 32px;
    transition: padding-left 0s ease-in-out !important;
  }
  &.is-open {
    width: 100%;
    overflow: visible;
    input {
      color: var(--ds-form-field-text-value);
      padding-left: ${(props): string =>
        props.filterLabel && props.offset
          ? `${Math.round(props.offset + LABEL_LEFT_OFFSET)}px`
          : '12px'};
      padding-right: 30px;
      opacity: 1;
    }
  }
`;

export const ClearButton = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px 0 10px;
`;

export const SearchDropdownContent = styled.div<{
  isOpen?: boolean;
  maxHeight: number;
}>`
  position: absolute;
  top: 40px;
  background: var(--ds-dropdown-bg);
  max-height: ${(props): string => `${props.maxHeight}px`};
  direction: ltr;
  opacity: 0;
  display: none;
  border-radius: 3px;
  box-shadow: var(--ds-dropdown-shadow);
  box-sizing: border-box;
  transition:
    opacity 0.5s ease-in-out,
    width 0.5s ease-in-out;
  .ps__rail-y {
    .ps__thumb-y {
      transform: translateX(1px) !important;
    }
  }
`;

export const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  /* Uppercase section header. list-item module has no section-title token → semantic
     grey-500 (exact). DS follow-up: add a list-item section-title token. */
  color: var(--ds-color-text-neutral-default);
  height: 16px;
  margin: 12px;
  line-height: 1.6;
  letter-spacing: 0.1px;
`;

export const HeaderIconWrapper = styled.div`
  /* header (i) InfoFillS info icon → form label/info-icon token (grey-400, exact). */
  & > .ds-icon > svg {
    fill: var(--ds-form-label-icon-color);
  }
`;

export const SearchDropdownWrapper = styled.div<{ dropdownWidth?: number }>`
  width: 0;
  & > .search-list-open {
    width: ${(props) =>
      props.dropdownWidth ? `${props.dropdownWidth}px` : '100%'};
    animation: ${openDropdownAnimation} 0.3s ease-in-out 0s 1;
    opacity: 1;
    display: initial;
    padding: 8px 0 8px 8px;
    z-index: 10;
  }
`;
