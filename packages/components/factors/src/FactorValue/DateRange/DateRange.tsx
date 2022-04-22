import * as React from 'react';
import DateRangePicker from '@synerise/ds-date-range-picker';
import { DateFilter, DateRange } from '@synerise/ds-date-range-picker/dist/date.types';
import { useIntl } from 'react-intl';
import { InputProps } from '../../Factors.types';

const DateRangeInput: React.FC<InputProps> = ({ value, onChange, texts, onDeactivate }) => {
  const intl = useIntl();

  const changeHandler = React.useCallback(
    (date: Partial<DateFilter> | undefined) => {
      onChange(date);
    },
    [onChange]
  );

  const handleVisibleChange = React.useCallback(
    visible => {
      if (!visible) {
        onDeactivate && onDeactivate();
      }
    },
    [onDeactivate]
  );

  return (
    <DateRangePicker
      intl={intl}
      onApply={changeHandler}
      showTime
      showFilter
      value={value as DateRange}
      texts={texts.dateRangePicker}
      relativeFuture={false}
      relativeModes={['PAST']}
      showRelativePicker
      popoverProps={{
        placement: 'bottomLeft',
        onVisibleChange: handleVisibleChange,
      }}
    />
  );
};

export default DateRangeInput;
