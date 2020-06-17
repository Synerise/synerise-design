import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { GroupSettingsTexts, Range } from '../ColumnManagerGroupSettings.types';
import * as S from './RangesForm.styles';
import RangeRow from './RangeRow';
import { ColumnType } from '../../ColumnManagerItem/ColumManagerItem.types';

interface RangeFormProps {
  ranges: Range[];
  setRanges: (ranges: Range[]) => void;
  type: ColumnType;
  texts: {
    [k in GroupSettingsTexts]: string | React.ReactNode;
  };
}

const RangesForm: React.FC<RangeFormProps> = ({ ranges, setRanges, type, texts }: RangeFormProps): JSX.Element => {
  const setRange = React.useCallback(
    (range: Range, index: number): void => {
      const updatedRanges = ranges.map((currentRange: Range, i: number) => {
        if (i === index) {
          return range;
        }
        return currentRange;
      });

      setRanges(updatedRanges);
    },
    [setRanges, ranges]
  );

  const remove = (rangeIndex: number): void => {
    setRanges(ranges.filter((range, index) => index !== rangeIndex));
  };
  return (
    <S.RangesForm>
      {ranges.map(
        (range: Range, index: number): JSX.Element => (
          <RangeRow
            key={uuid()}
            first={index === 0}
            range={range}
            setRange={setRange}
            index={index}
            type={type}
            remove={remove}
            texts={texts}
          />
        )
      )}
    </S.RangesForm>
  );
};

export default RangesForm;
