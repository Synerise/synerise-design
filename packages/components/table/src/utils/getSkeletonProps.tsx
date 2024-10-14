import React, { ReactNode } from 'react';

import type { DSColumnType, DSTableProps } from '../Table.types';
import * as S from '../Table.styles';
import {
  HEADER_HEIGHT,
  ROW_HEIGHT,
  SUBHEADER_HEIGHT,
  DEFAULT_ROW_COUNT,
  getDefaultSkeletonColumns,
} from '../constants/TableSkeleton.constants';

const getRowCount = (headerHeight: number, subheaderHeight: number, cellHeight: number, maxHeight?: number) => {
  if (!maxHeight) return DEFAULT_ROW_COUNT;
  return Math.floor((maxHeight - (headerHeight + subheaderHeight)) / cellHeight);
};

export const getSkeletonProps = <T extends object>(
  skeletonProps: DSTableProps<T>['skeletonProps'],
  columns?: DSColumnType<T>[]
): Partial<DSTableProps<T>> => {
  const {
    cellHeight = ROW_HEIGHT,
    headerHeight = HEADER_HEIGHT,
    subheaderHeight = SUBHEADER_HEIGHT,
    maxHeight,
  } = skeletonProps || {};
  const rowCount = getRowCount(headerHeight, subheaderHeight, cellHeight, maxHeight);

  const skeletonColumns = columns?.length
    ? columns.map(column => ({
        ...column,
        render: () => {
          return (
            <S.TableSkeletonCell width="50%" height={cellHeight}>
              <S.Skeleton numberOfSkeletons={1} size="M" />
            </S.TableSkeletonCell>
          );
        },
      }))
    : getDefaultSkeletonColumns(cellHeight);

  const skeletonSource = Array.from({ length: rowCount }).fill({}) as T[];

  return {
    columns: skeletonColumns,
    dataSource: skeletonSource,
    components: {
      body: {
        cell: ({ children }: { children: ReactNode }) => (
          <td className="ant-table-cell ds-table-skeleton-cell">{children}</td>
        ),
      },
    },
    pagination: false,
  };
};
