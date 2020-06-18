import * as React from 'react';
import { DatePicker } from '@synerise/ds-date-picker/dist/DatePicker';


const stories = {
  default: () => {
    return <DatePicker showTime={false} onApply={value => console.log(value)} />;
  }
};

export default {
  name: 'Components|DatePicker',
  config: {},
  stories,
}
