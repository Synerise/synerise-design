import styled from 'styled-components';

export const ContentWrapper = styled.div<{ withFolder: boolean }>`
  padding: 12px 140px 12px 0;
  margin-top: ${(props): string => (props.withFolder ? '0' : '-17px')};
`;

export const TagsWrapper = styled.div`
  padding: 22px 0 0;
  border-top: 1px dashed var(--ds-color-border-base-strong);
`;
export const InlineEditWrapper = styled.div`
  border-top: 1px dashed var(--ds-color-border-base-strong);
  padding: 12px 0;
  margin-left: 1px;
  white-space: pre;
  .ds-inline-edit > div:nth-child(2) {
    background-color: var(--ds-color-background-base-default);
  }
`;
export const DrawerContent = styled.div`
  padding: 0px;
`;
