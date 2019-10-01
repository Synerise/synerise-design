import styled from 'styled-components';

export const SwitchWrapper = styled.div`
  display: flex;
  padding: 7px 12px;
`;

export const Texts = styled.div`
  margin-left: 16px;
`;

export const Label = styled.div`
  color: ${(props): string => props.theme.palette['grey-700']};
  cursor: pointer;
  transition: 0.3s ease;
`;

export const BelowLabel = styled.div`
  margin-top: 3px;
`;

export const Error = styled.div`
  color: ${(props): string => props.theme.palette['red-600']};
  margin-bottom: 4px;
`;

export const Description = styled.div`
  color: ${(props): string => props.theme.palette['grey-600']};
  transition: 0.3s ease;
`;
