import * as React from 'react';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

import { useDataFormat } from '@synerise/ds-data-format';

import RangeFormContainer from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer';
import { SelectionCount, SelectionHint, AddButton } from '../../../Shared';
import Grid from '../../../Shared/TimeWindow/Grid/Grid';
import Day from '../../../Shared/TimeWindow/Day/Day';
import * as S from '../../../RangeFilter.styles';
import { WeeklyProps, WeeklySchedule, WeeklyScheduleDayValue } from './Weekly.types';
import { DateLimitMode } from '../../../Shared/TimeWindow/RangeFormContainer/RangeForm/RangeForm.types';
import type { DateValue } from '../../../Shared/TimeWindow/RangeFormContainer/RangeFormContainer.types';
import { DayKey } from '../../WeeklyFilter/WeeklyFilter.types';
import { TimeWindowTexts } from '../../../Shared/TimeWindow/TimeWindow.types';

import { useShiftAndControlKeys } from '../hooks/useShiftAndControlKeys';
import { canAddAnotherRange, haveActiveDaysCommonRange, range, removeEmptyEntries } from './utils';
import {
  DEFAULT_RANGE_START,
  DEFAULT_RANGE_END,
  DEFAULT_TIME_FORMAT,
  EMPTY_OBJECT,
  DEFAULT_MAX_ENTRIES,
  RENDER_EMPTY_NODE_FN,
  NOOP,
} from '../constants';
import {
  EU_NOTATION_WEEK_DAYS_INDEXES,
  US_NOTATION_WEEK_DAYS_INDEXES,
} from '../../../Shared/TimeWindow/constants/timeWindow.constants';

const Weekly = ({
  maxEntries = DEFAULT_MAX_ENTRIES,
  valueSelectionMode = ['Hour', 'Range'],
  onChange = NOOP,
  timeFormat,
  valueFormatOptions,
  value,
  timePickerProps,
  disabled,
  errorTexts,
}: WeeklyProps) => {
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

  const allKeys = React.useMemo(
    () => (isSundayFirstWeekDay ? US_NOTATION_WEEK_DAYS_INDEXES : EU_NOTATION_WEEK_DAYS_INDEXES),
    [isSundayFirstWeekDay]
  );

  React.useEffect(() => {
    removeEmptyEntries(value);
    const entriesWithActiveDaysValue = activeDays.length
      ? Object.keys(value).filter(id =>
          activeDays.every(day => !!value[id][day] && haveActiveDaysCommonRange(value[id], activeDays))
        )
      : [];
    setFilteredSchedule(entriesWithActiveDaysValue);
  }, [value, activeDays]);

  const handleDayTimeChange = React.useCallback(
    (dayValue: DateValue, dayKey: DayKey | DayKey[], guid: string): void => {
      const updatedSchedule = value;
      const [start, end, inverted] = dayValue;
      if (dayKey instanceof Array) {
        dayKey.forEach(day => {
          if (guid in updatedSchedule) {
            updatedSchedule[guid][day] = {
              ...value[guid][day],
              restricted: true,
              start: start ? dayjs(start).format(DEFAULT_TIME_FORMAT) : undefined,
              stop: end ? dayjs(end).format(DEFAULT_TIME_FORMAT) : undefined,
              inverted: Boolean(inverted),
            };
          }
        });
      } else if (guid in updatedSchedule) {
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
    [value, onChange]
  );
  const getDayValue = React.useCallback(
    (dayKey: DayKey, guid: string): WeeklyScheduleDayValue => {
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

  const dayFormatter = React.useCallback(
    (dayKey: DayKey): React.ReactNode => intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.WEEKDAYS-SHORT-${dayKey}` }),
    [intl]
  );

  const checkDay = React.useCallback((dayKey: DayKey): void => {
    setActiveDays([dayKey]);
  }, []);

  const getDayLabel = React.useCallback(
    (dayKey: DayKey): React.ReactNode => {
      return dayFormatter(dayKey);
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
          onClear={removeDaySelection}
          texts={EMPTY_OBJECT}
        />
      );
    },
    [activeDays, intl, getDayLabel, handleToggleDay, removeDaySelection, isDayRestricted, disabled]
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
    } as WeeklySchedule;
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
  const getErrorTextsForFormRow = (guid: string) => {
    return activeDays.length === 1 && errorTexts && errorTexts[guid] && errorTexts[guid][activeDays[0]];
  };
  return (
    <S.NewFilterContainer ref={ref as React.RefObject<HTMLDivElement>}>
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
        texts={EMPTY_OBJECT}
        title={renderGridTitle(activeDays.length)}
      />
      {isAnyDaySelected &&
        filteredSchedule.map((guid, index) => (
          <RangeFormContainer
            days={EMPTY_OBJECT}
            onChange={NOOP}
            errorTexts={getErrorTextsForFormRow(guid)}
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
            getDayValue={(dayKey: DayKey): WeeklyScheduleDayValue => getDayValue(dayKey, guid)}
            onRangeDelete={disabled ? undefined : (): void => handleRangeDelete(guid, activeDays)}
            onModeChange={(mode): void => handleModeChange(mode, activeDays, guid)}
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
        <SelectionHint
          message={intl.formatMessage({
            id: 'DS.DATE-RANGE-PICKER.MAXIMUM-RANGES-MESSAGE',
            defaultMessage: 'The maximum amount of ranges have been selected.',
          })}
        />
      )}
      {shouldRenderAddButton && (
        <AddButton
          data-testid="drp-filter-add-range"
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
export default Weekly;
