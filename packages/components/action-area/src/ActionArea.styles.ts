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
  background-color: ${({ isError }) =>
    isError ? 'var(--ds-color-background-danger-subtle)' : 'none'};
  border: 1px dashed var(--ds-color-border-base-strong);
  ${({ isError }) =>
    isError && `border-color: var(--ds-color-border-danger-default);`}
  .ds-title {
    margin-bottom: 8px;
    text-align: center;
    word-break: break-word;
  }
  ${Description} {
    text-align: center;
    margin-bottom: 16px;
    word-break: break-word;
  }
`;

export const ActionAreaAction = styled.div``;

export const ErrorText = styled.div`
  margin-top: 8px;
  color: var(--ds-color-text-danger-default);
`;
