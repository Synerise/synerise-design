import dayjs from 'dayjs';
import React, {
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';

import { useDataFormat } from '@synerise/ds-data-format';

import { getDefaultTexts } from '../../../../utils';
import * as S from '../../../RangeFilter.styles';
import { AddButton, SelectionCount, SelectionHint } from '../../../Shared';
import Day from '../../../Shared/TimeWindow/Day/Day';
import Grid from '../../../Shared/TimeWindow/Grid/Grid';
import { type GridProps } from '../../../Shared/TimeWindow/Grid/Grid.types';
import { type DateLimitMode } from '../../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import RangeFormContainer from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer';
import type { DateValue } from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer.types';
import { type DayKey } from '../../../Shared/TimeWindow/TimeWindow.types';
import { US_NOTATION_WEEK_DAYS_INDEXES } from '../../../Shared/TimeWindow/constants/timeWindow.constants';
import {
  COUNTED_FROM_ENUM,
  DAYS_OF_PERIOD_ENUM,
  MONTHLY_SCHEDULER_INTL_KEYS_NTH_WEEK,
  MONTHLY_SCHEDULER_INTL_KEYS_WEEKDAYS_LONG,
  MONTHLY_SCHEDULER_INTL_KEYS_WEEKDAYS_SHORT,
  MONTH_DAYS,
} from '../../../constants';
import {
  DEFAULT_MAX_ENTRIES,
  DEFAULT_RANGE_END,
  DEFAULT_RANGE_START,
  DEFAULT_TIME_FORMAT,
  EMPTY_OBJECT,
  NOOP,
  RENDER_EMPTY_NODE_FN,
} from '../constants';
import { useShiftAndControlKeys } from '../hooks/useShiftAndControlKeys';
import { type MonthlyProps, type MonthlySchedule } from './Monthly.types';
import { canAddAnotherRange, haveActiveDaysCommonRange, range } from './utils';

const Monthly = ({
  maxEntries = DEFAULT_MAX_ENTRIES,
  valueSelectionMode = ['Hour', 'Range'],
  onChange = NOOP,
  timeFormat,
  valueFormatOptions,
  value,
  timePickerProps,
  disabled,
  texts,
  periodType = DAYS_OF_PERIOD_ENUM.DAY_OF_MONTH,
  countedFrom = COUNTED_FROM_ENUM.BEGINNING,
  errorTexts,
}: MonthlyProps) => {
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
  const [filteredSchedule, setFilteredSchedule] = useState<string[]>(
    Object.keys(value),
  );
  const [activeDays, setActiveDays] = useState<DayKey[]>([]);
  const ref = useRef<HTMLDivElement>();
  const [controlKeyPressed, shiftKeyPressed] = useShiftAndControlKeys(ref);

  const { isSundayFirstWeekDay } = useDataFormat();

  const allKeys = useMemo(() => {
    if (periodType === DAYS_OF_PERIOD_ENUM.DAY_OF_WEEK) {
      if (isSundayFirstWeekDay) {
        let keys: number[] = [];
        range(0, 5).forEach((i) => {
          keys = [
            ...keys,
            ...US_NOTATION_WEEK_DAYS_INDEXES.map((index) => index + 7 * i),
          ];
        });
        return keys;
      }
      return range(0, 5 * 7);
    }
    return range(0, 31);
  }, [periodType, isSundayFirstWeekDay]);

  const getGridSettings = () => {
    const settings = {
      [DAYS_OF_PERIOD_ENUM.DAY_OF_MONTH]: {
        numberOfDays: 31,
        reverseGroup: 1,
        inverted: countedFrom === COUNTED_FROM_ENUM.ENDING,
      },
      [DAYS_OF_PERIOD_ENUM.DAY_OF_WEEK]: {
        numberOfDays: 7 * 5,
        reverseGroup: 7,
        labelInverted: countedFrom === COUNTED_FROM_ENUM.ENDING,
        inverted: countedFrom === COUNTED_FROM_ENUM.ENDING,
        rowLabelFormatter: (rowIndex: number) =>
          intl.formatMessage(MONTHLY_SCHEDULER_INTL_KEYS_NTH_WEEK[rowIndex]),
      },
    };
    return settings[periodType] as Partial<GridProps>;
  };

  useEffect(() => {
    setFilteredSchedule(Object.keys(value));
  }, [value]);

  const removeEmptyEntries = useCallback(
    (monthlySchedule: MonthlySchedule) => {
      const emptyEntries = Object.keys(monthlySchedule).filter(
        (key) => Object.keys(monthlySchedule[key]).length === 0,
      );
      const scheduleToUpdate = monthlySchedule;
      emptyEntries.forEach((emptyEntry) => {
        delete scheduleToUpdate[emptyEntry];
      });
      onChange(scheduleToUpdate);
    },
    [onChange],
  );

  useEffect(() => {
    const entriesWithActiveDaysValue = activeDays.length
      ? Object.keys(value).filter((id) =>
          activeDays.every(
            (day) =>
              !!value[id][day] &&
              haveActiveDaysCommonRange(value[id], activeDays),
          ),
        )
      : [];
    removeEmptyEntries(value);
    setFilteredSchedule(entriesWithActiveDaysValue);
  }, [value, activeDays, removeEmptyEntries]);

  const handleDayTimeChange = useCallback(
    (dayValue: DateValue, dayKey: DayKey | DayKey[], guid: string) => {
      const updatedSchedule = value;
      const [start, end, inverted] = dayValue;

      if (dayKey instanceof Array) {
        dayKey.forEach((day) => {
          updatedSchedule[guid][day] = {
            ...value[guid][day],
            restricted: true,
            start: start ? dayjs(start).format(DEFAULT_TIME_FORMAT) : undefined,
            stop: end ? dayjs(end).format(DEFAULT_TIME_FORMAT) : undefined,
            inverted: Boolean(inverted),
          };
        });
      } else {
        updatedSchedule[guid][dayKey] = {
          ...value[guid][dayKey],
          restricted: true,
          start: start ? dayjs(start).format(DEFAULT_TIME_FORMAT) : undefined,
          stop: end ? dayjs(end).format(DEFAULT_TIME_FORMAT) : undefined,
          inverted: Boolean(inverted),
        };
      }

      onChange(updatedSchedule);
    },
    [value, onChange],
  );
  const getDayValue = useCallback(
    (dayKey: DayKey, guid: string) => {
      if (typeof dayKey === 'number' && value[guid] && !!value[guid][dayKey]) {
        return value[guid][dayKey];
      }
      return defaultDayValue;
    },
    [value, defaultDayValue],
  );

  const handleModeChange = useCallback(
    (selectedMode: DateLimitMode, dayKeys: DayKey[], guid: string) => {
      const updatedSchedule = value;
      dayKeys.forEach((day) => {
        updatedSchedule[guid][day] = {
          ...value[guid][day],
          mode: selectedMode,
        };
      });
      onChange(updatedSchedule);
    },
    [value, onChange],
  );

  const handleRangeDelete = useCallback(
    (guid: string, activeDaysArray: DayKey[]) => {
      const updatedSchedule = value;
      activeDaysArray.forEach((activeDay: DayKey) => {
        delete updatedSchedule[guid][activeDay];
      });
      onChange({ ...updatedSchedule });
    },
    [value, onChange],
  );

  const dayWeekFormatter = useCallback(
    (dayKey: DayKey, long: boolean) => {
      const weekStartIndex = Math.floor((dayKey as number) / 7);
      const dayOfWeek = (dayKey as number) - weekStartIndex * 7;
      const weekday = intl.formatMessage(
        MONTHLY_SCHEDULER_INTL_KEYS_WEEKDAYS_LONG[dayOfWeek],
      );
      const nthWeek = intl.formatMessage(
        MONTHLY_SCHEDULER_INTL_KEYS_NTH_WEEK[weekStartIndex],
      );
      return long
        ? `${nthWeek} ${weekday}`
        : intl.formatMessage(
            MONTHLY_SCHEDULER_INTL_KEYS_WEEKDAYS_SHORT[dayOfWeek],
          );
    },
    [intl],
  );

  const dayMonthFormatter = useCallback(
    (dayKey: DayKey) => {
      const locale = intl.locale.substring(0, 2);
      return MONTH_DAYS(locale)[dayKey];
    },
    [intl],
  );

  const dayFormatter = useCallback(
    (dayKey: DayKey, long: boolean) => {
      if (periodType === DAYS_OF_PERIOD_ENUM.DAY_OF_WEEK) {
        return dayWeekFormatter(dayKey, long);
      }
      return dayMonthFormatter(dayKey);
    },
    [periodType, dayWeekFormatter, dayMonthFormatter],
  );

  const checkDay = useCallback((dayKey: DayKey) => {
    setActiveDays([dayKey]);
  }, []);

  const getDayLabel = useCallback(
    (dayKey: DayKey, long?: boolean) => {
      return dayFormatter(dayKey, long || false);
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
      const updatedSchedule = value;
      Object.keys(value).forEach((key) => {
        delete updatedSchedule[key][dayKey];
      });
      excludeDayFromActive(dayKey);
      onChange(updatedSchedule);
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
      if (!isDayRestricted(dayKey)) {
        checkDay(dayKey);
      }
      let updatedActiveDay: DayKey[] = [];
      if (controlKeyPressed) {
        updatedActiveDay = activeDays.includes(dayKey)
          ? activeDays
          : [...activeDays, dayKey];
      } else if (activeDays.length > 0 && shiftKeyPressed) {
        updatedActiveDay =
          activeDays[0] < dayKey
            ? range(+activeDays[0], +dayKey + 1)
            : range(+dayKey, +activeDays[0] + 1);
      } else {
        updatedActiveDay = [dayKey];
      }
      setActiveDays(updatedActiveDay);
    },
    [checkDay, isDayRestricted, activeDays, controlKeyPressed, shiftKeyPressed],
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
    const updatedDay = {};
    const guid = Object.keys(value).find((key) =>
      activeDays.every((day) => value[key][day] === undefined),
    );
    activeDays.forEach((day) => {
      updatedDay[day] = defaultDayValue;
    });
    const restOfScheduleObject = guid ? value[guid] : EMPTY_OBJECT;
    const updatedSchedule = {
      ...value,
      [guid || uuid()]: {
        ...restOfScheduleObject,
        ...updatedDay,
      },
    } as MonthlySchedule;
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
  const getErrorTextsForFormRow = (guid: string) => {
    return (
      activeDays.length === 1 &&
      errorTexts &&
      errorTexts[guid] &&
      errorTexts[guid][activeDays[0]]
    );
  };
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
        numberOfDaysPerRow={7}
        texts={allTexts}
        title={renderGridTitle(activeDays.length)}
        {...getGridSettings()}
      />
      {isAnyDaySelected &&
        filteredSchedule.map((guid, index) => (
          <RangeFormContainer
            days={EMPTY_OBJECT}
            errorTexts={getErrorTextsForFormRow(guid)}
            onChange={NOOP}
            key={`value-range-${guid}`}
            onDayTimeChange={(dayValue, dayKey) => {
              handleDayTimeChange(dayValue, dayKey, guid);
            }}
            texts={allTexts}
            onMultipleDayTimeChange={(dates) =>
              handleDayTimeChange(dates, activeDays, guid)
            }
            dayKeys={activeDays}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            getDayLabel={getDayLabel as any}
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
            monthlyFilterPeriod={periodType}
          />
        ))}
      {isAnyDaySelected && !canAddRange && (
        <SelectionHint message={allTexts.maximumRanges} />
      )}
      {shouldRenderAddButton && (
        <AddButton label={allTexts.addTime} onClick={handleRangeAdd} />
      )}
      {!isAnyDaySelected && !disabled && (
        <SelectionHint message={allTexts.selectDaysDescription} />
      )}
    </S.NewFilterContainer>
  );
};
export default Monthly;
