import styled from 'styled-components';

export const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const Label = styled.span`
  line-height: 1;
  color: ${(props): string => props.theme.palette['grey-600']};
`;
