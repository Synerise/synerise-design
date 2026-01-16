import React from 'react';

import { FormattedRelativeDateTimeTo } from '@synerise/ds-core';

import * as S from '../Estimation.styles';
import { type EstimationCalculatedDateProps } from '../Estimation.types';

export const EstimationCalculatedDate = ({
  label,
  calculatedDate,
}: EstimationCalculatedDateProps) => {
  const estimationDate =
    calculatedDate instanceof Date ? (
      <FormattedRelativeDateTimeTo value={calculatedDate} />
    ) : (
      calculatedDate
    );

  return (
    <>
      {label}{' '}
      <S.EstimationCalculatedDate level={6}>
        {estimationDate}
      </S.EstimationCalculatedDate>
    </>
  );
};
