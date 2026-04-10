import styled from 'styled-components';

import { hexToRgba } from '@synerise/ds-utils';

export const HorizontalScrollWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  overscroll-behavior-y: auto;
  overscroll-behavior-x: contain;
`;

export const LeftShadow = styled.div<{ offset: number }>`
  position: absolute;
  top: 0;
  left: ${(props) => props.offset}px;
  width: 10px;
  height: 100%;
  box-shadow: inset 10px 0 8px -8px
    ${({ theme }) => hexToRgba(theme.palette['grey-500'], 0.12)};

  z-index: 10;
`;
export const RightShadow = styled.div<{ offset: number }>`
  position: absolute;
  top: 0;
  right: ${(props) => props.offset}px;
  width: 10px;
  height: 100%;
  box-shadow: inset -10px 0 8px -8px
    ${({ theme }) => hexToRgba(theme.palette['grey-500'], 0.12)};

  z-index: 10;
`;

export const HorizontalScrollContainer = styled.div<{
  showLeftShadow: boolean;
  showRightShadow: boolean;
}>`
  position: relative;
  ${LeftShadow} {
    ${(props) => (props.showLeftShadow ? `display: block` : `display: none`)}
  }
  ${RightShadow} {
    ${(props) => (props.showRightShadow ? `display: block` : `display: none`)}
  }
`;

export const ScrollbarWrapper = styled.div`
  // position: sticky;
  // top: calc(100% - 20px);
  // height: 20px;
  // background: red;
`;
