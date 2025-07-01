import React, { useMemo } from 'react';

import * as S from './MultiValue.styles';
import { type MultivalueProps } from './Multivalue.types';

const normalizePercent = (value: number): number => {
  if (value < 0) {
    return 0;
  }
  if (value > 100) {
    return 100;
  }
  return value;
};

const Multivalue = ({
  values,
  stackedBars = true,
  ...htmlAttributes
}: MultivalueProps) => {
  const finalValues = useMemo(
    () =>
      stackedBars
        ? values.sort((a, b) => {
            return b.percent - a.percent;
          })
        : values,
    [stackedBars, values],
  );
  return (
    <S.Container stackedBars={stackedBars} {...htmlAttributes}>
      {finalValues.map((val, index) => (
        <S.Multivalue
          key={`${val.color}-${val.percent}-${index}`}
          color={val.color}
          percent={normalizePercent(val.percent)}
        />
      ))}
    </S.Container>
  );
};

export default Multivalue;
