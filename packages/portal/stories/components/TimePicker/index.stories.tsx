import * as React from 'react';

import { select } from '@storybook/addon-knobs';

import TimePicker from '@synerise/ds-time-picker';

const stories = {
  default: () => ({
    placement: select('placement', {
      topLeft: 'topLeft',
      topCenter: 'topCenter',
      topRight: 'topRight',
      bottomLeft: 'bottomLeft',
      bottomCenter: 'bottomCenter',
      bottomRight: 'bottomRight',
    }, undefined)
  }),
};

export default {
  name: 'Components|TimePicker',
  config: {},
  stories,
  Component: TimePicker,
}
