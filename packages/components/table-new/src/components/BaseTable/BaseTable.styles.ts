import styled, { css } from 'styled-components';

import DSSkeleton from '@synerise/ds-skeleton';

import { type StickyData } from '../../Table.types';
import { TableHorizontalScroll } from '../TableHorizontalScroll/TableHorizontalScroll';

export const BaseTableWrapper = styled.div<{
  columnSizing: Record<string, number>;
  $isColumnSizingReady?: boolean;
  $size?: number;
  isEmpty?: boolean;
}>`
  ${(props) => css`
    ${Object.entries(props.columnSizing || {})
      .map(([key, value]) => `--${key}-width: ${value}px;`)
      .join('\n')}
  `}
  --table-size: ${(props) =>
    !props.isEmpty && props.$size ? `${props.$size}px` : '100%'};

  ${(props) => !props.$isColumnSizingReady && `opacity: 0;`}
  position: relative;
  z-index: 1;
`;

export const TableContainer = styled.div<{
  withBorderTop?: boolean;
  cardStyles?: boolean;
  withScroll?: boolean;
  $maxHeight?: number;
}>`
  ${(props) =>
    props.withScroll &&
    css`
      overflow-y: scroll;
      max-height: ${props.$maxHeight ? `${props.$maxHeight}px` : '800px'};
    `}
  ${(props) =>
    props.withBorderTop &&
    css`
      border-top: solid 1px ${props.theme.palette['grey-200']};
    `}
  ${(props) =>
    props.cardStyles &&
    css`
      border-radius: 3px;
      box-shadow: ${props.theme.variables['box-shadow-2']};
    `}
    
  background: ${(props) => props.theme.palette['white']};
`;

export const TableBodyScrollWrapper = styled.div<{
  $maxHeight?: number;
}>`
  overflow-y: scroll;
  max-height: ${(props) =>
    props.$maxHeight ? `${props.$maxHeight}px` : '800px'};
`;

export const TableSkeleton = styled(DSSkeleton)<{ skeletonWidth?: string }>`
  padding: 0;
  ${(props) => props.skeletonWidth && `width: ${props.skeletonWidth};`}
`;

export const StyledTable = styled.table`
  width: var(--table-size);
  border-spacing: 0;
  border-collapse: separate; /* required for sticky cells to keep their backgrounds */
`;

export const TableColumnsHorizontalScroll = styled(TableHorizontalScroll)<{
  stickyData?: StickyData;
  isScrolled?: number | null;
}>`
  ${({ stickyData, isScrolled, theme }) => {
    return (
      stickyData &&
      css`
        position: sticky;
        transition: top 0.3s ease-in-out;
        top: ${stickyData.isRevealed
          ? `${stickyData.titleBarHeight - stickyData.containerPaddingTop}px` // '49px'
          : `-${stickyData.containerPaddingTop}px`};
        z-index: 11;
        background: ${theme.palette['white']};
        ${((isScrolled &&
          isScrolled >
            stickyData.titleBarHeight + stickyData.containerPaddingTop) ||
          stickyData.isRevealed) &&
        `box-shadow: ${theme.variables['box-shadow-1']};`}
      `
    );
  }}
`;
