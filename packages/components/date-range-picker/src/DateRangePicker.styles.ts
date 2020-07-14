import styled from 'styled-components';

export const Container = styled.div`
  width: 660px;
  background-color: ${(props): string => props.theme.palette.white};
  user-select: none;
`;

export const Separator = styled.div`
  margin: 16px;
  border-top: 1px solid ${(props): string => props.theme.palette['grey-200']};
`;

export const Addon = styled.div`
  margin: 16px;

`;
