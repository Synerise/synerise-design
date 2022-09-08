import * as React from 'react';
import RangeForm from './RangeForm/RangeForm';
import { getDateFromDayValue, getDefaultFilterForLimitMode } from '../utils';
import { DayKey } from '../TimeWindow.types';
import { Header } from '../Header/Header';
import RangeSummary from '../RangeSummary/RangeSummary';
import RangeActions from '../RangeActions/RangeActions';
import { DateLimitMode } from './RangeForm/RangeForm.types';
import { ActionsTexts } from '../RangeActions/RangeActions.types';
import { Texts } from '../../../../DateRangePicker.types';
import { DEFAULT_LIMIT_MODE } from '../TimeWindow';
import type { RangeFormContainerProps, DateValue } from './RangeFormContainer.types';

const RangeFormContainer: React.FC<RangeFormContainerProps> = ({
  activeDays,
  disabled,
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
  texts = {},
  onChange,
  valueSelectionModes = ['Range', 'Hour'],
  onModeChange,
  timePickerProps,
  renderSuffix,
  timeFormat,
}) => {
  const dayValue = React.useMemo(() => getDayValue(activeDays[0]), [getDayValue, activeDays]);

  const [mode, setMode] = React.useState<DateLimitMode>(dayValue?.mode || valueSelectionModes[0] || DEFAULT_LIMIT_MODE);

  const handleModeChange = React.useCallback(
    (selectedMode: DateLimitMode) => {
      if (onModeChange) {
        onModeChange(selectedMode);
        return;
      }
      const updatedDays = {};
      activeDays.forEach(i => {
        updatedDays[i] = {
          ...days[i],
          ...getDefaultFilterForLimitMode(selectedMode),
          mode: selectedMode,
        };
      });
      onChange({ ...days, ...updatedDays });
    },
    [onChange, days, activeDays, onModeChange]
  );
  React.useEffect((): void => {
    setMode(dayValue?.mode || valueSelectionModes[0] || DEFAULT_LIMIT_MODE);
  }, [dayValue, valueSelectionModes]);

  const onStartChange = React.useCallback(
    (start?: Date): void => {
      const end = dayValue.stop;
      const value: DateValue = [start, end ? getDateFromDayValue(end, timeFormat) : undefined];

      if (activeDays.length > 1) {
        onMultipleDayTimeChange(value);
      } else {
        onDayTimeChange(value, dayKeys as DayKey);
      }
    },
    [activeDays, onMultipleDayTimeChange, onDayTimeChange, timeFormat, dayValue, dayKeys]
  );

  const onEndChange = React.useCallback(
    (end?: Date): void => {
      const { start } = dayValue;
      const value: DateValue = [start ? getDateFromDayValue(dayValue.start, timeFormat) : undefined, end];

      if (activeDays.length > 1) {
        onMultipleDayTimeChange(value);
      } else {
        onDayTimeChange(value, dayKeys as DayKey);
      }
    },
    [activeDays, onMultipleDayTimeChange, onDayTimeChange, timeFormat, dayValue, dayKeys]
  );

  const onExactHourSelect = React.useCallback(
    (value?: Date): void => {
      if (activeDays.length > 1) {
        onMultipleDayTimeChange([value, value]);
      } else {
        onDayTimeChange([value, value], dayKeys as DayKey);
      }
    },
    [activeDays, onMultipleDayTimeChange, onDayTimeChange, dayKeys]
  );

  const rangeForm = React.useMemo(
    () => (
      <RangeForm
        disabled={disabled}
        texts={texts as Texts}
        onModeChange={(selected: DateLimitMode): void => {
          setMode(selected);
          handleModeChange(selected);
        }}
        mode={mode}
        startDate={dayValue?.start ? getDateFromDayValue(dayValue.start as string, timeFormat) : undefined}
        endDate={dayValue?.stop ? getDateFromDayValue(dayValue.stop as string, timeFormat) : undefined}
        onStartChange={onStartChange}
        onEndChange={onEndChange}
        onExactHourSelect={onExactHourSelect}
        onRangeDelete={onRangeDelete}
        valueSelectionModes={valueSelectionModes}
        timePickerProps={timePickerProps}
      />
    ),
    [
      timeFormat,
      valueSelectionModes,
      handleModeChange,
      mode,
      disabled,
      dayValue,
      onRangeDelete,
      texts,
      timePickerProps,
      onStartChange,
      onEndChange,
      onExactHourSelect,
    ]
  );
  const suffix = React.useMemo(() => {
    return renderSuffix ? (
      renderSuffix()
    ) : (
      <RangeActions
        onRangeClear={onRangeClear}
        onRangeCopy={onRangeCopy}
        onRangePaste={onRangePaste}
        texts={texts as ActionsTexts}
      />
    );
  }, [onRangePaste, onRangeClear, onRangeCopy, texts, renderSuffix]);
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
        suffix={suffix}
      />
      {rangeForm}
    </>
  );
};

export default RangeFormContainer;
