import * as React from 'react';
import { ValuesProps } from './Values.types';
import * as S from '../../Collector.styles';

const Values: React.FC<ValuesProps> = ({ values, onDeselect, disabled, focused, displayLookupKey }: ValuesProps) => {
  return (
    <>
      {values.map((val, index) => (
        <S.CollectorValue
          // eslint-disable-next-line react/no-array-index-key
          key={`${val}-${index}`}
          onRemoveClick={(): void => {
            onDeselect && onDeselect(val);
          }}
          value={val[displayLookupKey]}
          focused={focused}
          disabled={disabled}
        />
      ))}
    </>
  );
};

export default Values;
