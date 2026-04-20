import styled, { css } from 'styled-components';

import DSSkeleton from '@synerise/ds-skeleton';

export const TableContainer = styled.div<{
  withBorderTop?: boolean;
  withInfiniteScroll?: boolean;
}>`
  width: 100%;
  overflow: scroll;
  ${(props) => props.withInfiniteScroll && `max-height: 1200px;`}
  ${(props) =>
    props.withBorderTop &&
    css`
      border-top: solid 1px ${props.theme.palette['grey-200']};
    `}
  background: ${(props) => props.theme.palette['white']};
`;

export const commonPinnedStyles = css<{
  isPinned?: 'left' | 'right' | false;
  leftOffset?: number;
  rightOffset?: number;
}>`
  left: ${(props) =>
    props.isPinned === 'left' ? `${props.leftOffset}px` : 'auto'};
  right: ${(props) =>
    props.isPinned === 'right' ? `${props.rightOffset}px` : 'auto'};
  position: ${(props) => (props.isPinned ? 'sticky' : 'relative')};

  z-index: ${(props) => (props.isPinned ? 1 : 0)};
`;

export const commonRowStyles = `
  display: table;
  width: 100%;
  table-layout: fixed;
`;

export const commonCellStyles = css`
  white-space: nowrap;
  overflow: hidden;
  padding: 0 24px;
  text-overflow: ellipsis;
  border-bottom: 1px solid ${(props) => props.theme.palette['grey-200']};
  transition:
    background-color 0.2s,
    border-color 0.2s;
`;

export const TableSkeleton = styled(DSSkeleton)<{ skeletonWidth?: string }>`
  padding: 0;
  ${(props) => props.skeletonWidth && `width: ${props.skeletonWidth};`}
`;
