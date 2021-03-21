import * as React from 'react';
import * as dayjs from 'dayjs';
import { useIntl } from 'react-intl';
import {
  DEFAULT_RANGE_END,
  DEFAULT_RANGE_START,
  DEFAULT_TIME_FORMAT,
  MAX_RANGES,
  NOOP,
  EMPTY_OBJECT,
  RENDER_EMPTY_NODE_FN,
} from '../constants';
import * as S from '../../../RangeFilter.styles';
import { DailyProps, DailySchedule } from './Daily.types';
import RangeFormContainer from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer';
import { AddButton } from '../../../Shared';
import { DateLimitMode } from '../../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';

const Daily: React.FC<DailyProps> = ({
  value = [],
  onChange = NOOP,
  valueSelectionMode = ['Hour', 'Range'],
  timeFormat,
  timePickerProps,
}) => {
  const intl = useIntl();
  const defaultDayValue = React.useMemo(
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
  const handleDayTimeChange = React.useCallback(
    (dateValueArray: [Date, Date], index: number): void => {
      const updatedSchedule = value;
      updatedSchedule[index] = {
        ...value[index],
        restricted: true,
        start: dayjs(dateValueArray[0]).format(DEFAULT_TIME_FORMAT),
        stop: dayjs(dateValueArray[1]).format(DEFAULT_TIME_FORMAT),
      };
    },
    [value]
  );
  const getDayValue = React.useCallback(
    (index?: number): DailySchedule => {
      if (typeof index === 'number' && !!value[index]) {
        return value[index];
      }
      return defaultDayValue;
    },
    [value, defaultDayValue]
  );
  const handleModeChange = React.useCallback(
    (selectedMode: DateLimitMode, elementIndex: number): void => {
      const updatedSchedule = value;
      updatedSchedule[elementIndex] = {
        ...value[elementIndex],
        mode: selectedMode,
      };
    },
    [value]
  );
  const handleRangeDelete = React.useCallback(
    (index: number): void => {
      const updatedSchedule = value;
      delete updatedSchedule[index];
      onChange(updatedSchedule.filter(s => Boolean(s)));
    },
    [value, onChange]
  );
  const handleRangeAdd = React.useCallback((): void => {
    onChange([...value, getDayValue()]);
  }, [onChange, value, getDayValue]);
  return (
    <S.NewFilterContainer>
      {!!value &&
        value.map((s, index) => (
          <RangeFormContainer
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
            onRangeDelete={(): void => handleRangeDelete(index)}
            onModeChange={(mode): void => handleModeChange(mode, index)}
            valueSelectionModes={valueSelectionMode}
            renderSuffix={RENDER_EMPTY_NODE_FN}
            getDayLabel={RENDER_EMPTY_NODE_FN}
            timeFormat={timeFormat}
            timePickerProps={timePickerProps}
            hideHeader
          />
        ))}
      {value.length < MAX_RANGES && (
        <AddButton
          label={intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.ADD-TIME', defaultMessage: 'Add range' })}
          onClick={handleRangeAdd}
        />
      )}
    </S.NewFilterContainer>
  );
};
export default Daily;
