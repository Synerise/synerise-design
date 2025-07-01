import styled, { css } from 'styled-components';

import { macro } from '@synerise/ds-typography';

export const MenuGroupWrapper = styled.div`
  background: ${(props): string => props.theme.palette.white};
  width: 262px;
  position: absolute;
  left: 61px;
  top: 0px;
  height: 100%;
  border-left: 1px solid ${(props): string => props.theme.palette['grey-100']};
  padding: 12px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease-in-out;
  transition-delay: 0.1s;
  overflow-y: auto;
  display: flex;
  flex-flow: column;

  &.menu__sub-menu--active {
    visibility: visible;
    opacity: 1;

    > * {
      opacity: 1;
      top: 0px !important;
    }
  }

  a:hover {
    text-decoration: none;
  }

  > * {
    opacity: 0;
    transition: all 0.3s ease-in-out;
    position: relative;
    top: -10px;
  }

  ${[...Array(100).keys()].map(
    (k) => css`
      > *:nth-child(${k}) {
        transition-delay: ${0.1 + (k * 10) / 500}s;
      }
    `,
  )}

  &:hover {
    > * {
      transition-delay: 0s;
    }
  }
`;

export const MenuGroupTitle = styled.h3`
  ${macro.h600};
  letter-spacing: -0.1px;
  padding: 14px 12px 8px;
`;

export const MenuGroupSubTitle = styled.h4`
  ${macro.h100};
  letter-spacing: 0.1px;
  color: ${(props): string => props.theme.palette['grey-500']};
  border-top: 1px dashed ${(props): string => props.theme.palette['grey-200']};
  margin: 12px 12px 12px;
  padding-top: 12px;
  text-transform: uppercase;
`;
