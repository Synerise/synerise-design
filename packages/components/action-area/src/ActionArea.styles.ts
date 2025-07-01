import styled from 'styled-components';

import { Description } from '@synerise/ds-typography';

export const ActionAreaWrapper = styled.div<{ isFullWidth?: boolean }>`
  max-width: 100%;
  width: ${({ isFullWidth }) => (isFullWidth ? '100%;' : '588px;')};
`;

export const ActionAreaContent = styled.div<{ isError?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px 24px;
  border-radius: 3px;
  background-color: ${({ isError, theme }) =>
    isError ? theme.palette['red-050'] : 'none'};
  border: 1px dashed ${({ theme }) => theme.palette['grey-300']};
  ${({ isError, theme }) =>
    isError && `border-color: ${theme.palette['red-600']};`}
  .ds-title {
    margin-bottom: 8px;
    text-align: center;
    word-break: break-word;
  }
  ${Description} {
    margin-bottom: 16px;
    text-align: center;
    word-break: break-word;
  }
`;

export const ActionAreaAction = styled.div``;

export const ErrorText = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.palette['red-600']};
`;
