import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  border: 1px solid green;
`;

export const Title = styled.div`
  flex: 1;
`;

export const Actions = styled.div`
  flex: 0;
  white-space: nowrap;
`;

export const Action = styled.a`
  &:not(:first-child) {
    margin-left: 16px;
  }
`;
