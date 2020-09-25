import * as React from 'react';
import * as S from './RangeSummary.styles';
import { RangeSummaryProps } from './RangeSummary.types';

const RangeSummary: React.FC<RangeSummaryProps> = ({ dayKeys, getDayLabel }: RangeSummaryProps) => {
  let daysToDisplay;
  if (!(dayKeys instanceof Array)) {
    daysToDisplay = <S.DayShortname key={dayKeys}>{getDayLabel(dayKeys, true)}</S.DayShortname>;
    /*const selectedDaysLabels = keys.map((k, index) => (
      <S.DayShortname key={k}>
        {getDayLabel(k, true)}
        {index + 1 !== keys.length && ', '}
      </S.DayShortname>
    ));*/
  }
  return <S.TitleWrapper>Set time for: {daysToDisplay}</S.TitleWrapper>;
};

export default RangeSummary;
