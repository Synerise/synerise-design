import * as React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Radio from '@synerise/ds-radio';
import markdown from '@/radio/README.md';

const stories = {
  default: () => (
    <Radio.Group onChange={action('onChange')} defaultValue="A">
      <Radio
        disabled={boolean('disabled', false)}
        description={text('description', 'Description')}
        value="A"
      >
        {text('children', 'Label')}
      </Radio>
      <Radio
        disabled={boolean('disabled', false)}
        description={text('description', 'Description')}
        value="B"
      >
        {text('children', 'Label')}
      </Radio>
    </Radio.Group>
  ),
  radioButtons: () => (
    <Radio.Group defaultValue="a" buttonStyle="solid" onChange={action('onChange')}>
      <Radio.Button value="a">A</Radio.Button>
      <Radio.Button value="b" disabled={boolean('disable B', false)}>B</Radio.Button>
      <Radio.Button value="c">C</Radio.Button>
      <Radio.Button value="d">D</Radio.Button>
    </Radio.Group>
  ),
};

export default {
  name: 'Components|Radio',
  config: {
    notes: {
      markdown,
    },
  },
  stories,
  Component: Radio,
};
