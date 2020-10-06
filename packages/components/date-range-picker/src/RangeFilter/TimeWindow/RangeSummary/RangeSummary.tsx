import * as React from 'react';
import * as S from './RangeSummary.styles';
import { RangeSummaryProps } from './RangeSummary.types';
import { DayKey } from '../TimeWindow.types';

const SPACE_UNICODE = '\u00A0';
const RangeSummary: React.FC<RangeSummaryProps> = ({ dayKeys, getDayLabel, monthlyFilter }: RangeSummaryProps) => {
  const daysToDisplay = React.useMemo(() => {
    return dayKeys
      .sort((a, b) => a - b)
      .map((k: DayKey, index: number) => (
        <S.DayShortname key={k}>
          {getDayLabel(k, false)}
          {monthlyFilter && getDayLabel(k, true)}
          {index + 1 !== dayKeys.length && `,${SPACE_UNICODE}`}
        </S.DayShortname>
      ));
  }, [dayKeys, getDayLabel, monthlyFilter]);
  return <S.TitleWrapper>Set time for: {daysToDisplay}</S.TitleWrapper>;
};

export default RangeSummary;
