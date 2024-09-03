import React, { HTMLAttributes } from 'react';

import * as S from '../TableSkeleton.styles';
import { TableSkeletonBar } from './TableSkeletonBar';
import { SKELETON_BAR_STANDARD, SKELETON_BAR_EXTRA_WIDE } from '../constants';

export const TableSkeletonRowRight = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <S.TableSkeletonRight {...props}>
      <TableSkeletonBar width={SKELETON_BAR_STANDARD} />
      <TableSkeletonBar width={SKELETON_BAR_EXTRA_WIDE} />
      <TableSkeletonBar width={SKELETON_BAR_STANDARD} />
    </S.TableSkeletonRight>
  );
};
