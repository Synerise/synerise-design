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
  background-color: ${(props): string => props.theme.palette.white};
  padding: 16px;
  border-radius: 3px;
  box-shadow: 0 16px 32px 0 rgba(35, 41, 54, 0.1);
  ${IconContainer} {
    margin-right: 8px;
  }
`;
