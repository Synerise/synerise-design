import * as React from 'react';
import { Range } from '../ColumnManagerGroupSettings';
import * as S from './RangesForm.styles';
import RangeRow from './RangeRow';
import { ColumnType } from '../../ColumnManagerItem/ColumManagerIte.types';

interface Props {
  ranges: Range[];
  setRanges: (ranges: Range[]) => void;
  type: ColumnType;
}

const RangesForm: React.FC<Props> = ({ ranges, setRanges, type }: Props): JSX.Element => {
  const setRange = React.useCallback(
    (range: Range, index: number): void => {
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
          <RangeRow
            key={JSON.stringify(range)}
            first={index === 0}
            range={range}
            setRange={setRange}
            index={index}
            type={type}
          />
        )
      )}
    </S.RangesForm>
  );
};

export default RangesForm;
