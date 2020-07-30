import * as React from 'react';
import { Popover } from 'antd';
import RawDateRangePicker from './RawDateRangePicker';
import * as S from './DateRangePicker.styles';
import { Props } from './DateRangePicker.types';
import RangePickerInput from './RangePickerInput/RangePickerInput';
import { DateFilter, DateRange } from './date.types';

const DateRangePicker: React.FC<Props> = props => {
  const { value, onApply, showTime, onValueChange, texts } = props;

  const [selectedDate, setSelectedDate] = React.useState(value);
  const ref = React.useRef<HTMLDivElement>(null);

  const onValueChangeCallback = React.useCallback(
    (val: Partial<DateFilter> | undefined): void => {
      onValueChange && onValueChange(val);
      setSelectedDate(val as DateRange);
    },
    [onValueChange]
  );
  const onApplyCallback = React.useCallback(
    (val: Partial<DateFilter> | undefined): void => {
      onApply && onApply(val);
      setSelectedDate(val as DateRange);
    },
    [onApply]
  );

  return (
    <S.PickerWrapper>
      <Popover
        content={
          <RawDateRangePicker
            {...props}
            ref={ref}
            showTime={showTime}
            onApply={onApplyCallback}
            onValueChange={onValueChangeCallback}
            value={selectedDate}
          />
        }
        overlayStyle={{ maxWidth: '700px', fontWeight: 'unset' }}
        trigger="click"
        arrowPointAtCenter
      >
        <RangePickerInput value={selectedDate} showTime={showTime} texts={texts} onChange={onValueChangeCallback} />{' '}
      </Popover>
    </S.PickerWrapper>
  );
};

export default DateRangePicker;
export { RawDateRangePicker };
