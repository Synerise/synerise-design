import React from 'react';

import * as S from '../../Collector.styles';
import { type ValuesProps } from './Values.types';

const Values = ({
  values,
  onDeselect,
  disabled,
  focused,
  displayLookupKey,
}: ValuesProps) => {
  return (
    <>
      {values.map((val, index) => (
        <S.CollectorValue
          key={`${val}-${index}`}
          onRemoveClick={() => {
            onDeselect && onDeselect(val);
          }}
          value={val[displayLookupKey]}
          focused={focused}
          disabled={disabled}
          hasError={val.hasError}
        />
      ))}
    </>
  );
};

export default Values;
