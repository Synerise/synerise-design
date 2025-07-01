import styled from 'styled-components';

export const Footer = styled.footer`
  padding: 16px 0;
  border-top: 1px solid ${(props): string => props.theme.palette['grey-200']};
`;
