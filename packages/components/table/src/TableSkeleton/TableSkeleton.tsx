import React, { useMemo } from 'react';

import * as S from './TableSkeleton.styles';
import { TableSkeletonProps } from './TableSkeleton.types';
import { DEFAULT_ROW_COUNT, TABLE_HEADER, GAP, ROW_HEIGHT, PADDING } from './constants';
import { TableSkeletonHeader, TableSkeletonSubheader, TableSkeletonBody } from './components';

export const TableSkeleton = ({ maxHeight, ...htmlAttributes }: TableSkeletonProps) => {
  const rowCount = useMemo(() => {
    if (!maxHeight) return DEFAULT_ROW_COUNT;
    return Math.floor(maxHeight - TABLE_HEADER - PADDING + GAP) / (ROW_HEIGHT + GAP);
  }, [maxHeight]);

  return (
    <S.TableSkeletonWrapper maxHeight={maxHeight} {...htmlAttributes} data-testid="ds-table-skeleton">
      <TableSkeletonHeader />
      <TableSkeletonSubheader />
      <TableSkeletonBody rows={rowCount} />
    </S.TableSkeletonWrapper>
  );
};
