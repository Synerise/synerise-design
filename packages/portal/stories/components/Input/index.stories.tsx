import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { number, text, boolean } from '@storybook/addon-knobs';
import { DSProvider } from '@synerise/ds-core';

import { Input, TextArea } from '@synerise/ds-input';

import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/file-m.svg';

storiesOf('Components|Input', module)
  .add('Input', () => (
    <div style={{ width: '300px' }}>
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
    </div>
  ))
  .add('Input with icons', () => (
    <div style={{ width: '300px' }}>
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
          icon1={<Icon component={<FileM />} />}
          icon2={<Icon component={<FileM />} />}
        />
      </DSProvider>
    </div>
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
  ))
  .add('Textarea with icons', () => (
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
        icon1={<Icon component={<FileM />} />}
        icon2={<Icon component={<FileM />} />}
      />
    </DSProvider>
  ))
;
