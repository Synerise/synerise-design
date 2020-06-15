import * as React from 'react';
import { CloseS } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Icon from '@synerise/ds-icon';
import Tooltip from '@synerise/ds-tooltip';
import { ColumnType } from '../../ColumnManagerItem/ColumManagerItem.types';
import * as S from './RangesForm.styles';
import { Range } from '../ColumnManagerGroupSettings';
import { Texts } from '../../ColumnManager.types';
import RangeInput from './RangeInput';

interface Props {
  index: number;
  range: Range;
  first: boolean;
  setRange: (range: Range, index: number) => void;
  type: ColumnType;
  remove: (index: number) => void;
  texts: {
    [k in Texts]: string | React.ReactNode;
  };
}

const RangeRow: React.FC<Props> = ({ range, setRange, index, first, type, remove, texts }: Props) => {
  const [from, setFrom] = React.useState<React.ReactText | undefined>(range.from.value);
  const [to, setTo] = React.useState<React.ReactText | undefined>(range.to.value);

  const handleBlur = React.useCallback((): void => {
    setRange(
      {
        from: {
          ...range.from,
          value: from,
        },
        to: {
          ...range.to,
          value: to,
        },
      },
      index
    );
  }, [from, to, setRange, index]);

  const handleRemove = React.useCallback((): void => {
    remove(index);
  }, [remove, index]);

  return (
    <S.RangeRow first={first}>
      <S.RangeRowInputs>
        <RangeInput
          type={type}
          label={first ? texts.from : null}
          value={from}
          error={range.from.error}
          onChange={(value: React.ReactText): void => setFrom(value)}
          onBlur={handleBlur}
        />
        <RangeInput
          type={type}
          label={first ? texts.to : null}
          value={to}
          error={range.to.error}
          onChange={(value: React.ReactText): void => setTo(value)}
          onBlur={handleBlur}
        />
      </S.RangeRowInputs>
      {!first && (
        <Tooltip title={texts.remove}>
          <S.IconWrapper>
            <Icon onClick={handleRemove} component={<CloseS />} color={theme.palette['red-600']} />
          </S.IconWrapper>
        </Tooltip>
      )}
    </S.RangeRow>
  );
};

export default RangeRow;
