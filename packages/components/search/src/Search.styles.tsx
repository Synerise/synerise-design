import styled from 'styled-components';

export const SearchWrapper = styled.div`
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
  max-width: 80px;
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

export const SearchButton = styled.div<{ isOpen: boolean }>`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  opacity: ${(props): number => (props.isOpen ? 0 : 1)};
  transition: all 0.2s ease-out;
  pointer-events: ${(props): string => (props.isOpen ? 'none' : 'initial')};

  && {
    button {
      padding: 4px;
    }
  }
`;

export const SearchInputWrapper = styled.div<{ offset: number }>`
  overflow: hidden;
  width: 0;
  transition: all 0.3s ease-out;
  direction: rtl;
  position: relative;

  > div {
    direction: ltr;
    transition: all 0.3s ease-out;
    margin-bottom: 0;
  }

  input {
    opacity: 0;
    transition: all 0.2s ease-out;
  }

  &.is-open {
    width: 100%;

    input {
      padding-left: ${(props): string => (props.offset ? `${Math.round(props.offset + 7)}px` : '12px')};
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
  padding: 0 11px 0 10px;

  svg {
    transition: all 0.3s ease-out;
  }

  &:hover {
    svg {
      fill: ${(props): string => props.theme.palette['red-600']};
    }
  }
`;

export const List = styled.div`
  position: absolute;
  top: 40px;
  background: ${(props): string => props.theme.palette.white};
  width: 100%;
  direction: ltr;
  border-radius: 3px;
  box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.1);
`;
