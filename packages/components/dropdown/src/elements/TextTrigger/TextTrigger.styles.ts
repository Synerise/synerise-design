import styled from 'styled-components';

import { type ThemeProps } from '@synerise/ds-core';

export const TextTrigger = styled.div<{
  inactiveColor: string;
  onFocus?: () => void;
  isDisabled?: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.isDisabled ? 'default' : 'pointer')};
  opacity: ${(props) => (props.isDisabled ? 0.4 : 1)};
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
      transform: rotateZ(
        ${(props): string => (props.expanded ? '180deg' : '0deg')}
      );
    }
  }
`;
