import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  background: var(--ds-color-background-base-subtle);
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  &:empty {
    display: none;
  }
`;
