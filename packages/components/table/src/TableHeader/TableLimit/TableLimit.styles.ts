import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';

export const TableLimit = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const Title = styled.div`
  ${macro.small};
  color: ${(props): string => props.theme.palette['grey-700']};
  strong {
    font-weight: 500;
  }
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Alert = styled.div`
  position: relative;
  padding-left: 16px;
  margin-left: 16px;
  &::before {
    position: absolute;
    top: 4px;
    left: 0;
    content: '';
    display: flex;
    width: 1px;
    height: 16px;
    background: ${(props): string => props.theme.palette['grey-200']};
  }
`;

export const ItemsMenu = styled.div`
  padding-left: 24px;
`;
