import * as React from 'react';
import { Input } from '@synerise/ds-input';
import { Range } from '../ColumnManagerGroupSettings';
import * as S from './RangesForm.styles';

interface Props {
  index: number;
  range: Range;
  first: boolean;
  setRange: (range: Range, index: number) => void;
}

const RangeRow: React.FC<Props> = ({ range, setRange, index, first }: Props) => {
  const [from, setFrom] = React.useState<React.ReactText | undefined>(range.from);
  const [to, setTo] = React.useState<React.ReactText | undefined>(range.to);

  const handleBlur = React.useCallback((): void => {
    setRange({ from, to }, index);
  }, [from, to, setRange, index]);

  return (
    <S.RangeRow>
      <Input
        label={first ? 'From' : null}
        resetMargin
        value={from}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setFrom(event.target.value)}
        onBlur={handleBlur}
      />
      <Input
        label={first ? 'To' : null}
        resetMargin
        value={to}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setTo(event.target.value)}
        onBlur={handleBlur}
      />
    </S.RangeRow>
  );
};

export default RangeRow;
