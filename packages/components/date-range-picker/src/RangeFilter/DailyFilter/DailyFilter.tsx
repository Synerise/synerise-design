import * as React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import * as S from './DailyFilter.styles';
import TimeWindow from '../TimeWindow/TimeWindow';
import { RangeActions as RangeActionsMethods } from '../TimeWindow/TimeWindow.types';
import { Days } from '../../date.types';

export interface Props extends WrappedComponentProps, Partial<RangeActionsMethods> {
  value: string;
  onChange: (v: Days) => {};
}

const DailyFilter: React.FC<Props> = props => {
  const handleChange = (value: Days): void => {
    const { onChange } = props;
    onChange && onChange(value[0] as Days);
  };
  const { value, intl, onRangeCopy, onRangePaste, onRangeClear } = props;
  return (
    <S.DailyFilterWrapper>
      <TimeWindow
        hideHeader
        numberOfDays={0}
        customDays={{ 0: { label: intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.EVERY_DAY' }) } }}
        days={value[0] ? value[0] : value}
        onChange={(val: Days): void => {
          handleChange(val);
        }}
        daily
        onRangePaste={onRangePaste}
        onRangeCopy={onRangeCopy}
        onRangeClear={onRangeClear}
      />{' '}
    </S.DailyFilterWrapper>
  );
};

export default injectIntl(DailyFilter);