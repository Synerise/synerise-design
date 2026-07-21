import React, { type ReactNode, useMemo } from 'react';

import { BadgeWithLabel } from '@synerise/ds-badge';
import { type ProgressValue } from '@synerise/ds-progress-bar';

import { type EstimationProgressValue } from '../Estimation.types';
import * as S from './EstimationProgressBar.styles';

type EstimationProgressBarProps = {
  values: EstimationProgressValue[];
};

export const EstimationProgressBar = ({
  values: progressBarValues,
}: EstimationProgressBarProps) => {
  const { progressValues, progressLegend } = useMemo(() => {
    const values: ProgressValue[] = [];
    const legend: ReactNode[] = [];
    progressBarValues.forEach((value) => {
      values.push({
        ...value,
      });
      if (value.label) {
        legend.push(
          <BadgeWithLabel dot customColor={value.color}>
            {value.label}
          </BadgeWithLabel>,
        );
      }
    });
    return {
      progressValues: values,
      progressLegend: legend,
    };
  }, [progressBarValues]);

  return (
    <>
      <S.EstimationProgressBar
        data-testid="estimation-progressbar"
        values={progressValues}
        stackedBars={false}
      />
      {progressLegend?.length > 0 && (
        <S.EstimationProgressBarLegend>
          {progressLegend}
        </S.EstimationProgressBarLegend>
      )}
    </>
  );
};
