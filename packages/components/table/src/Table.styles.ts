import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';

export const Header = styled.div`
  background: #ffffff;
  padding: 24px;
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.div`
  ${macro.h400};
`;

export const SubTitle = styled.div`
  ${macro.small};
  border-left: 1px solid ${(props): string => props.theme.palette['grey-200']};
  color: ${(props): string => props.theme.palette['grey-800']};
  margin-left: 24px;
  padding: 0 24px;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
`;

export const Right = styled.div``;
