import React, { useMemo } from 'react';

import * as S from './TableSkeleton.styles';
import { TableSkeletonProps } from './TableSkeleton.types';
import { DEFAULT_ROW_COUNT, HEADER_HEIGHT, SUBHEADER_HEIGHT, ROW_HEIGHT } from './constants';
import { TableSkeletonHeader, TableSkeletonSubheader, TableSkeletonBody } from './components';

export const TableSkeleton = ({
  maxHeight,
  headerHeight = HEADER_HEIGHT,
  subheaderHeight = SUBHEADER_HEIGHT,
  rowHeight = ROW_HEIGHT,
  ...htmlAttributes
}: TableSkeletonProps) => {
  const rowCount = useMemo(() => {
    if (!maxHeight) return DEFAULT_ROW_COUNT;
    return Math.floor(maxHeight - (headerHeight + subheaderHeight)) / rowHeight;
  }, [headerHeight, maxHeight, rowHeight, subheaderHeight]);

  return (
    <S.TableSkeletonWrapper maxHeight={maxHeight} {...htmlAttributes} data-testid="ds-table-skeleton">
      <TableSkeletonHeader headerHeight={headerHeight} />
      <TableSkeletonSubheader subheaderHeight={subheaderHeight} />
      <TableSkeletonBody rowHeight={rowHeight} rows={rowCount} />
    </S.TableSkeletonWrapper>
  );
};
