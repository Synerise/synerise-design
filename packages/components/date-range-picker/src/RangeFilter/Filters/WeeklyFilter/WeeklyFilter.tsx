import React from 'react';

import * as S from '../../RangeFilter.styles';
import TimeWindow from '../../Shared/TimeWindow/TimeWindow';
import { type DayKey, type WeeklyFilterProps } from './WeeklyFilter.types';

const WeeklyFilter = ({
  value,
  onChange,
  onRangeClear,
  onRangePaste,
  onRangeCopy,
  rangeClipboard,
  intl,
  valueSelectionModes,
  rangeDisplayMode,
  texts,
}: WeeklyFilterProps): JSX.Element => {
  const handleDayFormatter = React.useCallback(
    (dayKey: DayKey): React.ReactNode =>
      intl.formatMessage({
        id: `DS.DATE-RANGE-PICKER.WEEKDAYS-SHORT-${dayKey}`,
      }),
    [intl],
  );

  const handleDayTemplate = React.useCallback(
    (dayOfWeek: React.ReactText): { day: React.ReactText } => ({
      day: dayOfWeek,
    }),
    [],
  );
  return (
    <S.WeeklyFilterContainer>
      <TimeWindow
        texts={texts}
        showSelectAll
        // @ts-expect-error: FIXME:  Property 'invertibleTime' does not exist on type
        invertibleTime
        dayFormatter={handleDayFormatter}
        dayTemplate={handleDayTemplate}
        days={value}
        numberOfDays={7}
        onChange={onChange}
        intl={intl}
        onRangePaste={onRangePaste}
        onRangeCopy={onRangeCopy}
        onRangeClear={onRangeClear}
        rangeClipboard={rangeClipboard}
        valueSelectionModes={valueSelectionModes}
        rangeDisplayMode={rangeDisplayMode}
      />
    </S.WeeklyFilterContainer>
  );
};

export default WeeklyFilter;
