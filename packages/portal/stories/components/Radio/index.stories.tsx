import * as React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Radio from '@synerise/ds-radio';
import markdown from '@/radio/README.md';

const stories = {

  default: () => {
    const tooltipTitle = text('tooltip label', 'Label');
    const setTooltip = boolean('show tooltip', false)
    return (
    <Radio.Group onChange={action('onChange')} defaultValue="A">
      <Radio
        disabled={boolean('disabled', false)}
        description={text('description', 'Description')}
        title={tooltipTitle}
        tooltip={setTooltip}
        value="A"
      />
      <Radio
        disabled={boolean('disabled', false)}
        description={text('description', 'Description')}
        title={tooltipTitle}
        tooltip={setTooltip}
        value="B"
      />
    </Radio.Group>
  )},
  radioButtons: () => (
    <Radio.Group defaultValue="a" buttonStyle="solid" onChange={action('onChange')} fullWidth={boolean('fullWidth', false)} big={boolean('big', false)}>
      <Radio.Button value="a">A</Radio.Button>
      <Radio.Button value="b" disabled={boolean('disable B', false)}>B</Radio.Button>
      <Radio.Button value="c">C</Radio.Button>
      <Radio.Button value="d">D</Radio.Button>
    </Radio.Group>
  ),
};

export default {
name: 'Components/Radio',
  config: {
    notes: {
      markdown,
    },
  },
  stories,
  Component: Radio,
};
