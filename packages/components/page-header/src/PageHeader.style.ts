import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';

export const MainContainer = styled.div`
  background-color: #fff;
`;

export const PageHeaderContainer = styled.div`
  width: 100%;
  min-height: 80px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-content: center;
`;

export const PageHeaderContent = styled.div`
  > * {
    margin-left: 12px;
  }
`;

export const BackButton = styled.button`
  ${macro.medium};
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  color: ${props => props.theme.palette['grey-500']};
  margin-left: 16px;
  border-left: 1px solid ${props => props.theme.palette['grey-300']};
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.palette['grey-600']};
  }
`;

export const PageHeaderTitle = styled.div`
  ${macro.h700};
  color: ${props => props.theme.palette['grey-800']};
  display: flex;
  align-items: center;
`;
