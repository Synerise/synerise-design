import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { number, text, boolean } from '@storybook/addon-knobs';
import { DSProvider } from '@synerise/ds-core';
import InputNumber from "@synerise/ds-input-number";

storiesOf('Components|Input Number', module)
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
