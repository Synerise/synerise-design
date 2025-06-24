import React from 'react';
import { ValuesProps } from './Values.types';
import * as S from '../../Collector.styles';

export const Values = ({ values, onDeselect, disabled, focused, displayLookupKey }: ValuesProps) => {
  return (
    <>
      {values.map((val, index) => (
        <S.CollectorValue
          // eslint-disable-next-line react/no-array-index-key
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
