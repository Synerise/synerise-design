import React from 'react';

import { type Texts } from '../../../../DateRangePicker.types';
import { Header } from '../Header/Header';
import RangeActions from '../RangeActions/RangeActions';
import { type ActionsTexts } from '../RangeActions/RangeActions.types';
import RangeSummary from '../RangeSummary/RangeSummary';
import { DEFAULT_LIMIT_MODE } from '../TimeWindow';
import { type DayKey } from '../TimeWindow.types';
import { getDateFromDayValue, getDefaultFilterForLimitMode } from '../utils';
import RangeForm from './RangeForm/RangeForm';
import { RANGE_DISPLAY_MODES } from './RangeForm/RangeForm.constants';
import { type DateLimitMode } from './RangeForm/RangeForm.types';
import * as S from './RangeFormContainer.styles';
import type {
  DateValue,
  RangeFormContainerProps,
} from './RangeFormContainer.types';

const RangeFormContainer = ({
  errorTexts,
  activeDays,
  disabled,
  days,
  dayKeys,
  getDayValue,
  getDayLabel,
  onDayTimeChange,
  onMultipleDayTimeChange,
  hideHeader,
  headerOptions = {},
  monthlyFilter,
  monthlyFilterPeriod,
  onRangeClear,
  onRangePaste,
  onRangeCopy,
  onRangeDelete,
  texts,
  onChange,
  valueSelectionModes = ['Range', 'Hour'],
  rangeDisplayMode,
  onModeChange,
  timePickerProps,
  renderSuffix,
  timeFormat,
  valueFormatOptions,
}: RangeFormContainerProps) => {
  const dayValue = getDayValue(activeDays[0]);

  const [mode, setMode] = React.useState<DateLimitMode>(
    dayValue?.mode || valueSelectionModes[0] || DEFAULT_LIMIT_MODE,
  );

  const handleModeChange = React.useCallback(
    (selectedMode: DateLimitMode) => {
      if (onModeChange) {
        onModeChange(selectedMode);
        return;
      }
      const updatedDays = {};
      activeDays.forEach((i) => {
        updatedDays[i] = {
          ...days[i],
          ...getDefaultFilterForLimitMode(selectedMode),
          mode: selectedMode,
        };
      });
      onChange({ ...days, ...updatedDays });
    },
    [onChange, days, activeDays, onModeChange],
  );
  React.useEffect((): void => {
    setMode(dayValue?.mode || valueSelectionModes[0] || DEFAULT_LIMIT_MODE);
  }, [dayValue, valueSelectionModes]);

  const onStartChange = React.useCallback(
    (start?: Date): void => {
      const dayVal = getDayValue(activeDays[0]);
      const { inverted, stop: end } = dayVal;
      const value: DateValue = [
        start,
        end ? getDateFromDayValue(end, timeFormat) : undefined,
        Boolean(inverted),
      ];

      if (activeDays.length > 1) {
        onMultipleDayTimeChange(value);
      } else {
        onDayTimeChange(value, dayKeys as DayKey);
      }
    },
    [
      activeDays,
      onMultipleDayTimeChange,
      onDayTimeChange,
      timeFormat,
      getDayValue,
      dayKeys,
    ],
  );

  const onEndChange = React.useCallback(
    (end?: Date): void => {
      const dayVal = getDayValue(activeDays[0]);
      const { start, inverted } = dayVal;

      const value: DateValue = [
        start ? getDateFromDayValue(start, timeFormat) : undefined,
        end,
        Boolean(inverted),
      ];

      if (activeDays.length > 1) {
        onMultipleDayTimeChange(value);
      } else {
        onDayTimeChange(value, dayKeys as DayKey);
      }
    },
    [
      activeDays,
      onMultipleDayTimeChange,
      onDayTimeChange,
      timeFormat,
      getDayValue,
      dayKeys,
    ],
  );

  const toggleInverted = React.useCallback((): void => {
    const dayVal = getDayValue(activeDays[0]);
    const { start, inverted, stop: end } = dayVal;

    const value: DateValue = [
      start ? getDateFromDayValue(start, timeFormat) : undefined,
      end ? getDateFromDayValue(end, timeFormat) : undefined,
      Boolean(!inverted),
    ];

    if (activeDays.length > 1) {
      onMultipleDayTimeChange(value);
    } else {
      onDayTimeChange(value, dayKeys as DayKey);
    }
  }, [
    activeDays,
    onMultipleDayTimeChange,
    onDayTimeChange,
    timeFormat,
    getDayValue,
    dayKeys,
  ]);

  const onExactHourSelect = React.useCallback(
    (value?: Date): void => {
      if (activeDays.length > 1) {
        onMultipleDayTimeChange([value, value, false]);
      } else {
        onDayTimeChange([value, value, false], dayKeys as DayKey);
      }
    },
    [activeDays, onMultipleDayTimeChange, onDayTimeChange, dayKeys],
  );

  const rangeForm = React.useMemo(
    () => (
      <RangeForm
        disabled={disabled}
        texts={texts as Texts}
        errorTexts={errorTexts}
        onModeChange={(selected: DateLimitMode): void => {
          setMode(selected);
          handleModeChange(selected);
        }}
        mode={mode}
        startDate={
          dayValue?.start
            ? getDateFromDayValue(dayValue.start, timeFormat)
            : undefined
        }
        endDate={
          dayValue?.stop
            ? getDateFromDayValue(dayValue.stop, timeFormat)
            : undefined
        }
        onStartChange={onStartChange}
        onEndChange={onEndChange}
        onExactHourSelect={onExactHourSelect}
        onRangeDelete={onRangeDelete}
        valueSelectionModes={valueSelectionModes}
        valueFormatOptions={valueFormatOptions}
        timePickerProps={timePickerProps}
        rangeDisplayMode={rangeDisplayMode}
        isInvertedRange={Boolean(dayValue?.inverted)}
      />
    ),
    [
      disabled,
      texts,
      errorTexts,
      mode,
      dayValue.start,
      dayValue.stop,
      dayValue?.inverted,
      timeFormat,
      onStartChange,
      onEndChange,
      onExactHourSelect,
      onRangeDelete,
      valueSelectionModes,
      valueFormatOptions,
      timePickerProps,
      rangeDisplayMode,
      handleModeChange,
    ],
  );

  const invertedToggleLink = React.useMemo(() => {
    return (
      <S.InvertAction onClick={toggleInverted}>
        {texts.inverseSelection}
      </S.InvertAction>
    );
  }, [texts.inverseSelection, toggleInverted]);

  const suffix = React.useMemo(() => {
    const { includeActions = true } = headerOptions;
    return renderSuffix ? (
      renderSuffix()
    ) : (
      <>
        {rangeDisplayMode === RANGE_DISPLAY_MODES.SLIDER && invertedToggleLink}
        {includeActions && (
          <RangeActions
            onRangeClear={onRangeClear}
            onRangeCopy={onRangeCopy}
            onRangePaste={onRangePaste}
            texts={texts as ActionsTexts}
          />
        )}
      </>
    );
  }, [
    onRangePaste,
    onRangeClear,
    onRangeCopy,
    texts,
    renderSuffix,
    rangeDisplayMode,
    invertedToggleLink,
    headerOptions,
  ]);

  if (hideHeader) {
    return rangeForm;
  }
  const { includeSummary = true } = headerOptions;
  return (
    <>
      <Header
        title={
          includeSummary && (
            <RangeSummary
              dayKeys={dayKeys as DayKey[]}
              getDayLabel={getDayLabel}
              texts={texts}
              monthlyFilter={monthlyFilter}
              monthlyFilterPeriod={monthlyFilterPeriod}
            />
          )
        }
        suffix={suffix}
      />
      {rangeForm}
    </>
  );
};

export default RangeFormContainer;
