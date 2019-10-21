import styled from 'styled-components';

export const Description = styled.div<{ disabled?: boolean }>`
  color: ${(props): string => props.theme.palette['grey-600']};
  ${(props): string => (props.disabled ? `opacity: 0.4;` : '')}
`;

export const ErrorText = styled.div`
  color: ${(props): string => props.theme.palette['red-600']};
  margin-bottom: 4px;
`;

export const Label = styled.label`
  color: ${(props): string => props.theme.palette['grey-800']};
  font-weight: 500;
  display: block;
  cursor: pointer;
`;
