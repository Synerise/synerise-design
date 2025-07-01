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

export const SearchInputWrapper = styled.div<{ width?: number }>`
  position: relative;
  direction: rtl;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 32px;
`;

export const SearchWrapper = styled.div<{
  width?: number;
  inputOpen?: boolean;
}>`
  ${(props): string | false =>
    !!props.width &&
    `
   ${props.inputOpen ? `width:${props.width}px;` : `width:32px`};
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
  color: ${(props): string => props.theme.palette['blue-600']};
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
    fill: ${(props): string => props.theme.palette['blue-600']};
  }
`;

export const Icon = styled.div`
  padding: 0 4px 0 8px;
`;

export const Label = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${(props): string => props.theme.palette['blue-600']};
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
        ? props.theme.palette['blue-600']
        : props.theme.palette['grey-600']} !important;
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
        box-shadow: inset 0 0 0 1px ${props.theme.palette['blue-600']};
        border-color: ${props.theme.palette['blue-600']};
        background-color: ${props.theme.palette['blue-050']};
   }
   
  `}
  input::placeholder {
    line-height: 1.29;
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
  }
  input.ant-input {
    transition: padding-left 0s ease-in-out !important;
  }
  &.is-open {
    width: 100%;
    overflow: visible;
    input {
      color: ${(props): string => props.theme.palette['grey-700']};
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
  background: ${(props): string => props.theme.palette.white};
  max-height: ${(props): string => `${props.maxHeight}px`};
  direction: ltr;
  opacity: 0;
  display: none;
  border-radius: 3px;
  box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.1);
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
  color: ${(props): string => props.theme.palette['grey-500']};
  height: 16px;
  margin: 12px;
  line-height: 1.6;
  letter-spacing: 0.1px;
`;

export const HeaderIconWrapper = styled.div`
  & > .ds-icon > svg {
    fill: ${(props): string => props.theme.palette['grey-400']};
  }
`;

export const SearchDropdownWrapper = styled.div`
  width: 0;
  & > .search-list-open {
    width: 100%;
    animation: ${openDropdownAnimation} 0.3s ease-in-out 0s 1;
    opacity: 1;
    display: initial;
    padding: 8px 0 8px 8px;
    z-index: 10;
  }
`;
