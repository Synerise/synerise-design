import styled from 'styled-components';
import { Input } from '@synerise/ds-input';

// eslint-disable-next-line import/prefer-default-export
export const DropdownSearchInput = styled(Input)`
  && {
    position: relative;
    height: 52px;
    padding: 0;
    padding-left: 0;

    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 52px;
      border: 0;
      background: ${(props): string => props.theme.palette['grey-050']};
      border-radius: 3px 3px 0 0;

      &:focus {
        box-shadow: inset 0 0 0 2px ${(props): string => props.theme.palette['blue-600']};
      }
    }
  }
`;

export const DropdownSearchInputWrapper = styled.div<{ iconLeft: React.ReactNode }>`
  position: relative;
  border-bottom: 1px solid ${(props): string => props.theme.palette['grey-100']};
  input {
    padding: ${(props): string => (props.iconLeft ? '0 42px 0 52px' : '0 42px 0 16px')};
  }
`;

export const IconLeftWrapper = styled.div`
  position: absolute;
  left: 16px;
  display: flex;
  align-items: center;
  height: 100%;
  z-index: 1;
`;

export const ClearInputWrapper = styled(IconLeftWrapper)`
  right: 14px;
  left: unset;
  cursor: pointer;
`;
