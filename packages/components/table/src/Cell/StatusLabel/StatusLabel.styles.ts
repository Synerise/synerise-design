import styled from 'styled-components';

export const StatusLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Label = styled.span`
  color: ${(props): string => props.theme.palette['grey-700']};
  font-weight: 500;
  font-size: 13px;
  line-height: 1.38;
`;
