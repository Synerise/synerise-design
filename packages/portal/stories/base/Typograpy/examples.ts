import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';
export const Color = styled.div`
  color: ${({ theme }) => theme.palette['red-600']};
`;

export const HeaderH1 = styled.div`
  color: #000;
  ${macro.h700};
`;
