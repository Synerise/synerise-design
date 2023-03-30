import * as React from 'react';
import DatePicker from '@synerise/ds-date-picker/dist/DatePicker';
import { action } from '@storybook/addon-actions';
import { boolean, text, object } from '@storybook/addon-knobs';

const stories = {
  default: () => {
    const showTime = boolean('Show time', true);
    const disabled = boolean('Set disabled', false);
    const prefixel = text('prefixel', 'Prefixel');
    const suffixel = text('suffixel', 'Suffixel');
    const hideNow = boolean('Hide now button', false);
    const readOnly = boolean('Set readOnly', false);
    const valueFormatOptions = object('valueFormatOptions', {});

    return (
      <div>
        <DatePicker
          disabled={disabled}
          showTime={showTime}
          prefixel={prefixel}
          suffixel={suffixel}
          onApply={value => {
            action('Selected', value);
          }}
          useStartOfDay
          texts={{
            apply: 'Apply',
            inputPlaceholder: 'Select date',
            clearTooltip: 'Clear',
          }}
          hideNow={hideNow}
          readOnly={readOnly}
          valueFormatOptions={valueFormatOptions}
        />
      </div>
    );
  },
};
const decorator = storyFn => (
  <div style={{ width: '100vw', position: 'absolute', left: '0', top: '20vh' }}>
    <div style={{ width: '320px', margin: 'auto' }}>{storyFn()}</div>
  </div>
);
export default {
  name: 'Components/Pickers/DatePicker',
  config: {},
  stories,
  decorator,
};
