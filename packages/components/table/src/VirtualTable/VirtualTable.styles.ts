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

const getColumnMaxWidth = (props: ColWrapperProps): React.CSSProperties['maxWidth'] => {
  if (props.maxWidth) {
    return numberToPixels(props.maxWidth);
  }
  return props.width ? numberToPixels(props.width) : 'initial';
};

const getColumnMinWidth = (props: ColWrapperProps): React.CSSProperties['minWidth'] => {
  if (props.minWidth) {
    return numberToPixels(props.minWidth);
  }
  return props.width ? numberToPixels(props.width) : 'initial';
};

export const RowWrapper = styled.div`
  display: inline-table;
`;

export const InnerListElement = styled.div`
  background: ${props => props.theme.palette.white};
`;
export const VirtualListSpace = styled.div``;

export const VirtualListWrapper = styled.div<{ isSticky: boolean; listHeight: number; listWidth: number }>`
  ${props =>
    props.isSticky &&
    css`
      width: ${props.listWidth}px;
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
        height: ${props.listHeight}px;
        display: block;
      }
    `}

  overscroll-behavior-x: contain;
`;

export const StickyScrollbar = styled(Scrollbar)<{ offset: number }>`
  position: sticky;
  bottom: 0;
  z-index: 2;
  transform: translate(5px, ${props => props.offset}px);
`;

export const StickyScrollbarContent = styled.div<{ scrollWidth: number }>`
  width: ${props => props.scrollWidth}px;
  height: 10px;
`;

export const ColWrapper = styled.div<ColWrapperProps>`
  display: table-cell;
  vertical-align: middle;

  ${props => props.left !== undefined && `left: ${numberToPixels(props.left)}`};
  ${props => props.right !== undefined && `right: ${numberToPixels(props.right)}`};

  width: ${props => (props.width !== undefined && props.width !== null ? numberToPixels(props.width) : 'initial')};
  min-width: ${(props): ReturnType<typeof getColumnMinWidth> => getColumnMinWidth(props)};
  max-width: ${(props): ReturnType<typeof getColumnMaxWidth> => getColumnMaxWidth(props)};
  padding: 0 24px;

  &.virtual-table-cell.ant-table-selection-column {
    padding: 0 8px 0 24px;
    width: auto;
  }

  &.virtual-table-cell.ds-table-star-column {
    padding: 0 8px 0 24px;
    width: auto;

    & > button {
      display: flex;
    }
  }

  &.virtual-table-cell.ant-table-selection-column + .virtual-table-cell.ds-table-star-column {
    padding-left: 0;
  }
`;

export const VirtualTableWrapper = styled.div<{ isSticky: boolean }>`
  ${props => (props.isSticky ? '' : 'position: relative;')}
`;
