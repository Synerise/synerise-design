import React from 'react';

import { SPACE_UNICODE } from '../../../constants';
import { type DayKey } from '../TimeWindow.types';
import * as S from './RangeSummary.styles';
import { type RangeSummaryProps } from './RangeSummary.types';

const RangeSummary: React.FC<RangeSummaryProps> = ({
  dayKeys,
  getDayLabel,
  monthlyFilterPeriod,
  monthlyFilter,
  texts,
}: RangeSummaryProps) => {
  const daysToDisplay = React.useMemo(() => {
    if (monthlyFilter && dayKeys.length > 1) {
      return <S.DayShortname>Days</S.DayShortname>;
    }
    return dayKeys.map((k: DayKey, index: number) => (
      <S.DayShortname key={k}>
        {!monthlyFilter || monthlyFilterPeriod !== 'WEEK'
          ? getDayLabel(k, false)
          : null}
        {monthlyFilter && getDayLabel(k, true)}
        {index + 1 !== dayKeys.length && `,${SPACE_UNICODE}`}
      </S.DayShortname>
    ));
  }, [dayKeys, getDayLabel, monthlyFilter, monthlyFilterPeriod]);
  return (
    <S.TitleWrapper>
      {texts.setTimeFor}
      {SPACE_UNICODE}
      {daysToDisplay}
    </S.TitleWrapper>
  );
};

export default RangeSummary;
