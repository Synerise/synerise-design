import * as React from 'react';
import * as S from '../../RelativeRangePicker.styles';
import * as CONST from '../../../constants';
import { Props } from './RangeButtons.types';
import { isAbsolute } from '../../utils';

const RangeButtons: React.FC<Props> = ({ ranges, currentRange, value, intl, onChange }: Props) => {
  return (
    <>
      {ranges.map(range => (
        <S.Range
          key={range.key || range.id}
          onClick={(): void => {
            onChange && onChange(range);
          }}
          type={
            (currentRange && currentRange.key === range.key && value.type === CONST.RELATIVE) ||
            (isAbsolute(currentRange) && range.key !== 'ALL_TIME')
              ? 'primary'
              : 'tertiary'
          }
        >
          {range.translationKey ? intl.formatMessage({ id: range.translationKey }) : range.key}
        </S.Range>
      ))}
    </>
  );
};

export default RangeButtons;
