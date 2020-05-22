import * as React from 'react';
import { Range } from '../ColumnManagerGroupSettings';
import * as S from './RangesForm.styles';
import RangeRow from './RangeRow';

interface Props {
  ranges: Range[];
  setRanges: (ranges: Range[]) => void;
}

const RangesForm: React.FC<Props> = ({ ranges, setRanges }: Props): JSX.Element => {
  const setRange = React.useCallback(
    (range: Range, index: number): void => {
      console.log(range, index);
      const updatedRanges = ranges.map((currentRange: Range, i: number) => {
        if (i === index) {
          return range;
        }
        return currentRange;
      });

      console.log(updatedRanges);
      setRanges(updatedRanges);
    },
    [setRanges, ranges]
  );

  return (
    <S.RangesForm>
      {ranges.map(
        (range: Range, index: number): JSX.Element => (
          <RangeRow key={JSON.stringify(range)} first={index === 0} range={range} setRange={setRange} index={index} />
        )
      )}
    </S.RangesForm>
  );
};

export default RangesForm;
