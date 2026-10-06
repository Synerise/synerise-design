import styled from 'styled-components';

import type { ThemeProps } from '@synerise/ds-core';

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
  opacity: ${(props) =>
    props.isDisabled ? 'var(--ds-opacity-disabled)' : '1'};
  .ds-title {
    margin: 0;
  }
  /* Icon colour flows through .ds-icon's color (its svg uses fill: currentColor),
     so no explicit svg fill is needed. */
  .ds-title,
  .ds-icon {
    color: ${(props): string => props.inactiveColor};
  }
  &&&:focus {
    .ds-title,
    .ds-icon {
      color: var(--ds-color-text-brand-hover);
    }
  }

  &:hover {
    .ds-title,
    .ds-icon {
      color: var(--ds-color-text-brand-default);
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
