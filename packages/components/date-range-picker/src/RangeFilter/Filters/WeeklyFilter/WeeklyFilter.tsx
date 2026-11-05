import React, { type ReactElement, type ReactNode } from 'react';

import * as S from '../../RangeFilter.styles';
import TimeWindow from '../../Shared/TimeWindow/TimeWindow';
import type { DayKey } from '../../Shared/TimeWindow/TimeWindow.types';
import type { WeeklyFilterProps } from './WeeklyFilter.types';

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
}: WeeklyFilterProps): ReactElement => {
  const handleDayFormatter = React.useCallback(
    (dayKey: DayKey): ReactNode =>
      intl.formatMessage({
        id: `DS.DATE-RANGE-PICKER.WEEKDAYS-SHORT-${dayKey}`,
      }),
    [intl],
  );

  const handleDayTemplate = React.useCallback(
    (dayOfWeek: string | number): { day: string | number } => ({
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
