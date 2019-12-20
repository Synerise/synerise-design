import * as React from 'react';

import { select, text, boolean, array } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';

import TimePicker from '@synerise/ds-time-picker';

const stories = {
  default: withState({
    value: null,
  })(({ store }) => {
    const placeholder = text('placeholder', 'Select time');
    const timeFormat = text('timeFormat', undefined);
    const placement = select('placement', {
      topLeft: 'topLeft',
      topCenter: 'topCenter',
      topRight: 'topRight',
      bottomLeft: 'bottomLeft',
      bottomCenter: 'bottomCenter',
      bottomRight: 'bottomRight',
    }, undefined);
    const use12HourClock = boolean('use12HourClock', false);
    const disabled = boolean('disabled', false);
    const disabledHours = array('disabledHours', [], ',').map(Number);
    const disabledMinutes = array('disabledMinutes', [], ',').map(Number);
    const disabledSeconds = array('disabledSeconds', [], ',').map(Number);

    const onChange = (newValue: Date) => {
      console.log('date changed', newValue)
      store.set({
        value: newValue,
      })
    };

    return (
      <TimePicker value={store.state.value} disabledHours={disabledHours} disabledMinutes={disabledMinutes} disabledSeconds={disabledSeconds} disabled={disabled} use12HourClock={use12HourClock} timeFormat={timeFormat} placeholder={placeholder} placement={placement} onChange={onChange} />
    )
  }),
};

export default {
  name: 'Components|TimePicker',
  config: {},
  stories,
  Component: TimePicker,
}
