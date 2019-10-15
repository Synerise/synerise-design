import styled from 'styled-components';
import Button from '@synerise/ds-button';

// eslint-disable-next-line import/prefer-default-export
export const AddButton = styled(Button)`
  && {
    width: 48px;
    height: 48px;
    padding: 0;
    border-radius: 3px;
    border: 1px dashed ${({ theme }): string => theme.palette['grey-300']};
    background-color: transparent;

    &:hover {
      border: 1px dashed ${({ theme }): string => theme.palette['grey-400']};
      background-color: transparent;
    }
    &.pressed {
      background-color: ${({ theme }): string => theme.palette['grey-050']};
    }
    &:focus {
      border: 1px dashed ${({ theme }): string => theme.palette['blue-600']};
      box-shadow: none;
    }
  }
`;
