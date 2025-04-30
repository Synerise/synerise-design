import React from 'react';
import * as S from '../../RelativeRangePicker.styles';
import { Props } from './RangeButtons.types';
import { isLifetime } from '../RangeDropdown/RangeDropdown';
import { ALL_TIME } from '../../../constants';
import { findMatchingPreset } from '../../utils';

const RangeButtons = ({ ranges, currentRange, texts, onChange }: Props) => {
  const matchingPreset = findMatchingPreset(currentRange);
  return (
    <>
      {ranges.map(range => (
        <S.Range
          data-testid={`relative-range-preset-${range.key || range.id}`}
          key={range.key || range.id}
          onClick={(): void => {
            onChange && onChange(range);
          }}
          activated={
            (matchingPreset && matchingPreset.key === range.key) || (isLifetime(currentRange) && range.key === ALL_TIME)
          }
        >
          {range.translationKey ? texts[range.translationKey] : texts?.custom}
        </S.Range>
      ))}
    </>
  );
};

export default RangeButtons;
