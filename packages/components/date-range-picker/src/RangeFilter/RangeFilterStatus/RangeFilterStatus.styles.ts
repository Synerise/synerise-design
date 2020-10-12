import styled from 'styled-components';

export const BadgeWrapper = styled.div`
  margin-right: 16px;
  margin-bottom: -2px;
`;

export const SuffixText = styled.span`
  color: ${(props): string => props.theme.palette['blue-600']};
  font-weight: 500;
  margin-right: 16px;
`;

export const Container = styled.div`
  margin: 10px 0 24px 0;
`