import styled, { keyframes } from 'styled-components';

export const SearchWrapper = styled.div<{ width?: number }>`
  ${(props): string | false => `width:${props.width}px;`}
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

export const SearchButton = styled.div<{ isOpen: boolean; inputFocused: boolean }>`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  transition: width 0.5s;
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  svg {
    fill: ${(props): string =>
      props.inputFocused ? props.theme.palette['blue-600'] : props.theme.palette['grey-600']} !important;
  }
  .btn-search-open:hover {
    background: transparent !important;
  }
  && {
    button {
      transition: background 0.2s;
      padding: 4px;
      transition: padding-right 0.15s;
      transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    }
  }
`;
export const InputWrapper = styled.div<{ hasValue: boolean }>`
  ${(props): string | false =>
    props.hasValue &&
    `
  input{
        box-shadow: inset 0 0 0 1px ${props.theme.palette['blue-600']};
        border-color: ${props.theme.palette['blue-600']};
        background-color: ${props.theme.palette['blue-050']};
   }
  `}
`;
export const SearchInputWrapper = styled.div<{ offset: number }>`
  overflow: hidden;
  width: 0;
  direction: rtl;
  position: relative;
  transition: width 0.2s;
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  > div {
    direction: ltr;
    margin-bottom: 0;
  }

  input {
    opacity: 0;
  }

  &.is-open {
    width: 100%;
    overflow: visible;
    input {
      padding-left: ${(props): string => (props.offset ? `${Math.round(props.offset + 7)}px` : '12px')};
      opacity: 1;
      width: calc(100% + 5px);
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
  padding: 0 11px 0 10px;
`;

export const List = styled.div<{ isOpen?: boolean }>`
  position: absolute;
  top: 40px;
  background: ${(props): string => props.theme.palette.white};
  direction: ltr;
  width: 100%;
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
export const openDropdownAnimation = keyframes`
  0% {
    opacity:0;
  }
  50% {
    opacity:0;
    width:0;
  }
  100% {
    opacity: 1;
    width:100%;
  }
`;
export const ListWrapper = styled.div`
  & > .search-list-open {
    animation: ${openDropdownAnimation} 0.3s ease-in-out 0s 1;
    opacity: 1; 
    width: calc(100% + 4px);
    margin-right: -4px;
    display: initial;
    padding: 8px;
  }
`;
