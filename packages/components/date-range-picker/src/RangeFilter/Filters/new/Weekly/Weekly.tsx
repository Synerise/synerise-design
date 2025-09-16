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

import { useDataFormat } from '@synerise/ds-core';

import { getDefaultTexts } from '../../../../utils';
import * as S from '../../../RangeFilter.styles';
import { AddButton, SelectionCount, SelectionHint } from '../../../Shared';
import Day from '../../../Shared/TimeWindow/Day/Day';
import Grid from '../../../Shared/TimeWindow/Grid/Grid';
import { type DateLimitMode } from '../../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import RangeFormContainer from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer';
import type { DateValue } from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer.types';
import {
  EU_NOTATION_WEEK_DAYS_INDEXES,
  US_NOTATION_WEEK_DAYS_INDEXES,
} from '../../../Shared/TimeWindow/constants/timeWindow.constants';
import { type DayKey } from '../../WeeklyFilter/WeeklyFilter.types';
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
import { type WeeklyProps, type WeeklySchedule } from './Weekly.types';
import {
  canAddAnotherRange,
  haveActiveDaysCommonRange,
  range,
  removeEmptyEntries,
} from './utils';

const Weekly = ({
  maxEntries = DEFAULT_MAX_ENTRIES,
  valueSelectionMode = ['Hour', 'Range'],
  onChange = NOOP,
  timeFormat,
  valueFormatOptions,
  value,
  texts,
  timePickerProps,
  disabled,
  errorTexts,
}: WeeklyProps) => {
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

  const allKeys = useMemo(
    () =>
      isSundayFirstWeekDay
        ? US_NOTATION_WEEK_DAYS_INDEXES
        : EU_NOTATION_WEEK_DAYS_INDEXES,
    [isSundayFirstWeekDay],
  );

  useEffect(() => {
    removeEmptyEntries(value);
    const entriesWithActiveDaysValue = activeDays.length
      ? Object.keys(value).filter((id) =>
          activeDays.every(
            (day) =>
              // @ts-expect-error - requires type refactor
              !!value[id][day] &&
              haveActiveDaysCommonRange(value[id], activeDays),
          ),
        )
      : [];
    setFilteredSchedule(entriesWithActiveDaysValue);
  }, [value, activeDays]);

  const handleDayTimeChange = useCallback(
    (dayValue: DateValue, dayKey: DayKey | DayKey[], guid: string) => {
      const updatedSchedule = value;
      const [start, end, inverted] = dayValue;
      if (dayKey instanceof Array) {
        dayKey.forEach((day) => {
          if (guid in updatedSchedule) {
            // @ts-expect-error - requires type refactor
            updatedSchedule[guid][day] = {
              // @ts-expect-error - requires type refactor
              ...value[guid][day],
              restricted: true,
              start: start
                ? dayjs(start).format(DEFAULT_TIME_FORMAT)
                : undefined,
              stop: end ? dayjs(end).format(DEFAULT_TIME_FORMAT) : undefined,
              inverted: Boolean(inverted),
            };
          }
        });
      } else if (guid in updatedSchedule) {
        // @ts-expect-error - requires type refactor
        updatedSchedule[guid][dayKey] = {
          // @ts-expect-error - requires type refactor
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
      // @ts-expect-error - requires type refactor
      if (typeof dayKey === 'number' && value[guid] && !!value[guid][dayKey]) {
        // @ts-expect-error - requires type refactor
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
        // @ts-expect-error - requires type refactor
        updatedSchedule[guid][day] = {
          // @ts-expect-error - requires type refactor
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
        // @ts-expect-error - requires type refactor
        delete updatedSchedule[guid][activeDay];
      });
      onChange({ ...updatedSchedule });
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

  const checkDay = useCallback((dayKey: DayKey) => {
    setActiveDays([dayKey]);
  }, []);

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
      // @ts-expect-error - requires type refactor
      return Object.keys(value).some((key: string) => !!value[key][dayKey]);
    },
    [value],
  );

  const removeDaySelection = useCallback(
    (dayKey: DayKey) => {
      const updatedSchedule = value;
      Object.keys(value).forEach((key) => {
        // @ts-expect-error - requires type refactor
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
      // @ts-expect-error - requires type refactor
      activeDays.every((day) => value[key][day] === undefined),
    );
    activeDays.forEach((day) => {
      // @ts-expect-error - requires type refactor
      updatedDay[day] = defaultDayValue;
    });
    const restOfScheduleObject = guid ? value[guid] : EMPTY_OBJECT;
    const updatedSchedule = {
      ...value,
      [guid || uuid()]: {
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
  const getErrorTextsForFormRow = (guid: string) => {
    return (
      activeDays.length === 1 &&
      errorTexts &&
      errorTexts[guid] &&
      // @ts-expect-error - requires type refactor
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
