import React, { ReactNode, useCallback, useState } from 'react';
import Icon, { CloseS } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';

import Tooltip from '@synerise/ds-tooltip';
import { ColumnType } from '../../ColumnManagerItem/ColumManagerItem.types';
import * as S from './RangesForm.styles';
import { GroupSettingsTexts, Range } from '../ColumnManagerGroupSettings.types';
import RangeInput from './RangeInput';

interface RangeRowProps {
  index: number;
  range: Range;
  first: boolean;
  setRange: (range: Range, index: number) => void;
  type: ColumnType;
  remove: (index: number) => void;
  texts: {
    [k in GroupSettingsTexts]: string | ReactNode;
  };
}

const RangeRow = ({ range, setRange, index, first, type, remove, texts }: RangeRowProps) => {
  const [from, setFrom] = useState<string | number | null | undefined>(range.from.value);
  const [to, setTo] = useState<string | number | null | undefined>(range.to.value);

  const handleBlur = useCallback((): void => {
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
  }, [from, to, setRange, index, range]);

  const handleRemove = useCallback((): void => {
    remove(index);
  }, [remove, index]);

  return (
    <S.RangeRow first={first} data-testid="group-range-row">
      <S.RangeRowInputs>
        <RangeInput
          type={type}
          label={first ? texts.from : null}
          value={from}
          errorText={range.from.error}
          onChange={(value: string | number | null | undefined): void => setFrom(value)}
          onBlur={handleBlur}
        />
        <RangeInput
          type={type}
          label={first ? texts.to : null}
          value={to}
          errorText={range.to.error}
          onChange={(value: string | number | null | undefined): void => setTo(value)}
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
