import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import { generateUuid } from '@synerise/ds-utils';

import { getDefaultTexts } from '../../../../utils';
import * as S from '../../../RangeFilter.styles';
import { AddButton } from '../../../Shared';
import type { DateLimitMode } from '../../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import RangeFormContainer from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer';
import type { DateValue } from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer.types';
import { getDefaultFilterForLimitMode } from '../../../Shared/TimeWindow/utils';
import {
  DEFAULT_MAX_ENTRIES,
  DEFAULT_RANGE_END,
  DEFAULT_RANGE_START,
  DEFAULT_TIME_FORMAT,
  EMPTY_OBJECT,
  NOOP,
  RENDER_EMPTY_NODE_FN,
} from '../constants';
import type { DailyProps, DailySchedule } from './Daily.types';

const NO_ROWS: DailySchedule[] = [];

const Daily = ({
  maxEntries = DEFAULT_MAX_ENTRIES,
  disabled,
  value: valueProp,
  onChange = NOOP,
  valueSelectionMode = ['Hour', 'Range'],
  timeFormat,
  timePickerProps,
  texts,
  errorTexts = [],
}: DailyProps) => {
  const value = Array.isArray(valueProp) ? valueProp : NO_ROWS;
  const intl = useIntl();

  const allTexts = React.useMemo(
    () => getDefaultTexts(intl, false, texts),
    [texts, intl],
  );

  const defaultDayValue = useMemo(
    () => ({
      start: DEFAULT_RANGE_START,
      stop: DEFAULT_RANGE_END,
      restricted: false,
      display: false,
      inverted: false,
      mode: valueSelectionMode[0],
    }),
    [valueSelectionMode],
  );
  const [rowKeys, setRowKeys] = useState(() => value.map(() => generateUuid()));
  if (rowKeys.length !== value.length) {
    setRowKeys(value.map((_, index) => rowKeys[index] ?? generateUuid()));
  }

  const updateRow = useCallback(
    (index: number, update: (row: DailySchedule) => DailySchedule): void => {
      onChange(value.map((row, i) => (i === index ? update(row) : row)));
    },
    [value, onChange],
  );
  const handleDayTimeChange = useCallback(
    (dateValueArray: DateValue, index: number): void => {
      updateRow(index, (row) => ({
        ...row,
        restricted: true,
        start: dayjs(dateValueArray[0]).format(DEFAULT_TIME_FORMAT),
        stop: dayjs(dateValueArray[1]).format(DEFAULT_TIME_FORMAT),
        inverted: Boolean(dateValueArray[2]),
      }));
    },
    [updateRow],
  );
  const getDayValue = useCallback(
    (index?: number): DailySchedule => {
      if (typeof index === 'number' && value[index]) {
        return value[index];
      }
      return defaultDayValue;
    },
    [value, defaultDayValue],
  );
  const handleModeChange = useCallback(
    (selectedMode: DateLimitMode, index: number): void => {
      updateRow(index, (row) => ({
        ...row,
        ...getDefaultFilterForLimitMode(selectedMode),
        mode: selectedMode,
      }));
    },
    [updateRow],
  );
  const handleRangeDelete = useCallback(
    (index: number): void => {
      setRowKeys(rowKeys.filter((_, i) => i !== index));
      onChange(value.filter((_, i) => i !== index));
    },
    [rowKeys, value, onChange],
  );
  const handleRangeAdd = useCallback((): void => {
    onChange([...value, getDayValue()]);
  }, [onChange, value, getDayValue]);
  return (
    <S.NewFilterContainer>
      {value.map((_, index) => (
        <RangeFormContainer
          disabled={disabled}
          days={EMPTY_OBJECT}
          onChange={NOOP}
          errorTexts={errorTexts[index]}
          onMultipleDayTimeChange={NOOP}
          key={rowKeys[index]}
          onDayTimeChange={(dateValueArray): void => {
            handleDayTimeChange(dateValueArray, index);
          }}
          dayKeys={[0]}
          texts={allTexts}
          activeDays={[0]}
          getDayValue={(): DailySchedule => getDayValue(index)}
          onRangeDelete={
            disabled ? undefined : (): void => handleRangeDelete(index)
          }
          onModeChange={(mode): void => handleModeChange(mode, index)}
          valueSelectionModes={valueSelectionMode}
          renderSuffix={RENDER_EMPTY_NODE_FN}
          getDayLabel={RENDER_EMPTY_NODE_FN}
          timeFormat={timeFormat}
          timePickerProps={timePickerProps}
          hideHeader
        />
      ))}
      {value.length < maxEntries && !disabled && (
        <AddButton label={allTexts.addTime} onClick={handleRangeAdd} />
      )}
    </S.NewFilterContainer>
  );
};
export default Daily;
