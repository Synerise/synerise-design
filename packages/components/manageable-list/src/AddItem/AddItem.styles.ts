import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';
import { IconContainer } from '@synerise/ds-icon/dist/Icon.styles';

// eslint-disable-next-line import/prefer-default-export
export const AddContentButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  .ant-btn {
    ${macro.h200};
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: transparent;
    color: ${({ theme }): string => theme.palette['grey-500']};
    svg {
      color: ${({ theme }): string => theme.palette['grey-500']};
      fill: ${({ theme }): string => theme.palette['grey-500']};
    }
    ${IconContainer} {
      margin-right: 12px;
    }

    &:hover {
      color: ${({ theme }): string => theme.palette['grey-600']};
      border-color: ${({ theme }): string => theme.palette['grey-400']};
      background-color: transparent;
      svg {
        color: ${({ theme }): string => theme.palette['grey-600']};
        fill: ${({ theme }): string => theme.palette['grey-600']};
      }
    }
    &:focus {
      background-color: transparent;
      box-shadow: none;
      color: ${({ theme }): string => theme.palette['grey-500']};
      border-color: ${({ theme }): string => theme.palette['blue-600']};
    }

    &:disabled {
      border-color: ${({ theme }): string => theme.palette['grey-300']};
      opacity: 0.4;
      background-color: transparent;
      color: ${({ theme }): string => theme.palette['grey-500']};
      svg {
        color: ${({ theme }): string => theme.palette['grey-500']};
        fill: ${({ theme }): string => theme.palette['grey-500']};
      }
      &:hover {
        background-color: transparent;
      }
    }
  }
`;
