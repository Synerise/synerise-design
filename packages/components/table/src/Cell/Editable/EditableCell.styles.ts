import styled from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';

export const EditableCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    ${IconContainer} {
      opacity: 1;
      visibility: visible;
    }
  }
  ${IconContainer} {
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
  }
`;

export const Value = styled.span<{ asPlaceholder: boolean }>`
  color: ${(props): string =>
    props.asPlaceholder ? props.theme.palette['grey-400'] : 'inherit'};
`;
