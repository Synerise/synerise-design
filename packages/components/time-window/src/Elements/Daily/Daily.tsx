import * as React from 'react';
import RangeFormContainer from '@synerise/ds-date-range-picker/dist/RangeFilter/Shared/TimeWindow/RangeFormContainer/RangeFormContainer';
import * as dayjs from 'dayjs';
import {
  DEFAULT_RANGE_END,
  DEFAULT_RANGE_START,
  TIME_FORMAT,
} from '@synerise/ds-date-range-picker/dist/RangeFilter/constants';
import AddButton from '@synerise/ds-date-range-picker/dist/RangeFilter/Shared/AddButton/AddButton';
import { DateLimitMode } from '@synerise/ds-date-range-picker/dist/RangeFilter/Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import * as S from '../../TimeWindow.styles';
import { DailyProps, DailySchedule } from './Daily.types';

const MAX_RANGES = 4;
const Daily: React.FC<DailyProps> = ({ valueSelectionMode = ['Hour', 'Range'] }) => {
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
        start: dayjs(value[0]).format(TIME_FORMAT),
        stop: dayjs(value[1]).format(TIME_FORMAT),
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
  console.log('schedule',schedule)
  return (
    <S.Wrapper>
      {schedule.map((s, index) => (
        <RangeFormContainer
          key={`schedule-range-${index}`}
          onDayTimeChange={(value): void => {
            handleDayTimeChange(value, index);
          }}
          texts={{}}
          activeDays={[0]}
          getDayValue={(): DailySchedule => getDayValue(index)}
          onRangeDelete={(): void => handleRangeDelete(index)}
          onModeChange={(mode): void => handleModeChange(mode, index)}
          valueSelectionModes={valueSelectionMode}
          renderSuffix={()=>null}
          hideHeader
        />
      ))}
      {schedule.length < MAX_RANGES && (
        <AddButton
          label="Add range"
          onClick={() => {
            setSchedule([...schedule, getDayValue()]);
          }}
        />
      )}
    </S.Wrapper>
  );
};
export default Daily;
