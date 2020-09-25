import * as React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import dayjs from 'dayjs';
import RangeForm from './RangeForm/RangeForm';
import * as S from './DailyFilter.styles';
import TimeWindow from '../TimeWindow/TimeWindow';
import { Row } from './RangeForm/RangeForm.styles';
import AddButton from '../AddButton/AddButton';

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
  console.log('DAILY FILTER VALUE', value);
  return (
    <S.DailyFilterWrapper>
      <TimeWindow
        hideHeader
        numberOfDays={0}
        customDays={{ 0: { label: intl.formatMessage({ id: 'DS.DATE-RANGE-PICKER.EVERY_DAY' }) } }}
        days={[value]}
        onChange={val => {
          console.log('Value:', val);
          handleChange(val);
        }}
        timeMarks={{}}
      />{' '}
      <Row justifyContent="flex-start">
        <AddButton label="Add range" />
      </Row>
    </S.DailyFilterWrapper>
  );
};

export default injectIntl(DailyFilter);
