import styled from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';

export const CopyableValue = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const Copyable = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    color: var(--ds-color-text-base-default);
    ${IconContainer} {
      opacity: 1;
      visibility: visible;
    }
  }
  ${IconContainer} {
    opacity: 0;
    visibility: hidden;
    svg {
      fill: var(--ds-color-icon-base-muted);
      color: var(--ds-color-icon-base-muted);
    }
    &:hover {
      svg {
        fill: var(--ds-color-icon-brand-default);
        color: var(--ds-color-icon-brand-default);
      }
    }
  }
`;
