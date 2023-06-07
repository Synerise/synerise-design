import styled from 'styled-components';
import { ThemeProps } from '@synerise/ds-core';

// eslint-disable-next-line import/prefer-default-export
export const TextTrigger = styled.div<{ inactiveColor: string; onFocus?: () => void }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .ds-title {
    margin: 0;
  }
  .ds-title,
  svg {
    color: ${(props): string => props.inactiveColor};
    fill: ${(props): string => props.inactiveColor};
  }
  &&&:focus {
      .ds-title,
      svg {
        color: ${(props): string => props.theme.palette['blue-700']};
        fill: ${(props): string => props.theme.palette['blue-700']};
      }
    }
  }

  &:hover {
    .ds-title,
    svg {
      color: ${(props): string => props.theme.palette['blue-600']};
      fill: ${(props): string => props.theme.palette['blue-600']};
    }
  }
`;

export const IconWrapper = styled.div<{ expanded?: boolean } & ThemeProps>`
  &&& {
    svg {
      transition: transform 0.1s linear;
      transform: rotateZ(${(props): string => (props.expanded ? '180deg' : '0deg')});
    }
  }
`;
