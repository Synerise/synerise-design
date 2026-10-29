import React from 'react';

import { Skeleton } from '../Estimation.styles';
import * as S from './EstimationProgressBar.styles';

export const EstimationProgressBarSkeleton = () => {
  const EMPTY_VALUE = {
    percent: 100,
    color: 'var(--ds-progressbar-bar-bg-track)',
  };
  return (
    <>
      <S.EstimationProgressBar
        data-testid="estimation-progressbar-skeleton"
        values={[EMPTY_VALUE]}
        stackedBars={false}
      />
      <S.EstimationProgressBarLegend>
        <Skeleton height={18} numberOfSkeletons={1} $width={142} />
      </S.EstimationProgressBarLegend>
    </>
  );
};
