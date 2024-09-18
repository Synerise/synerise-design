import styled, { css } from 'styled-components';
import DSSkeleton from '@synerise/ds-skeleton';

const rowCss = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const TableSkeletonWrapper = styled.div<{ maxHeight?: number }>`
  background: ${props => props.theme.palette.white};
  ${props => props.maxHeight !== undefined && `height: ${props.maxHeight}px`};
  z-index: 10;
`;

export const TableSkeletonHeader = styled.div<{ headerHeight: number }>`
  ${rowCss}
  padding: 0 18px;
  height: ${props => props.headerHeight}px;
`;

export const Skeleton = styled(DSSkeleton)`
  padding: 12px 0;
`;
export const SkeletonWrapper = styled.div<{ width?: number }>`
  width: ${props => props.width}px;
`;

export const TableSkeletonSubHeader = styled.div<{ subheaderHeight: number }>`
  ${rowCss}
  border-top: solid 1px ${props => props.theme.palette['grey-200']};
  border-bottom: solid 1px ${props => props.theme.palette['grey-200']};
  padding: 0 18px 0 84px;
  height: ${props => props.subheaderHeight}px;
`;

export const TableSkeletonLeft = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  align-items: center;
`;
export const TableSkeletonRight = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  align-items: center;
`;

export const TableSkeletonBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 18px;
`;

export const TableSkeletonRow = styled.div<{ rowHeight: number }>`
  ${rowCss}
  height: ${props => props.rowHeight}px;
`;
