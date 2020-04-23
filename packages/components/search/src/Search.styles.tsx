import styled, { keyframes } from 'styled-components';

const LABEL_LEFT_OFFSET = 7;
const INPUT_EXPAND_ANIMATION_DURATION = 0.2;
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
  ${(props): string | false => `width:${props.width}px;`}
  position: relative;
  direction: rtl;
  overflow-x: hidden;
`;
export const SearchWrapper = styled.div<{ width?: number; inputOpen?: boolean }>`

  ${(props): string | false =>
    !!props.width &&
    `
   ${props.inputOpen ? `width:${props.width}px;` : `width:32px`};
  `}
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
  max-width: 120px;
  direction: ltr;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 4px;
    user-select: none;

    &::after {
      content: ':';
    }
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

export const SearchButton = styled.div<{ isOpen: boolean; inputFocused: boolean; clickable?: boolean }>`
  position: absolute;
  ${(props): string | false => !props.clickable && `pointer-events:none !important;`}
  z-index: 1;
  top: 0;
  right: 0;
  transition: width 0.5s;
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
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
      transition: background 0.2s;
      padding: 4px;
      transition: padding-right 0.15s;
      transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
      ${(props): string | false => !props.clickable && `pointer-events:none !important;`}
    }
  }
`;
export const SearchInner = styled.div<{ hasValue: boolean; alwaysHighlight: boolean }>`
  direction: ltr;
  margin-bottom: 0;
  ${(props): string | false =>
    (props.hasValue || props.alwaysHighlight) &&
    `
  input, input:hover{
        box-shadow: inset 0 0 0 1px ${props.theme.palette['blue-600']};
        border-color: ${props.theme.palette['blue-600']};
        background-color: ${props.theme.palette['blue-050']};
   }
   
  `}
`;
export const SearchInputContent = styled.div<{ offset: number }>`
  overflow: hidden;
  direction: rtl;
  transition: width ${INPUT_EXPAND_ANIMATION_DURATION}s;
  width: 0px;
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);

  input {
    opacity: 0;
  }
  input.ant-input {
    transition: padding-left 0.1s ease !important;
  }
  &.is-open {
    width: 100%;
    overflow: visible;
    input {
      padding-left: ${(props): string => (props.offset ? `${Math.round(props.offset + LABEL_LEFT_OFFSET)}px` : '12px')};
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

export const List = styled.div<{ isOpen?: boolean }>`
  position: absolute;
  top: 40px;
  background: ${(props): string => props.theme.palette.white};
  direction: ltr;
  opacity: 0;
  display: none;
  border-radius: 3px;
  box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.1);
  box-sizing: border-box;
  transition: width 0.5s;
  transition: opacity 0.5s;
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
`;
export const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
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

export const ListWrapper = styled.div`
  width: 0%;
  & > .search-list-open {
    width: 100%;
    animation: ${openDropdownAnimation} 0.3s ease-in-out 0s 1;
    opacity: 1;
    display: initial;
    padding: 8px;
    z-index: 10;
  }
`;
