import styled, { css } from 'styled-components';

import DSSkeleton from '@synerise/ds-skeleton';

import { type StickyData } from '../../Table.types';
import { TableHorizontalScroll } from '../TableHorizontalScroll/TableHorizontalScroll';

// --col-N-width / --table-size are set inline in BaseTable.tsx (they change on
// resize; interpolating them here would mint a new class per unique width set).
export const BaseTableWrapper = styled.div<{
  $isColumnSizingReady?: boolean;
}>`
  ${(props) => !props.$isColumnSizingReady && `opacity: 0;`}
  position: relative;
  z-index: 1;

  .ds-pagination .ds-pagination-total-text strong {
    font-weight: 500;
  }
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

export const Tfoot = styled.tfoot``;

export const StyledTable = styled.table<{ $tableLayoutAuto?: boolean }>`
  width: var(--table-size);
  min-width: 100%;
  border-spacing: 0;
  table-layout: ${(props) => (props.$tableLayoutAuto ? 'auto' : 'fixed')};
  border-collapse: separate; /* required for sticky cells to keep their backgrounds */

  /*
    In unified-content mode (colgroup-driven layout) revert the
    row-as-mini-table trick from commonRowStyles. Each tr must render as a
    real table-row so the parent table's colgroup widths apply across rows.
    The double-ampersand boosts selector specificity over the row's own class.
  */
  ${(props) =>
    props.$tableLayoutAuto &&
    css`
      && tr {
        display: table-row;
        width: auto;
        table-layout: auto;
      }
      && thead {
        display: table-header-group;
      }
      && tbody {
        display: table-row-group;
      }
      && th,
      && td {
        display: table-cell;
      }
    `}

  ${(props) => css`
    @keyframes ds-table-row-highlight {
      0% {
        background-color: transparent;
      }
      5% {
        background-color: var(
          --ds-highlight-color,
          ${props.theme.palette['blue-050']}
        );
      }
      30% {
        background-color: var(
          --ds-highlight-color,
          ${props.theme.palette['blue-050']}
        );
      }
      100% {
        background-color: transparent;
      }
    }
  `}

  tr.ds-table-row-highlight td {
    transition: background 0.3s ease-in-out;
    animation: ds-table-row-highlight var(--ds-highlight-duration, 600ms)
      ease-in-out forwards;
  }
`;

/**
 * Full-width band between the title bar and the column header row.
 *
 * Sticky, and animated on the same `isRevealed` flag as the title bar: while scrolled down both are
 * parked above the viewport, and scrolling up brings the pair back together. A sub-header that
 * scrolled away for good would leave the trigger in the title bar reappearing without the surface it
 * controls.
 *
 * Opaque on purpose — a transparent sticky band would show the rows passing beneath it. Everything
 * else (width, padding, borders) belongs to the injected content.
 *
 * The hidden offset is the band's own measured height, so a `subHeaderHeight` of 0 parks it at
 * exactly the column header row's pinned offset — where this z-index makes it cover the column
 * headers. See how BaseTable measures it.
 */
export const SubHeader = styled.div<{ stickyData?: StickyData }>`
  ${({ stickyData, theme }) =>
    stickyData &&
    css`
      position: sticky;
      transition: top 0.3s ease-in-out;
      top: ${stickyData.isRevealed
        ? `${stickyData.titleBarHeight - stickyData.containerPaddingTop}px`
        : `-${stickyData.subHeaderHeight + stickyData.containerPaddingTop}px`};
      z-index: 12;
      background: ${theme.palette['white']};
    `}
`;

export const TableColumnsHorizontalScroll = styled(TableHorizontalScroll)<{
  stickyData?: StickyData;
  isScrolled?: number | null;
}>`
  ${({ stickyData, isScrolled, theme }) => {
    // Height of everything that reveals above this row. `subHeaderHeight` is 0 without a
    // subHeaderComponent, so every offset below is unchanged for tables that don't use one.
    const revealedStackHeight = stickyData
      ? stickyData.titleBarHeight + stickyData.subHeaderHeight
      : 0;
    return (
      stickyData &&
      css`
        position: sticky;
        transition: top 0.3s ease-in-out;
        top: ${stickyData.isRevealed
          ? `${revealedStackHeight - stickyData.containerPaddingTop}px` // '49px' with no sub-header
          : `-${stickyData.containerPaddingTop}px`};
        z-index: 11;
        background: ${theme.palette['white']};
        ${((isScrolled &&
          isScrolled > revealedStackHeight + stickyData.containerPaddingTop) ||
          stickyData.isRevealed) &&
        `box-shadow: ${theme.variables['box-shadow-1']};`}
      `
    );
  }}
`;
