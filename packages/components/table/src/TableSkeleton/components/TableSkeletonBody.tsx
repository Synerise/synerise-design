import React, { HTMLAttributes } from 'react';

import { SkeletonAvatar } from '@synerise/ds-skeleton';

import * as S from '../TableSkeleton.styles';
import { TableSkeletonBar } from './TableSkeletonBar';
import { TableSkeletonRowRight } from './TableSkeletonRowRight';
import { SKELETON_BAR_TINY, SKELETON_BAR_WIDE } from '../constants';

type TableSkeletonBodyProps = HTMLAttributes<HTMLDivElement> & {
  rows: number;
};

export const TableSkeletonBody = ({ rows = 10, ...htmlAttributes }: TableSkeletonBodyProps) => (
  <S.TableSkeletonBody {...htmlAttributes}>
    {Array.from({ length: rows }, (_, index) => (
      <S.TableSkeletonRow data-testid="ds-table-skeleton-row" key={`ds-skeleton-row-${index}`}>
        <S.TableSkeletonLeft>
          <TableSkeletonBar width={SKELETON_BAR_TINY} />
          <SkeletonAvatar shape="circle" size="M" />
          <TableSkeletonBar width={SKELETON_BAR_WIDE} />
        </S.TableSkeletonLeft>
        <S.TableSkeletonRight>
          <TableSkeletonRowRight />
        </S.TableSkeletonRight>
      </S.TableSkeletonRow>
    ))}
  </S.TableSkeletonBody>
);
