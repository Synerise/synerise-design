import styled from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';

export const IconLabelCell = styled.span<{ isDisabled?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  ${(props) => props.isDisabled && 'opacity: 0.4;'}
  ${IconContainer} {
    margin-right: 8px;
  }
`;
