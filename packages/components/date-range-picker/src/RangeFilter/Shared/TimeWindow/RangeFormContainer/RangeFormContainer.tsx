import * as React from 'react';
import { RangeFormContainerProps } from './RangeFormContainer.types';
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
  const dayValue = getDayValue(activeDays[0]);
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
        onStartChange={(value: Date): void =>
          activeDays.length > 1
            ? onMultipleDayTimeChange([value, getDateFromDayValue(dayValue.stop as string, timeFormat)])
            : onDayTimeChange([value, getDateFromDayValue(dayValue.stop as string, timeFormat)], dayKeys as DayKey)
        }
        onEndChange={(value: Date): void =>
          activeDays.length > 1
            ? onMultipleDayTimeChange([getDateFromDayValue(dayValue.start as string, timeFormat), value])
            : onDayTimeChange([getDateFromDayValue(dayValue.start as string, timeFormat), value], dayKeys as DayKey)
        }
        onExactHourSelect={(value: Date): void => {
          activeDays.length > 1
            ? onMultipleDayTimeChange([value, value])
            : onDayTimeChange([value, value], dayKeys as DayKey);
        }}
        onRangeDelete={onRangeDelete}
        valueSelectionModes={valueSelectionModes}
        timePickerProps={timePickerProps}
      />
    ),
    [
      timeFormat,
      valueSelectionModes,
      handleModeChange,
      activeDays,
      onMultipleDayTimeChange,
      onDayTimeChange,
      mode,
      disabled,
      dayValue,
      dayKeys,
      onRangeDelete,
      texts,
      timePickerProps,
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
