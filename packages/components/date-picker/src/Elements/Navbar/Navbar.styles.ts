import styled, { FlattenSimpleInterpolation, css } from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Button from '@synerise/ds-button';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 0 25px;
`;

export const NavButton = styled(Button)<{ hidden?: boolean }>`
  ${(props): FlattenSimpleInterpolation | false =>
    !!props.hidden &&
    css`
      display: none;
    `}
  .ds-icon > svg {
    fill: ${(props): string => props.theme.palette['grey-600']};
  }
`;

export const ArrowContainer = styled.div<{ hidden?: boolean }>`
  display: flex;
  align-items: center;

  ${NavButton}:first-of-type {
    margin-right: 8px;
  }

  ${(props): FlattenSimpleInterpolation | false =>
    !!props.hidden &&
    css`
      display: none;
    `}
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
