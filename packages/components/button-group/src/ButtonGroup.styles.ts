import styled from 'styled-components';

export const Container = styled.div``;

export const Title = styled.h4`
  margin: 0 0 8px;
`;

export const Description = styled.p`
  margin: 8px 0 0;
  color: ${(props): string => props.theme.palette['grey-500']};
`;
