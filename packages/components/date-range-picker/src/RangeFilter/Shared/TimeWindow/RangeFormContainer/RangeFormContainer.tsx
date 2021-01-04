import * as React from 'react';
import { RangeFormContainerProps } from './RangeFormContainer.types';
import RangeForm from './RangeForm/RangeForm';
import { getDateFromDayValue } from '../utils';
import { DayKey } from '../TimeWindow.types';
import { Header } from '../Header/Header';
import RangeSummary from '../RangeSummary/RangeSummary';
import RangeActions from '../RangeActions/RangeActions';
import { DateLimitMode } from './RangeForm/RangeForm.types';
import { ActionsTexts } from '../RangeActions/RangeActions.types';

const DEFAULT_LIMIT_MODE: DateLimitMode = 'Range';
const RangeFormContainer: React.FC<RangeFormContainerProps> = ({
  activeDays,
  days,
  dayKeys,
  getDayValue,
  getDayLabel,
  onDayTimeChange,
  onMultipleDayTimeChange,
  hideHeader,
  monthlyFilter,
  monthlyFilterPeriod,
  onRangeClear,
  onRangePaste,
  onRangeCopy,
  onRangeDelete,
  texts,
  onChange,
}) => {
  const dayValue = getDayValue(activeDays[0]);
  const [mode, setMode] = React.useState<DateLimitMode>(dayValue?.mode || DEFAULT_LIMIT_MODE);
  const handleModeChange = React.useCallback(
    (selectedMode: DateLimitMode) => {
      const updatedDays = {};
      activeDays.forEach(k => {
        updatedDays[k] = {
          ...days[k],
          mode: selectedMode,
        };
      });
      onChange({ ...days, ...updatedDays });
    },
    [onChange, days, activeDays]
  );
  React.useEffect((): void => {
    setMode(dayValue?.mode || DEFAULT_LIMIT_MODE);
  }, [dayValue]);
  const rangeForm = React.useMemo(
    () => (
      <RangeForm
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        texts={texts as any}
        onModeChange={(selected: DateLimitMode): void => {
          setMode(selected);
          handleModeChange(selected);
        }}
        mode={mode}
        startDate={getDateFromDayValue(dayValue.start as string)}
        endDate={getDateFromDayValue(dayValue.stop as string)}
        onStartChange={(value: Date): void =>
          activeDays.length > 1
            ? onMultipleDayTimeChange([value, getDateFromDayValue(dayValue.stop as string)])
            : onDayTimeChange([value, getDateFromDayValue(dayValue.stop as string)], dayKeys as DayKey)
        }
        onEndChange={(value: Date): void =>
          activeDays.length > 1
            ? onMultipleDayTimeChange([getDateFromDayValue(dayValue.start as string), value])
            : onDayTimeChange([getDateFromDayValue(dayValue.start as string), value], dayKeys as DayKey)
        }
        onExactHourSelect={(value: Date): void => {
          activeDays.length > 1
            ? onMultipleDayTimeChange([value, value])
            : onDayTimeChange([value, value], dayKeys as DayKey);
        }}
        onRangeDelete={onRangeDelete}
      />
    ),
    [
      handleModeChange,
      activeDays,
      onMultipleDayTimeChange,
      onDayTimeChange,
      mode,
      dayValue,
      dayKeys,
      onRangeDelete,
      texts,
    ]
  );
  if (hideHeader) return rangeForm;
  return (
    <>
      <Header
        title={
          <RangeSummary
            dayKeys={dayKeys as DayKey[]}
            getDayLabel={getDayLabel}
            monthlyFilter={monthlyFilter}
            monthlyFilterPeriod={monthlyFilterPeriod}
          />
        }
        suffix={
          <RangeActions
            onRangeClear={onRangeClear}
            onRangeCopy={onRangeCopy}
            onRangePaste={onRangePaste}
            texts={texts as ActionsTexts}
          />
        }
      />
      {rangeForm}
    </>
  );
};

export default RangeFormContainer;
