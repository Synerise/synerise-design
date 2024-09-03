import React, { HTMLAttributes } from 'react';

import * as S from '../TableSkeleton.styles';

type TableSkeletonBarProps = HTMLAttributes<HTMLDivElement> & {
  width: number;
};

export const TableSkeletonBar = ({ width, ...htmlAttributes }: TableSkeletonBarProps) => (
  <S.SkeletonWrapper {...htmlAttributes} width={width}>
    <S.Skeleton size="M" numberOfSkeletons={1} />
  </S.SkeletonWrapper>
);
