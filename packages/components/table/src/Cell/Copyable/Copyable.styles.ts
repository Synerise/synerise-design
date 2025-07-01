import styled from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';

export const Copyable = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    color: ${(props): string => props.theme.palette['grey-800']};
    ${IconContainer} {
      opacity: 1;
      visibility: visible;
    }
  }
  ${IconContainer} {
    opacity: 0;
    visibility: hidden;
    svg {
      fill: ${(props): string => props.theme.palette['grey-400']};
      color: ${(props): string => props.theme.palette['grey-400']};
    }
    &:hover {
      svg {
        fill: ${(props): string => props.theme.palette['blue-600']};
        color: ${(props): string => props.theme.palette['blue-600']};
      }
    }
  }
`;
