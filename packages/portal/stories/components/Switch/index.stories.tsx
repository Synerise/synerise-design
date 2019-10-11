import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { action } from '@storybook/addon-actions';
import { DSProvider } from "@synerise/ds-core";

import Switch from '@synerise/ds-switch';
import markdown from '@/radio/README.md';

const config = {
  notes: { markdown },
};

storiesOf('Components|Switch', module)
  .addDecorator(centered)
  .add('default', () => (
    <DSProvider code="en_GB">
      <Switch
        defaultChecked
        disabled={boolean('disabled', false)}
        onChange={action('onChange')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={text('errorText', 'Error')}
      />
    </DSProvider>
  ), config);
