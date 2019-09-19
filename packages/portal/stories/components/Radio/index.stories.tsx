import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { number, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { DSProvider } from "@synerise/ds-core";

import Radio from '@synerise/ds-radio';
import markdown from '@/radio/README.md';

const config = {
  notes: { markdown },
};

storiesOf('Components|Radio', module)
  .add('default', () => (
    <DSProvider code="en_GB">
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
    </DSProvider>
  ), config);
