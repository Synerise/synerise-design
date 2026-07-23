import styled from 'styled-components';

import { macro } from '@synerise/ds-typography';

export const BlockContent = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--ds-color-background-base-subtle);
  border: 1px solid transparent;
  padding: 11px;
  width: 100%;
  border-radius: 3px;
`;

export const BlockName = styled.div`
  ${macro.h200};
  color: var(--ds-color-text-base-muted);
  padding-left: 12px;
  transition: 0.2s ease-in-out;
  user-select: none;
`;

export const BlockWrapper = styled.div`
  display: flex;
  flex: 0 0 50%;
  padding: 6px 8px;
  cursor: pointer;

  svg {
    transition: 0.2s ease-in-out;
  }

  &:hover {
    ${BlockName} {
      color: var(--ds-color-text-base-default);
    }

    svg {
      color: var(--ds-color-text-base-default);
    }
  }

  &.is-dragging {
    ${BlockContent} {
      border: 1px dashed var(--ds-color-border-base-stronghover);
    }
    ${BlockName}, svg {
      display: none;
    }
  }
`;
