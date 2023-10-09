import React, { useMemo, useCallback } from 'react';
import dayjs from 'dayjs';
import { useIntl } from 'react-intl';
import {
  DEFAULT_RANGE_END,
  DEFAULT_RANGE_START,
  DEFAULT_TIME_FORMAT,
  DEFAULT_MAX_ENTRIES,
  NOOP,
  EMPTY_OBJECT,
  RENDER_EMPTY_NODE_FN,
} from '../constants';
import * as S from '../../../RangeFilter.styles';
import { DailyProps, DailySchedule } from './Daily.types';
import RangeFormContainer from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer';
import { AddButton } from '../../../Shared';
import { DateLimitMode } from '../../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import type { DateValue } from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer.types';

const Daily = ({
  maxEntries = DEFAULT_MAX_ENTRIES,
  disabled,
  value = [],
  onChange = NOOP,
  valueSelectionMode = ['Hour', 'Range'],
  timeFormat,
  timePickerProps,
}: DailyProps) => {
  const intl = useIntl();
  const defaultDayValue = useMemo(
    () => ({
      start: DEFAULT_RANGE_START,
      stop: DEFAULT_RANGE_END,
      restricted: false,
      display: false,
      inverted: false,
      mode: valueSelectionMode[0],
    }),
    [valueSelectionMode]
  );
  const handleDayTimeChange = useCallback(
    (dateValueArray: DateValue, index: number): void => {
      const updatedSchedule = value;
      updatedSchedule[index] = {
        ...value[index],
        restricted: true,
        start: dayjs(dateValueArray[0]).format(DEFAULT_TIME_FORMAT),
        stop: dayjs(dateValueArray[1]).format(DEFAULT_TIME_FORMAT),
        inverted: Boolean(dateValueArray[2]),
      };
      onChange([...updatedSchedule]);
    },
    [value, onChange]
  );
  const getDayValue = useCallback(
    (index?: number): DailySchedule => {
      if (typeof index === 'number' && !!value[index]) {
        return value[index];
      }
      return defaultDayValue;
    },
    [value, defaultDayValue]
  );
  const handleModeChange = useCallback(
    (selectedMode: DateLimitMode, elementIndex: number): void => {
      const updatedSchedule = value;
      updatedSchedule[elementIndex] = {
        ...value[elementIndex],
        mode: selectedMode,
      };
    },
    [value]
  );
  const handleRangeDelete = useCallback(
    (index: number): void => {
      const updatedSchedule = value;
      delete updatedSchedule[index];
      onChange(updatedSchedule.filter(s => Boolean(s)));
    },
    [value, onChange]
  );
  const handleRangeAdd = useCallback((): void => {
    onChange([...value, getDayValue()]);
  }, [onChange, value, getDayValue]);
  return (
    <S.NewFilterContainer>
      {!!value &&
        value.map((s, index) => (
          <RangeFormContainer
            disabled={disabled}
            days={EMPTY_OBJECT}
            onChange={NOOP}
            onMultipleDayTimeChange={NOOP}
            // eslint-disable-next-line react/no-array-index-key
            key={`range-${index}-${String(s?.start)}`}
            onDayTimeChange={(dateValueArray): void => {
              handleDayTimeChange(dateValueArray, index);
            }}
            dayKeys={[0]}
            texts={EMPTY_OBJECT}
            activeDays={[0]}
            getDayValue={(): DailySchedule => getDayValue(index)}
            onRangeDelete={disabled ? undefined : (): void => handleRangeDelete(index)}
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
        <AddButton
          label={intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.ADD-TIME', defaultMessage: 'Add range' })}
          onClick={handleRangeAdd}
        />
      )}
    </S.NewFilterContainer>
  );
};
export default Daily;
