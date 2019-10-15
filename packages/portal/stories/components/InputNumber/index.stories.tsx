import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { number, text, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import { DSProvider } from '@synerise/ds-core';
import InputNumber from "@synerise/ds-input-number";

storiesOf('Components|Input Number', module)
  .addDecorator(centered)
  .add('default', () => (
    <DSProvider code="en_GB">
      <InputNumber
        min={number('min', 1)}
        max={number('max', 10)}
        defaultValue={number('defaultValue', 3)}
        onChange={action('onChange')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={text('errorText', 'Error')}
      />
    </DSProvider>
  ))
;
