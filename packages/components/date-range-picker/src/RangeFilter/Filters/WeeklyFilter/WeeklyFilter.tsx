import * as React from 'react';
import TimeWindow from '../../Shared/TimeWindow/TimeWindow';
import { WeeklyFilterProps } from './WeeklyFilter.types';
import * as S from '../../RangeFilter.styles';
import { DayKey } from '../../Shared/TimeWindow/TimeWindow.types';

const WeeklyFilter = ({
  value,
  onChange,
  onRangeClear,
  onRangePaste,
  onRangeCopy,
  rangeClipboard,
  intl,
  valueSelectionModes,
  texts,
}: WeeklyFilterProps): JSX.Element => {
  const handleDayFormatter = React.useCallback(
    (dayKey: DayKey): React.ReactNode => intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.WEEKDAYS-SHORT-${dayKey}` }),
    [intl]
  );
  const handleDayTemplate = React.useCallback(
    (dayOfWeek: React.ReactText): { day: React.ReactText } => ({ day: dayOfWeek }),
    []
  );
  return (
    <S.WeeklyFilterContainer>
      <TimeWindow
        texts={texts}
        showSelectAll
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
      />
    </S.WeeklyFilterContainer>
  );
};

export default WeeklyFilter;
