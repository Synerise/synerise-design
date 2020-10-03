import * as React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import * as S from './DailyFilter.styles';
import TimeWindow from '../TimeWindow/TimeWindow';

export interface Props extends WrappedComponentProps {
  value: string;
  onChange: (v: string) => {};
}

const DailyFilter: React.FC<Props> = props => {
  const handleChange = (value: any) => {
    const { onChange } = props;
    onChange && onChange(value[0]);
  };
  const { value, intl } = props;
  console.log("VALUE: ",value)
  return (
    <S.DailyFilterWrapper>
      <TimeWindow
        hideHeader
        numberOfDays={0}
        customDays={{ 0: { label: intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.EVERY_DAY' }) } }}
        days={value[0] ? value[0] : value}
        onChange={val => {
          handleChange(val);
        }}
        timeMarks={{}}
        daily
      />{' '}
    </S.DailyFilterWrapper>
  );
};

export default injectIntl(DailyFilter);
