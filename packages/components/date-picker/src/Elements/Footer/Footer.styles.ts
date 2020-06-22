import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
`;

export const Actions = styled.div`
  flex: 0;
  display: flex;
  align-items: center;
  white-space: nowrap;

  > *:not(:last-child) {
    margin-right: 16px;
  }
`;
