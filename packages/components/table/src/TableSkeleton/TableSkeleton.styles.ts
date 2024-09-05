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

export const TableSkeletonHeader = styled.div`
  ${rowCss}
  padding: 18px;
`;

export const Skeleton = styled(DSSkeleton)`
  padding: 12px 0;
`;
export const SkeletonWrapper = styled.div<{ width?: number }>`
  width: ${props => props.width}px;
`;

export const TableSkeletonSubHeader = styled.div`
  ${rowCss}
  border-top: solid 1px ${props => props.theme.palette['grey-200']};
  border-bottom: solid 1px ${props => props.theme.palette['grey-200']};
  padding: 18px 18px 18px 84px;
`;

export const TableSkeletonLeft = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
`;
export const TableSkeletonRight = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
`;

export const TableSkeletonBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 18px;
`;

export const TableSkeletonRow = styled.div`
  ${rowCss}
`;
