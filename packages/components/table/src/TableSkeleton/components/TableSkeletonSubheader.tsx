import React, { HTMLAttributes } from 'react';

import * as S from '../TableSkeleton.styles';
import { TableSkeletonBar } from './TableSkeletonBar';
import { TableSkeletonRowRight } from './TableSkeletonRowRight';
import { SKELETON_BAR_WIDE } from '../constants';

export const TableSkeletonSubheader = (props: HTMLAttributes<HTMLDivElement> & { subheaderHeight?: number }) => {
  return (
    <S.TableSkeletonSubHeader {...props}>
      <S.TableSkeletonLeft>
        <TableSkeletonBar width={SKELETON_BAR_WIDE} />
      </S.TableSkeletonLeft>

      <S.TableSkeletonRight>
        <TableSkeletonRowRight />
      </S.TableSkeletonRight>
    </S.TableSkeletonSubHeader>
  );
};
