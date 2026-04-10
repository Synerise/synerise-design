import styled from 'styled-components';

import DSSkeleton from '@synerise/ds-skeleton';

import { commonCellStyles, commonRowStyles } from '../../../Table.styles';

export const Tr = styled.tr`
  ${commonRowStyles}
`;

export const TBody = styled.tbody`
  position: relative;
`;

export const Td = styled.td<{
  $width?: number;
}>`
  ${commonCellStyles}
  padding: 16px 24px;
  ${(props) => (props.$width ? `width: ${props.$width}px` : '')};
`;

export const TableSkeletonCell = styled.div`
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

export const Skeleton = styled(DSSkeleton)<{ skeletonWidth?: string }>`
  padding: 0;
  ${(props) => props.skeletonWidth && `width: ${props.skeletonWidth};`}
`;
