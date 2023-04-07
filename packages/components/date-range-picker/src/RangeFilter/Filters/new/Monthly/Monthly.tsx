import * as React from 'react';
import { useIntl } from 'react-intl';
import * as dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

import { useDataFormat } from '@synerise/ds-data-format';

import { GridProps } from '../../../Shared/TimeWindow/Grid/Grid.types';
import RangeFormContainer from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer';
import { SelectionCount, SelectionHint, AddButton } from '../../../Shared';
import Grid from '../../../Shared/TimeWindow/Grid/Grid';
import Day from '../../../Shared/TimeWindow/Day/Day';
import * as S from '../../../RangeFilter.styles';
import { MonthlyProps, MonthlySchedule, MonthlyScheduleDayValue } from './Monthly.types';
import { DateLimitMode } from '../../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import type { DateValue } from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer.types';
import { TimeWindowTexts, DayKey } from '../../../Shared/TimeWindow/TimeWindow.types';

import { useShiftAndControlKeys } from '../hooks/useShiftAndControlKeys';
import { canAddAnotherRange, haveActiveDaysCommonRange, range } from './utils';
import {
  DEFAULT_RANGE_START,
  DEFAULT_RANGE_END,
  DEFAULT_TIME_FORMAT,
  EMPTY_OBJECT,
  DEFAULT_MAX_ENTRIES,
  RENDER_EMPTY_NODE_FN,
  NOOP,
} from '../constants';
import { MONTH_DAYS, DAYS_OF_PERIOD_ENUM, COUNTED_FROM_ENUM } from '../../../constants';
import { US_NOTATION_WEEK_DAYS_INDEXES } from '../../../Shared/TimeWindow/constants/timeWindow.constants';

const Monthly: React.FC<MonthlyProps> = ({
  maxEntries = DEFAULT_MAX_ENTRIES,
  valueSelectionMode = ['Hour', 'Range'],
  onChange = NOOP,
  timeFormat,
  valueFormatOptions,
  value,
  timePickerProps,
  disabled,
  periodType = DAYS_OF_PERIOD_ENUM.DAY_OF_MONTH,
  countedFrom = COUNTED_FROM_ENUM.BEGINNING,
}) => {
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
  const [filteredSchedule, setFilteredSchedule] = React.useState<string[]>(Object.keys(value));
  const [activeDays, setActiveDays] = React.useState<DayKey[]>([]);
  const ref = React.useRef<HTMLDivElement>();
  const [controlKeyPressed, shiftKeyPressed] = useShiftAndControlKeys(ref);
  const intl = useIntl();
  const { isSundayFirstWeekDay } = useDataFormat();

  const allKeys = React.useMemo(() => {
    if (periodType === DAYS_OF_PERIOD_ENUM.DAY_OF_WEEK) {
      if (isSundayFirstWeekDay) {
        let keys: number[] = [];
        range(0, 5).forEach(i => {
          keys = [...keys, ...US_NOTATION_WEEK_DAYS_INDEXES.map(index => index + 7 * i)];
        });
        return keys;
      }
    }
    return range(0, 31);
  }, [periodType, isSundayFirstWeekDay]);

  const getGridSettings = (): Partial<GridProps> => {
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
        rowLabelFormatter: (rowIndex: number): string =>
          intl.formatMessage({
            id: `DS.DATE-RANGE-PICKER.NTH.${rowIndex + 1}`,
          }),
      },
    };
    return settings[periodType] as Partial<GridProps>;
  };

  React.useEffect(() => {
    setFilteredSchedule(Object.keys(value));
  }, [value]);

  const removeEmptyEntries = React.useCallback(
    (monthlySchedule: MonthlySchedule) => {
      const emptyEntries = Object.keys(monthlySchedule).filter(key => Object.keys(monthlySchedule[key]).length === 0);
      const scheduleToUpdate = monthlySchedule;
      emptyEntries.forEach(emptyEntry => {
        delete scheduleToUpdate[emptyEntry];
      });
      onChange(scheduleToUpdate);
    },
    [onChange]
  );

  React.useEffect(() => {
    const entriesWithActiveDaysValue = Object.keys(value).filter(id =>
      activeDays.every(day => !!value[id][day] && haveActiveDaysCommonRange(value[id], activeDays))
    );
    removeEmptyEntries(value);
    setFilteredSchedule(entriesWithActiveDaysValue);
  }, [value, activeDays, removeEmptyEntries]);

  const handleDayTimeChange = React.useCallback(
    (dayValue: DateValue, dayKey: DayKey | DayKey[], guid: string): void => {
      const updatedSchedule = value;
      const [start, end] = dayValue;

      if (dayKey instanceof Array) {
        dayKey.forEach(day => {
          updatedSchedule[guid][day] = {
            ...value[guid][day],
            restricted: true,
            start: start ? dayjs(start).format(DEFAULT_TIME_FORMAT) : undefined,
            stop: end ? dayjs(end).format(DEFAULT_TIME_FORMAT) : undefined,
          };
        });
      } else {
        updatedSchedule[guid][dayKey] = {
          ...value[guid][dayKey],
          restricted: true,
          start: start ? dayjs(start).format(DEFAULT_TIME_FORMAT) : undefined,
          stop: end ? dayjs(end).format(DEFAULT_TIME_FORMAT) : undefined,
        };
      }

      onChange(updatedSchedule);
    },
    [value, onChange]
  );
  const getDayValue = React.useCallback(
    (dayKey: DayKey, guid: string): MonthlyScheduleDayValue => {
      if (typeof dayKey === 'number' && value[guid] && !!value[guid][dayKey]) {
        return value[guid][dayKey];
      }
      return defaultDayValue;
    },
    [value, defaultDayValue]
  );

  const handleModeChange = React.useCallback(
    (selectedMode: DateLimitMode, dayKeys: DayKey[], guid: string): void => {
      const updatedSchedule = value;
      dayKeys.forEach(day => {
        updatedSchedule[guid][day] = {
          ...value[guid][day],
          mode: selectedMode,
        };
      });
      onChange(updatedSchedule);
    },
    [value, onChange]
  );

  const handleRangeDelete = React.useCallback(
    (guid: string, activeDaysArray): void => {
      const updatedSchedule = value;
      activeDaysArray.forEach((activeDay: DayKey) => {
        delete updatedSchedule[guid][activeDay];
      });
      onChange({ ...updatedSchedule });
    },
    [value, onChange]
  );

  const dayWeekFormatter = React.useCallback(
    (dayKey: DayKey, long: boolean): string => {
      const weekStartIndex = Math.floor((dayKey as number) / 7);
      const dayOfWeek = (dayKey as number) - weekStartIndex * 7;

      const weekday = intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.WEEKDAYS_LONG.${dayOfWeek + 1}` });
      const nthWeek = intl.formatMessage({
        id: `DS.DATE-RANGE-PICKER.NTH.${weekStartIndex === 5 ? 'LAST' : weekStartIndex + 1}`,
      });
      return long
        ? `${nthWeek} ${weekday}`
        : intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.WEEKDAYS-SHORT-${dayOfWeek}` });
    },
    [intl]
  );

  const dayMonthFormatter = React.useCallback(
    (dayKey: DayKey): string => {
      const locale = intl.locale.substring(0, 2);
      return MONTH_DAYS(locale)[dayKey];
    },
    [intl]
  );

  const dayFormatter = React.useCallback(
    (dayKey: DayKey, long: boolean): React.ReactNode => {
      if (periodType === DAYS_OF_PERIOD_ENUM.DAY_OF_WEEK) {
        return dayWeekFormatter(dayKey, long);
      }
      return dayMonthFormatter(dayKey, long);
    },
    [periodType, dayWeekFormatter, dayMonthFormatter]
  );

  const checkDay = React.useCallback((dayKey: DayKey): void => {
    setActiveDays([dayKey]);
  }, []);

  const getDayLabel = React.useCallback(
    (dayKey: DayKey, long: boolean): string | object | React.ReactNode => {
      return dayFormatter(dayKey, long);
    },
    [dayFormatter]
  );

  const excludeDayFromActive = React.useCallback(
    (dayKey: DayKey) => {
      setActiveDays(activeDays.filter(day => day !== dayKey));
    },
    [activeDays]
  );

  const isDayRestricted = React.useCallback(
    (dayKey: DayKey): boolean => {
      return Object.keys(value).some((key: string) => !!value[key][dayKey]);
    },
    [value]
  );

  const removeDaySelection = React.useCallback(
    (dayKey: DayKey) => {
      const updatedSchedule = value;
      Object.keys(value).forEach(key => {
        delete updatedSchedule[key][dayKey];
      });
      excludeDayFromActive(dayKey);
      onChange(updatedSchedule);
    },
    [value, onChange, excludeDayFromActive]
  );
  const uncheckActiveDay = React.useCallback(
    (dayKey: DayKey): void => {
      removeDaySelection(dayKey);
    },
    [removeDaySelection]
  );
  const handleSelectAll = React.useCallback((): void => {
    setActiveDays(allKeys);
  }, [allKeys]);
  const handleUnselectAll = React.useCallback((): void => {
    setActiveDays([]);
  }, []);

  const checkActiveDay = React.useCallback(
    (dayKey: DayKey): void => {
      if (!isDayRestricted(dayKey)) {
        checkDay(dayKey);
      }
      let updatedActiveDay: DayKey[] = [];
      if (controlKeyPressed) {
        updatedActiveDay = activeDays.includes(dayKey) ? activeDays : [...activeDays, dayKey];
      } else if (activeDays.length > 0 && shiftKeyPressed) {
        updatedActiveDay =
          activeDays[0] < dayKey ? range(+activeDays[0], +dayKey + 1) : range(+dayKey, +activeDays[0] + 1);
      } else {
        updatedActiveDay = [dayKey];
      }
      setActiveDays(updatedActiveDay);
    },
    [checkDay, isDayRestricted, activeDays, controlKeyPressed, shiftKeyPressed]
  );

  const handleToggleDay = React.useCallback(
    (dayKey: DayKey, forcedState?: boolean): void => {
      if (typeof forcedState !== 'undefined') {
        if (controlKeyPressed && forcedState) {
          activeDays.includes(dayKey) ? excludeDayFromActive(dayKey) : checkActiveDay(dayKey);
          return;
        }
        forcedState ? checkActiveDay(dayKey) : uncheckActiveDay(dayKey);
      } else {
        activeDays.includes(dayKey) ? uncheckActiveDay(dayKey) : checkActiveDay(dayKey);
      }
    },
    [controlKeyPressed, activeDays, uncheckActiveDay, checkActiveDay, excludeDayFromActive]
  );

  const renderDay = React.useCallback(
    (dayKey: DayKey): JSX.Element => {
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
          texts={EMPTY_OBJECT}
        />
      );
    },
    [activeDays, intl, getDayLabel, handleToggleDay, isDayRestricted, disabled]
  );

  const handleRangeAdd = React.useCallback((): void => {
    const updatedDay = {};
    const guid = Object.keys(value).find(key => activeDays.every(day => value[key][day] === undefined));
    activeDays.forEach(day => {
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

  const renderGridTitle = React.useCallback(
    count => (
      <SelectionCount
        selectedDayCount={count}
        label={intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.SELECTED', defaultMessage: 'Selected' })}
      />
    ),
    [intl]
  );
  const canAddRange = canAddAnotherRange(value, activeDays, maxEntries);
  const isAnyDaySelected = activeDays.length > 0;
  const shouldRenderAddButton = isAnyDaySelected && filteredSchedule.length < maxEntries && canAddRange && !disabled;
  return (
    <S.NewFilterContainer ref={ref as React.RefObject<HTMLDivElement>}>
      <Grid
        reverseGroup={0}
        onUnselectAll={handleUnselectAll}
        onSelectAll={handleSelectAll}
        showUnselectAll={Boolean(activeDays.length)}
        showSelectAll
        renderDay={renderDay}
        keys={allKeys}
        days={EMPTY_OBJECT}
        intl={intl}
        numberOfDays={7}
        numberOfDaysPerRow={7}
        texts={EMPTY_OBJECT}
        title={renderGridTitle(activeDays.length)}
        {...getGridSettings()}
      />
      {isAnyDaySelected &&
        filteredSchedule.map((guid, index) => (
          <RangeFormContainer
            days={EMPTY_OBJECT}
            onChange={NOOP}
            key={`value-range-${guid}`}
            onDayTimeChange={(dayValue, dayKey): void => {
              handleDayTimeChange(dayValue, dayKey, guid);
            }}
            texts={EMPTY_OBJECT as TimeWindowTexts}
            onMultipleDayTimeChange={(dates): void => handleDayTimeChange(dates, activeDays, guid)}
            dayKeys={activeDays}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            getDayLabel={getDayLabel as any}
            activeDays={activeDays}
            getDayValue={(dayKey: DayKey): MonthlyScheduleDayValue => getDayValue(dayKey, guid)}
            onRangeDelete={disabled ? undefined : (): void => handleRangeDelete(guid, activeDays)}
            onModeChange={(mode): void => handleModeChange(mode, activeDays, guid)}
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
        <SelectionHint
          message={intl.formatMessage({
            id: 'DS.DATE-RANGE-PICKER.MAXIMUM-RANGES-MESSAGE',
            defaultMessage: 'The maximum amount of ranges have been selected.',
          })}
        />
      )}
      {shouldRenderAddButton && (
        <AddButton
          label={intl.formatMessage({
            id: 'DS.DATE-RANGE-PICKER.ADD-TIME',
            defaultMessage: 'Add range',
          })}
          onClick={handleRangeAdd}
        />
      )}
      {!isAnyDaySelected && !disabled && (
        <SelectionHint
          message={intl.formatMessage({
            id: 'DS.DATE-RANGE-PICKER.SELECT-DAYS-DESCRIPTION',
            defaultMessage: 'Select range.',
          })}
        />
      )}
    </S.NewFilterContainer>
  );
};
export default Monthly;
