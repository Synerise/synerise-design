import * as React from 'react';
import * as dayjs from 'dayjs';
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

const Daily: React.FC<DailyProps> = ({ valueSelectionMode = ['Hour', 'Range'], timeFormat, timePickerProps }) => {
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
  const [schedule, setSchedule] = React.useState<DailySchedule[]>([defaultDayValue]);

  const handleDayTimeChange = React.useCallback(
    (value: [Date, Date], index: number): void => {
      const updatedSchedule = schedule;
      updatedSchedule[index] = {
        ...schedule[index],
        restricted: true,
        start: dayjs(value[0]).format(DEFAULT_TIME_FORMAT),
        stop: dayjs(value[1]).format(DEFAULT_TIME_FORMAT),
      };
    },
    [schedule]
  );
  const getDayValue = React.useCallback(
    (index?: number): DailySchedule => {
      if (typeof index === 'number' && !!schedule[index]) {
        return schedule[index];
      }
      return defaultDayValue;
    },
    [schedule, defaultDayValue]
  );
  const handleModeChange = React.useCallback(
    (selectedMode: DateLimitMode, elementIndex: number): void => {
      const updatedSchedule = schedule;
      updatedSchedule[elementIndex] = {
        ...schedule[elementIndex],
        mode: selectedMode,
      };
    },
    [schedule]
  );
  const handleRangeDelete = React.useCallback(
    (index: number): void => {
      const updatedSchedule = schedule;
      delete updatedSchedule[index];
      setSchedule(updatedSchedule.filter(s => Boolean(s)));
    },
    [schedule]
  );
  return (
    <S.NewFilterContainer>
      {schedule.map((s, index) => (
        <RangeFormContainer
          days={EMPTY_OBJECT}
          onChange={NOOP}
          onMultipleDayTimeChange={NOOP}
          // eslint-disable-next-line react/no-array-index-key
          key={`range-${index}-${String(s?.start)}`}
          onDayTimeChange={(value): void => {
            handleDayTimeChange(value, index);
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
      {schedule.length < MAX_RANGES && (
        <AddButton
          label="Add range"
          onClick={(): void => {
            setSchedule([...schedule, getDayValue()]);
          }}
        />
      )}
    </S.NewFilterContainer>
  );
};
export default Daily;
