import * as React from 'react';
import { Popover } from 'antd';
import RawDateRangePicker from './RawDateRangePicker';
import * as S from './DateRangePicker.styles';
import { Props } from './DateRangePicker.types';
import RangePickerInput from './RangePickerInput/RangePickerInput';
import { DateFilter, DateRange } from './date.types';

const DateRangePicker: React.FC<Props> = props => {
  const { value, onApply, showTime, onValueChange, texts } = props;
  const [popupVisible, setPopupVisible] = React.useState<false | undefined>(undefined);
  const [selectedDate, setSelectedDate] = React.useState(value);

  React.useEffect(() => {
    if (popupVisible !== undefined) {
      setPopupVisible(undefined);
    }
  });

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
      setPopupVisible(false);
    },
    [onApply]
  );

  const conditionalVisibilityProps = {
    ...(popupVisible === false && { visible: false }),
  };
  return (
    <S.PickerWrapper>
      <Popover
        content={
          <RawDateRangePicker
            {...props}
            showTime={showTime}
            onApply={onApplyCallback}
            onValueChange={onValueChangeCallback}
            value={selectedDate}
          />
        }
        trigger="click"
        overlayStyle={{ maxWidth: '700px', fontWeight: 'unset' }}
        {...conditionalVisibilityProps}
      >
        <RangePickerInput
          onClick={(): void => setPopupVisible(undefined)}
          value={selectedDate}
          showTime={showTime}
          texts={texts}
          onChange={onValueChangeCallback}
        />{' '}
      </Popover>
    </S.PickerWrapper>
  );
};

export default DateRangePicker;
export { RawDateRangePicker };
