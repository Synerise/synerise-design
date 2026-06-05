import styled from 'styled-components';

import { IconContainer } from '@synerise/ds-icon';

export const Message = styled.div``;

export const ConfirmMessageTitle = styled.span`
  font-size: 14px;
  line-height: 1.43;
  color: #404c5a;
`;

export const ConfirmMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--ds-color-background-base-default);
  padding: 16px;
  border-radius: 3px;
  box-shadow: var(--ds-shadows-shadow-2);
  ${IconContainer} {
    margin-right: 8px;
  }
`;
