import styled from 'styled-components';

import { macro } from '@synerise/ds-typography';

export const BlockContent = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props): string => props.theme.palette['grey-050']};
  border: 1px solid transparent;
  padding: 11px;
  width: 100%;
  border-radius: 3px;
`;

export const BlockName = styled.div`
  ${macro.h200};
  color: ${(props): string => props.theme.palette['grey-600']};
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
      color: ${(props): string => props.theme.palette['grey-800']};
    }

    svg {
      color: ${(props): string => props.theme.palette['grey-800']};
      fill: ${(props): string => props.theme.palette['grey-800']};
    }
  }

  &.is-dragging {
    ${BlockContent} {
      border: 1px dashed ${(props): string => props.theme.palette['grey-400']};
    }
    ${BlockName}, svg {
      display: none;
    }
  }
`;
