import React, { HTMLAttributes } from 'react';

import { SKELETON_BAR_STANDARD } from '../constants';
import * as S from '../TableSkeleton.styles';
import { TableSkeletonBar } from './TableSkeletonBar';

export const TableSkeletonHeader = (props: HTMLAttributes<HTMLDivElement> & { headerHeight?: number }) => {
  return (
    <S.TableSkeletonHeader {...props}>
      <S.TableSkeletonLeft>
        <TableSkeletonBar width={SKELETON_BAR_STANDARD} />
      </S.TableSkeletonLeft>

      <S.TableSkeletonRight>
        <TableSkeletonBar width={SKELETON_BAR_STANDARD} />
        <TableSkeletonBar width={SKELETON_BAR_STANDARD} />
        <TableSkeletonBar width={SKELETON_BAR_STANDARD} />
      </S.TableSkeletonRight>
    </S.TableSkeletonHeader>
  );
};
