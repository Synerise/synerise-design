import styled from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
`;

export const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Text = styled.div`
  flex: 1;
  text-align: center;
  font-weight: 500;
  font-size: 13px;
`;

export const Link = styled.span`
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: ${(props: ThemeProps): string => props.theme.palette['blue-600']};
  }

  &:active {
    color: ${(props: ThemeProps): string => props.theme.palette['blue-600']};
  }
`;
