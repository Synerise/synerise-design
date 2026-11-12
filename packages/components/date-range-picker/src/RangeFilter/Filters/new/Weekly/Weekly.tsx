import dayjs from 'dayjs';
import React, {
  type RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

import { useDataFormat } from '@synerise/ds-core';
import { generateUuid } from '@synerise/ds-utils';

import { getDefaultTexts } from '../../../../utils';
import * as S from '../../../RangeFilter.styles';
import { AddButton, SelectionCount, SelectionHint } from '../../../Shared';
import {
  EU_NOTATION_WEEK_DAYS_INDEXES,
  US_NOTATION_WEEK_DAYS_INDEXES,
} from '../../../Shared/TimeWindow/constants/timeWindow.constants';
import Day from '../../../Shared/TimeWindow/Day/Day';
import Grid from '../../../Shared/TimeWindow/Grid/Grid';
import type { DateLimitMode } from '../../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import RangeFormContainer from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer';
import type {
  DateValue,
  FilterErrorType,
} from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer.types';
import type { DayKey } from '../../../Shared/TimeWindow/TimeWindow.types';
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
import type { ScheduleRows } from '../Filters.types';
import { useShiftAndControlKeys } from '../hooks/useShiftAndControlKeys';
import { removeDays, selectDisplayedRange, updateDays } from '../scheduleUtils';
import { canAddAnotherRange, haveActiveDaysCommonRange } from './utils';
import type {
  WeeklyProps,
  WeeklySchedule,
  WeeklyScheduleDayValue,
} from './Weekly.types';

const Weekly = ({
  maxEntries = DEFAULT_MAX_ENTRIES,
  valueSelectionMode = ['Hour', 'Range'],
  onChange = NOOP,
  timeFormat,
  valueFormatOptions,
  value: schedule,
  texts,
  timePickerProps,
  disabled,
  errorTexts: scheduleErrors,
}: WeeklyProps) => {
  const value = schedule as ScheduleRows<WeeklyScheduleDayValue>;
  const errorTexts = scheduleErrors as
    | ScheduleRows<FilterErrorType>
    | undefined;
  const intl = useIntl();
  const allTexts = useMemo(
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
  const [activeDays, setActiveDays] = useState<DayKey[]>([]);
  const ref = useRef<HTMLDivElement>();
  const [controlKeyPressed, shiftKeyPressed] = useShiftAndControlKeys(ref);

  const { isSundayFirstWeekDay } = useDataFormat();

  const allKeys = useMemo(
    () =>
      isSundayFirstWeekDay
        ? US_NOTATION_WEEK_DAYS_INDEXES
        : EU_NOTATION_WEEK_DAYS_INDEXES,
    [isSundayFirstWeekDay],
  );

  const filteredSchedule = useMemo(
    () =>
      activeDays.length
        ? Object.keys(value).filter((id) =>
            activeDays.every(
              (day) =>
                !!value[id][day] &&
                haveActiveDaysCommonRange(value[id], activeDays),
            ),
          )
        : [],
    [value, activeDays],
  );

  const handleDayTimeChange = useCallback(
    (dayValue: DateValue, dayKey: DayKey | DayKey[], guid: string) => {
      const [start, end, inverted] = dayValue;
      const updatedSchedule = updateDays(
        value,
        guid,
        Array.isArray(dayKey) ? dayKey : [dayKey],
        (day) => ({
          ...day,
          restricted: true,
          start: start ? dayjs(start).format(DEFAULT_TIME_FORMAT) : undefined,
          stop: end ? dayjs(end).format(DEFAULT_TIME_FORMAT) : undefined,
          inverted: Boolean(inverted),
        }),
      );
      if (updatedSchedule !== value) {
        onChange(updatedSchedule);
      }
    },
    [value, onChange],
  );
  const getDayValue = useCallback(
    (dayKey: DayKey, guid: string) => {
      if (typeof dayKey === 'number' && value[guid] && value[guid][dayKey]) {
        return value[guid][dayKey];
      }
      return defaultDayValue;
    },
    [value, defaultDayValue],
  );
  const handleModeChange = useCallback(
    (selectedMode: DateLimitMode, dayKeys: DayKey[], guid: string) => {
      const updatedSchedule = updateDays(value, guid, dayKeys, (day) => ({
        ...day,
        ...getDefaultFilterForLimitMode(selectedMode),
        mode: selectedMode,
      }));
      if (updatedSchedule !== value) {
        onChange(updatedSchedule);
      }
    },
    [value, onChange],
  );
  const handleRangeDelete = useCallback(
    (guid: string, activeDaysArray: DayKey[]) => {
      onChange(removeDays(value, [guid], activeDaysArray));
    },
    [value, onChange],
  );

  const dayFormatter = useCallback(
    (dayKey: DayKey) =>
      intl.formatMessage({
        id: `DS.DATE-RANGE-PICKER.WEEKDAYS-SHORT-${dayKey}`,
      }),
    [intl],
  );

  const getDayLabel = useCallback(
    (dayKey: DayKey) => {
      return dayFormatter(dayKey);
    },
    [dayFormatter],
  );

  const excludeDayFromActive = useCallback(
    (dayKey: DayKey) => {
      setActiveDays(activeDays.filter((day) => day !== dayKey));
    },
    [activeDays],
  );

  const isDayRestricted = useCallback(
    (dayKey: DayKey) => {
      return Object.keys(value).some((key: string) => !!value[key][dayKey]);
    },
    [value],
  );

  const removeDaySelection = useCallback(
    (dayKey: DayKey) => {
      excludeDayFromActive(dayKey);
      onChange(removeDays(value, Object.keys(value), [dayKey]));
    },
    [value, onChange, excludeDayFromActive],
  );
  const uncheckActiveDay = useCallback(
    (dayKey: DayKey) => {
      removeDaySelection(dayKey);
    },
    [removeDaySelection],
  );
  const handleSelectAll = useCallback(() => {
    setActiveDays(allKeys);
  }, [allKeys]);
  const handleUnselectAll = useCallback(() => {
    setActiveDays([]);
  }, []);
  const checkActiveDay = useCallback(
    (dayKey: DayKey) => {
      let updatedActiveDay: DayKey[] = [];
      if (controlKeyPressed) {
        updatedActiveDay = activeDays.includes(dayKey)
          ? activeDays
          : [...activeDays, dayKey];
      } else if (activeDays.length > 0 && shiftKeyPressed) {
        updatedActiveDay = selectDisplayedRange(allKeys, activeDays[0], dayKey);
      } else {
        updatedActiveDay = [dayKey];
      }
      setActiveDays(updatedActiveDay);
    },
    [allKeys, activeDays, controlKeyPressed, shiftKeyPressed],
  );

  const handleToggleDay = useCallback(
    (dayKey: DayKey, forcedState?: boolean) => {
      if (typeof forcedState !== 'undefined') {
        if (controlKeyPressed && forcedState) {
          activeDays.includes(dayKey)
            ? excludeDayFromActive(dayKey)
            : checkActiveDay(dayKey);
          return;
        }
        forcedState ? checkActiveDay(dayKey) : uncheckActiveDay(dayKey);
      } else {
        activeDays.includes(dayKey)
          ? uncheckActiveDay(dayKey)
          : checkActiveDay(dayKey);
      }
    },
    [
      controlKeyPressed,
      activeDays,
      uncheckActiveDay,
      checkActiveDay,
      excludeDayFromActive,
    ],
  );

  const renderDay = useCallback(
    (dayKey: DayKey) => {
      const isActive = activeDays.includes(dayKey);
      return (
        <Day
          key={dayKey}
          dayKey={dayKey}
          data-attr={dayKey}
          label={getDayLabel(dayKey)}
          restricted={isDayRestricted(dayKey)}
          active={isActive}
          readOnly={disabled}
          intl={intl}
          onToggle={handleToggleDay}
          onClear={removeDaySelection}
          texts={allTexts}
        />
      );
    },
    [
      activeDays,
      getDayLabel,
      isDayRestricted,
      disabled,
      intl,
      handleToggleDay,
      removeDaySelection,
      allTexts,
    ],
  );

  const handleRangeAdd = useCallback(() => {
    const updatedDay: Record<DayKey, WeeklyScheduleDayValue> = {};
    const guid = Object.keys(value).find((key) =>
      activeDays.every((day) => value[key][day] === undefined),
    );
    activeDays.forEach((day) => {
      updatedDay[day] = defaultDayValue;
    });
    const restOfScheduleObject = guid ? value[guid] : EMPTY_OBJECT;
    const updatedSchedule = {
      ...value,
      [guid || generateUuid()]: {
        ...restOfScheduleObject,
        ...updatedDay,
      },
    } as WeeklySchedule;
    onChange(updatedSchedule);
  }, [value, activeDays, defaultDayValue, onChange]);

  const renderGridTitle = useCallback(
    (count: number) => (
      <SelectionCount selectedDayCount={count} label={allTexts.selected} />
    ),
    [allTexts.selected],
  );
  const canAddRange = canAddAnotherRange(value, activeDays, maxEntries);
  const isAnyDaySelected = activeDays.length > 0;
  const shouldRenderAddButton =
    isAnyDaySelected &&
    filteredSchedule.length < maxEntries &&
    canAddRange &&
    !disabled;
  const getErrorTextsForFormRow = (guid: string) =>
    activeDays.length === 1 ? errorTexts?.[guid]?.[activeDays[0]] : undefined;
  return (
    <S.NewFilterContainer ref={ref as RefObject<HTMLDivElement>}>
      <Grid
        reverseGroup={0}
        onUnselectAll={handleUnselectAll}
        onSelectAll={handleSelectAll}
        showUnselectAll={Boolean(activeDays.length)}
        showSelectAll={allKeys.length > activeDays.length}
        renderDay={renderDay}
        keys={allKeys}
        days={EMPTY_OBJECT}
        intl={intl}
        numberOfDays={7}
        texts={allTexts}
        title={renderGridTitle(activeDays.length)}
      />
      {isAnyDaySelected &&
        filteredSchedule.map((guid, index) => (
          <RangeFormContainer
            days={EMPTY_OBJECT}
            onChange={NOOP}
            errorTexts={getErrorTextsForFormRow(guid)}
            key={`value-range-${guid}`}
            onDayTimeChange={(dayValue, dayKey) => {
              handleDayTimeChange(dayValue, dayKey, guid);
            }}
            texts={allTexts}
            onMultipleDayTimeChange={(dates) =>
              handleDayTimeChange(dates, activeDays, guid)
            }
            dayKeys={activeDays}
            getDayLabel={getDayLabel}
            activeDays={activeDays}
            getDayValue={(dayKey: DayKey) => getDayValue(dayKey, guid)}
            onRangeDelete={
              disabled ? undefined : () => handleRangeDelete(guid, activeDays)
            }
            onModeChange={(mode) => handleModeChange(mode, activeDays, guid)}
            valueSelectionModes={valueSelectionMode}
            hideHeader={index !== 0}
            renderSuffix={RENDER_EMPTY_NODE_FN}
            timePickerProps={timePickerProps}
            timeFormat={timeFormat}
            valueFormatOptions={valueFormatOptions}
            disabled={disabled}
          />
        ))}
      {isAnyDaySelected && !canAddRange && (
        <SelectionHint message={allTexts.maximumRanges} />
      )}
      {shouldRenderAddButton && (
        <AddButton
          data-testid="drp-filter-add-range"
          label={allTexts.addTime}
          onClick={handleRangeAdd}
        />
      )}
      {!isAnyDaySelected && !disabled && (
        <SelectionHint message={allTexts.selectDaysDescription} />
      )}
    </S.NewFilterContainer>
  );
};
export default Weekly;
