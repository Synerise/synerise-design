import React from 'react';

import { findMatchingPreset } from '../../../RelativeRangePicker/utils';
import { ALL_TIME } from '../../../constants';
import * as S from '../../RelativeRangePicker.styles';
import { isLifetime } from '../RangeDropdown/RangeDropdown';
import { type Props } from './RangeButtons.types';

const RangeButtons = ({ ranges, currentRange, texts, onChange }: Props) => {
  const matchingPreset = findMatchingPreset(currentRange);
  return (
    <>
      {ranges.map((range) => (
        <S.Range
          data-testid={`relative-range-preset-${range.key || range.id}`}
          key={range.key || range.id}
          onClick={(): void => {
            onChange && onChange(range);
          }}
          activated={
            (matchingPreset && matchingPreset.key === range.key) ||
            (isLifetime(currentRange) && range.key === ALL_TIME)
          }
        >
          {range.translationKey ? texts[range.translationKey] : texts?.custom}
        </S.Range>
      ))}
    </>
  );
};

export default RangeButtons;
