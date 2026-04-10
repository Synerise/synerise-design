import styled from 'styled-components';

export const StatusLabel = styled.div<{ isDisabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  ${(props) => props.isDisabled && 'opacity: 0.4;'}
`;

export const Label = styled.span`
  color: ${(props): string => props.theme.palette['grey-700']};
  font-weight: 500;
  font-size: 13px;
  line-height: 1.38;
`;
