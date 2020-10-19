import * as React from 'react';
import TimeWindow from '../TimeWindow/TimeWindow';
import { WeeklyFilterProps } from './WeeklyFilter.types';
import * as S from '../RangeFilter.styles';

class WeeklyFilter extends React.PureComponent<WeeklyFilterProps> {
  render(): JSX.Element {
    const { value, onChange, onRangeClear, onRangePaste, onRangeCopy, rangeClipboard, intl } = this.props;
    return (
      <S.WeeklyFilterContainer>
        <TimeWindow
          showSelectAll
          showUnselectAll
          invertibleTime
          dayTemplate={(dayOfWeek: React.ReactText): { day: React.ReactText } => ({ day: dayOfWeek })}
          days={value}
          numberOfDays={7}
          onChange={onChange}
          intl={intl}
          onRangePaste={onRangePaste}
          onRangeCopy={onRangeCopy}
          onRangeClear={onRangeClear}
          rangeClipboard={rangeClipboard}
        />
      </S.WeeklyFilterContainer>
    );
  }
}

export default WeeklyFilter;
