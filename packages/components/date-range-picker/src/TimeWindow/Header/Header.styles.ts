import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const Title = styled.div`
  flex: 1;
`;

export const Actions = styled.div`
  flex: 0;
  white-space: nowrap;
`;

export const Action = styled.a`
  color: ${(props): string => props.theme.palette['grey-300']};

  &:not(:first-child) {
    margin-left: 16px;
  }
`;
