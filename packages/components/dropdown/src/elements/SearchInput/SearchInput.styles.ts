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
      max-width: 100%;
      height: 52px;
      border: 0;
      background: ${(props): string => props.theme.palette['grey-050']};
      border-radius: 3px 3px 0 0;
      box-sizing: content-box;

      &:focus {
        border-bottom: 2px solid ${(props): string => props.theme.palette['blue-600']};
        box-shadow: none;
      }
    }
  }
`;

export const DropdownSearchInputWrapper = styled.div<{ iconLeft: React.ReactNode; isEmpty: boolean }>`
  position: relative;
  border-bottom: 1px solid ${(props): string => props.theme.palette['grey-100']};

  && {
    input {
      padding: ${(props): string => {
        if (props.iconLeft && !props.isEmpty) return '0 42px 0 52px';
        if (props.iconLeft && props.isEmpty) return '0 12px 0 52px';
        if (!props.iconLeft && !props.isEmpty) return '0 42px 0 12px';
        return '0 12px 0 12px';
      }};
      width: ${(props): string => {
        if (props.iconLeft && !props.isEmpty) return 'calc(100% - 94px)';
        if (props.iconLeft && props.isEmpty) return 'calc(100% - 64px)';
        if (!props.iconLeft && !props.isEmpty) return 'calc(100% - 54px)';
        return 'calc(100% - 24px)';
      }};
    }
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
