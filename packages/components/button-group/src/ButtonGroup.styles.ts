import styled from 'styled-components';

export const Container = styled.div``;

export const Title = styled.h4`
  font-size: 13px;
  margin: 0 0 8px;
`;

export const Description = styled.p`
  margin: 8px 0 0;
  color: ${props => props.theme.palette['grey-500']};
`;
