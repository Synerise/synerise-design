import styled, { css } from 'styled-components';

import Scrollbar from '@synerise/ds-scrollbar';

type ColWrapperProps = {
  width?: number | null;
  minWidth?: number | null;
  maxWidth?: number | null;
  right?: number;
  left?: number;
};
const numberToPixels = (num: number): string => `${num}px`;

const getColumnWidth = (
  props: ColWrapperProps,
): React.CSSProperties['width'] => {
  return props.width ? numberToPixels(props.width) : 'initial';
};

export const RowWrapper = styled.div<{ onRowClickAvailable?: boolean }>`
  display: inline-table;
  cursor: ${(props) => (props.onRowClickAvailable ? 'pointer' : 'default')};
`;

export const InnerListElement = styled.div`
  background: ${(props) => props.theme.palette.white};
`;
export const VirtualListSpace = styled.div``;

export const VirtualListWrapper = styled.div<{
  isSticky: boolean;
  listHeight: number;
  listWidth: number;
}>`
  ${(props) =>
    props.isSticky &&
    css`
      width: ${numberToPixels(props.listWidth)};
      overflow: overlay hidden;
      scrollbar-color: transparent;
      scrollbar-width: none;

      ::-webkit-scrollbar-thumb {
        background-color: transparent;
      }
      ::-webkit-scrollbar {
        display: none;
      }
      :after {
        content: '';
        width: 10px;
        height: ${numberToPixels(props.listHeight)};
        display: block;
      }
    `}

  overscroll-behavior-x: contain;
`;

export const StickyScrollbar = styled(Scrollbar)<{
  offset: number;
  isStuck: boolean;
}>`
  position: sticky;
  bottom: 0;
  z-index: ${(props) => (props.isStuck ? 2 : 0)};
  transform: translate(5px, ${(props) => numberToPixels(props.offset)});
`;

export const StickyScrollbarContent = styled.div<{ scrollWidth: number }>`
  width: ${(props) => numberToPixels(props.scrollWidth)};
  height: 10px;
`;

export const ColWrapper = styled.div<ColWrapperProps>`
  display: table-cell;
  vertical-align: middle;

  ${(props) =>
    props.left !== undefined && `left: ${numberToPixels(props.left)}`};
  ${(props) =>
    props.right !== undefined && `right: ${numberToPixels(props.right)}`};

  ${(props) => {
    const width = getColumnWidth(props);
    return css`
      width: ${width};
      min-width: ${width};
      max-width: ${width};
    `;
  }}

  padding: 0 24px;

  &.virtual-table-cell.ant-table-selection-column {
    padding: 0 8px 0 24px;
  }

  &.virtual-table-cell.ds-table-star-column {
    padding: 0 8px 0 24px;

    & > button {
      display: flex;
    }
  }

  &.virtual-table-cell.ant-table-selection-column
    + .virtual-table-cell.ds-table-star-column {
    padding-left: 0;
  }
`;

export const VirtualTableWrapper = styled.div<{
  isSticky: boolean;
  titleBarHeight: number;
  titleBarTop: number;
  isHeaderVisible?: boolean;
}>`
  ${(props) =>
    props.isSticky
      ? css`
          .ant-table-title {
            position: sticky;
            top: ${props.titleBarTop - props.titleBarHeight}px;
            z-index: 99;
          }
          .ant-table-title,
          .ant-table-sticky-holder {
            transition: top 0.3s ease-in-out;
          }
          ${props.isHeaderVisible &&
          css`
            .ant-table-title {
              top: ${props.titleBarTop}px;
            }
            .ant-table-sticky-holder {
              top: ${props.titleBarTop + props.titleBarHeight}px !important;
            }
          `};
        `
      : css`
          position: relative;
        `}
`;
