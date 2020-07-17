import * as React from 'react';
import DatePicker from '@synerise/ds-date-picker/dist/DatePicker';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

const stories = {
  default: () => {
    const showTime = boolean('Show time',true);
    return (
      <div>
        <DatePicker
          showTime={showTime}
          onApply={value => {
            action('Selected', value);
          }}
          texts={{
            apply:'Apply',
            inputPlaceholder: 'Select date',
            clearTooltip: 'Clear',
          }}
        />
      </div>
    );
  },
};
const decorator = storyFn => (
  <div style={{ width: '100vw', position: 'absolute', left: '0', top: '20vh' }}>
    <div style={{ width: '200px', margin: 'auto' }}>{storyFn()}</div>
  </div>
);
export default {
  name: 'Pickers|DatePicker',
  config: {},
  stories,
  decorator,
};
