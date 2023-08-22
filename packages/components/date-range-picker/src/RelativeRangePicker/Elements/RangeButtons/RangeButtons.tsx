import * as React from 'react';
import * as S from '../../RelativeRangePicker.styles';
import { Props } from './RangeButtons.types';

const RangeButtons: React.FC<Props> = ({ ranges, currentRange, texts, onChange }: Props) => {
  return (
    <>
      {ranges.map(range => (
        <S.Range
          data-testid={`relative-range-preset-${range.key || range.id}`}
          key={range.key || range.id}
          onClick={(): void => {
            onChange && onChange(range);
          }}
          type={currentRange && currentRange.key === range.key ? 'primary' : 'tertiary'}
        >
          {range.translationKey ? texts[range.translationKey] : texts?.custom}
        </S.Range>
      ))}
    </>
  );
};

export default RangeButtons;
