import * as React from 'react';
import { useIntl } from 'react-intl';
import * as S from './RangeSummary.styles';
import { RangeSummaryProps } from './RangeSummary.types';
import { DayKey } from '../TimeWindow.types';
import { SPACE_UNICODE } from '../../../constants';

const RangeSummary: React.FC<RangeSummaryProps> = ({
  dayKeys,
  getDayLabel,
  monthlyFilterPeriod,
  monthlyFilter,
}: RangeSummaryProps) => {
  const intl = useIntl();
  const daysToDisplay = React.useMemo(() => {
    if (monthlyFilter && dayKeys.length > 1) {
      return <S.DayShortname>Days</S.DayShortname>;
    }
    return dayKeys.map((k: DayKey, index: number) => (
      <S.DayShortname key={k}>
        {!monthlyFilter || monthlyFilterPeriod !== 'WEEK' ? getDayLabel(k, false) : null}
        {monthlyFilter && getDayLabel(k, true)}
        {index + 1 !== dayKeys.length && `,${SPACE_UNICODE}`}
      </S.DayShortname>
    ));
  }, [dayKeys, getDayLabel, monthlyFilter, monthlyFilterPeriod]);
  return (
    <S.TitleWrapper>
      {intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.SET_TIME_FOR', defaultMessage: `Set time for:` })}
      {SPACE_UNICODE}
      {daysToDisplay}
    </S.TitleWrapper>
  );
};

export default RangeSummary;
