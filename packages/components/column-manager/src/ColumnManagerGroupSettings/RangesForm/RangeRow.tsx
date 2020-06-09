import * as React from 'react';
import { MaskedInput } from '@synerise/ds-input';
import { Range } from '../ColumnManagerGroupSettings';
import * as S from './RangesForm.styles';
import { ColumnType } from '../../ColumnManagerItem/ColumManagerIte.types';

interface Props {
  index: number;
  range: Range;
  first: boolean;
  setRange: (range: Range, index: number) => void;
  type: ColumnType;
}

const RangeRow: React.FC<Props> = ({ range, setRange, index, first, type }: Props) => {
  const [from, setFrom] = React.useState<React.ReactText | undefined>(range.from);
  const [to, setTo] = React.useState<React.ReactText | undefined>(range.to);

  const handleBlur = React.useCallback((): void => {
    setRange({ from, to }, index);
  }, [from, to, setRange, index]);

  const inputMask = React.useMemo(() => {
    switch (type) {
      case 'number':
        return '111111111111';
      case 'text':
        return 'B';
      default:
        return '1';
    }
  }, [type]);

  return (
    <S.RangeRow>
      <MaskedInput
        mask={inputMask}
        label={first ? 'From' : null}
        formatCharacters={{
          B: {
            validate: (char: string): boolean => /\*|[a-z]|[A-Z]/.test(char),
          },
          D: {
            validate: (char: string): boolean => /\*|\d/.test(char),
          },
        }}
        resetMargin
        value={from}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setFrom(event.target.value)}
        onBlur={handleBlur}
      />
      <MaskedInput
        mask={inputMask}
        formatCharacters={{
          B: {
            validate: (char: string): boolean => /\*|[a-z]|[A-Z]/.test(char),
          },
          D: {
            validate: (char: string): boolean => /\*|\d/.test(char),
          },
        }}
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
