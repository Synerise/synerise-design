import * as React from 'react';

import { select, text, boolean, array, number } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';

import TimePicker from '@synerise/ds-time-picker';

const stories = {
  default: withState({
    value: undefined,
  })(({ store }) => {
    const timeFormat = text('Set timeFormat', undefined);
    const placement = select('Set placement of timepicker', {
      topLeft: 'topLeft',
      topCenter: 'topCenter',
      topRight: 'topRight',
      bottomLeft: 'bottomLeft',
      bottomCenter: 'bottomCenter',
      bottomRight: 'bottomRight',
    }, undefined);
    const disabled = boolean('Disabled', false);
    const alwaysOpen = boolean('Always open', false);
    const disabledHours = array('Disabled hours', [], ',').map(Number);
    const disabledMinutes = array('Disabled minutes', [], ',').map(Number);
    const disabledSeconds = array('Disabled seconds', [], ',').map(Number);
    const units = array('Available units', undefined, ',');
    const placeholder = text('Set placeholder', 'Select time');
    const clearTooltip = text('Set clear tooltip', 'Clear');

    const onChange = (newValue: Date) => {
      store.set({
        value: newValue,
      })
    };

    return (
      <div style={{width: number('Width', 200, {min: 104, max: 208})}}>
        <TimePicker
          alwaysOpen={alwaysOpen}
          units={units as any[]}
          value={store.state.value}
          disabledHours={disabledHours}
          disabledMinutes={disabledMinutes}
          disabledSeconds={disabledSeconds}
          disabled={disabled}
          timeFormat={timeFormat}
          placeholder={placeholder}
          clearTooltip={clearTooltip}
          placement={placement}
          onChange={onChange}
          raw={boolean('Raw',false)}
        />
      </div>
    )
  }),
};

export default {
  name: 'Components|TimePicker',
  config: {},
  stories,
  Component: TimePicker,
}
