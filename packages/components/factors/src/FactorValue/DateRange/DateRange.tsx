import * as React from 'react';
import DateRangePicker from '@synerise/ds-date-range-picker';
import { DateFilter, DateRange } from '@synerise/ds-date-range-picker/dist/date.types';
import { useIntl } from 'react-intl';
import { InputProps } from '../../Factors.types';

const DateRangeInput: React.FC<InputProps> = ({ value, onChange, texts }) => {
  const intl = useIntl();

  const changeHandler = React.useCallback(
    (date: Partial<DateFilter> | undefined) => {
      onChange(date);
    },
    [onChange]
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
      }}
    />
  );
};

export default DateRangeInput;
