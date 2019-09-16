import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { number, text, boolean } from '@storybook/addon-knobs';
import { DSProvider } from '@synerise/ds-core';

import { Input, TextArea } from '@synerise/ds-input';

storiesOf('Components|Input', module)
  .add('Input', () => (
    <DSProvider code="en_GB">
      <Input
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={text('errorText', 'Error message')}
        counterLimit={number('counterLimit', 10)}
        disabled={boolean('disabled', false)}
        onChange={action('onChange')}
        value={text('value', '')}
      />
    </DSProvider>
  ))
  .add('Textarea', () => (
    <DSProvider code="en_GB">
      <TextArea
        rows={number('rows', 4)}
        placeholder={text('placeholder', 'Placeholder')}
        label={text('label', 'Label')}
        description={text('description', 'Description')}
        errorText={text('errorText', 'Error message')}
        counterLimit={number('counterLimit', 10)}
        disabled={boolean('disabled', false)}
        onChange={action('onChange')}
      />
    </DSProvider>
  ));
