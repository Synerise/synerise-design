import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Footer = styled.div`
  padding: 16px 0;
  border-top: 1px solid ${(props): string => props.theme.palette['grey-200']};
`;
