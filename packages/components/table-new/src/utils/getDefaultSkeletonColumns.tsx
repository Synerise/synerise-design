import React, { type ReactNode } from 'react';

import { SkeletonAvatar } from '@synerise/ds-skeleton';
import { type ColumnDef } from '@tanstack/react-table';

import { AvatarLabelCell } from '../components/Cell/AvatarLabel/AvatarLabel';
import * as S from '../components/TableBody/TableBodySkeleton/TableBodySkeleton.styles';

export const getDefaultSkeletonColumns = <TData, TValue>() => {
  const renderTitleSkeleton = (skeletonWidth?: string) => (
    <S.TableSkeletonCell>
      <S.Skeleton
        skeletonWidth={skeletonWidth}
        numberOfSkeletons={1}
        width="M"
      />
    </S.TableSkeletonCell>
  );

  const renderCellSkeleton = () => (
    <S.TableSkeletonCell>
      <S.Skeleton numberOfSkeletons={1} size="M" />
    </S.TableSkeletonCell>
  );

  const renderAvatarCell = () => (
    <S.TableSkeletonCell>
      <AvatarLabelCell
        title={
          <S.Skeleton skeletonWidth="120px" numberOfSkeletons={1} width="M" />
        }
        avatar={<SkeletonAvatar shape="square" size="M" />}
      />
    </S.TableSkeletonCell>
  );

  const buildMeta = (
    skeletonCell: () => ReactNode,
    width?: number,
    minWidth?: number,
  ) => ({
    ...(minWidth !== undefined ? { minWidth } : {}),
    ...(width !== undefined ? { width } : {}),
    childCell: () => null,
    skeletonCell,
  });

  const columns: ColumnDef<TData, TValue>[] = [
    {
      accessorKey: 'undefined',
      header: () => renderTitleSkeleton('140px'),
      meta: buildMeta(renderAvatarCell, 350),
      size: 350,
      enableSorting: false,
      id: 'col-0',
    },
    {
      accessorKey: 'undefined',
      header: () => '',
      meta: buildMeta(() => <></>, undefined, 100),
      enableSorting: false,
      id: 'col-1',
    },
    {
      accessorKey: 'undefined',
      header: () => renderTitleSkeleton(),
      meta: buildMeta(renderCellSkeleton, 120),
      size: 120,
      enableSorting: false,
      id: 'col-2',
    },
    {
      accessorKey: 'undefined',
      header: () => renderTitleSkeleton(),
      meta: buildMeta(renderCellSkeleton, 212),
      size: 212,
      enableSorting: false,
      id: 'col-3',
    },
    {
      accessorKey: 'undefined',
      header: () => renderTitleSkeleton(),
      meta: buildMeta(renderCellSkeleton, 120),
      size: 120,
      enableSorting: false,
      id: 'col-4',
    },
  ];

  return columns;
};
