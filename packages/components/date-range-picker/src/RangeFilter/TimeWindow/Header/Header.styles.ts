import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 24px;
  display: flex;
`;

export const Title = styled.div`
  flex: 1;
  display:flex;
  align-items: center;
`;

export const Actions = styled.div`
  flex: 0;
  white-space: nowrap;
`;
export const Separator = styled.div`
  flex: 1;
`;
export const Action = styled.a`
  &:not(:first-child) {
    margin-left: 16px;
  }
`;
