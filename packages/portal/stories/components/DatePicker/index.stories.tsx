import * as React from 'react';
import { DatePicker, DatePickerInput } from '@synerise/ds-date-picker/dist/DatePicker';
import TimePicker from '@synerise/ds-time-picker/dist/TimePicker';
import * as moment from 'moment'

const stories = {
  default: () => {
    const [value,setValue] = React.useState();
    return (
      <div>
        <DatePicker
          showTime={true}
          onApply={value => setValue(value)}
          texts={{
            selectTime: 'Select time',
            selectDate: 'Select date',
            apply: 'Apply',
          }}
        />
        <DatePickerInput format={'YYYY-MM-HH'} disabledHours={[]} disabledMinutes={[]} disabledSeconds={[]} value={moment(value)} />
      </div>
    );
  },
};

export default {
  name: 'Components|DatePicker',
  config: {},
  stories,
};
