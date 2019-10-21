import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';

export const SwitchWrapper = styled.div`
  display: flex;
`;

export const Texts = styled.div`
  margin-left: 16px;
`;

export const Label = styled.label`
  ${macro.heading};
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
