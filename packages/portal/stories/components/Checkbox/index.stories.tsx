import * as React from 'react';
import { DSProvider } from '@synerise/ds-core';
import { storiesOf } from "@storybook/react";
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Checkbox from '@synerise/ds-checkbox';

storiesOf('Components|Checkbox', module)
  .add('default', () => (
    <DSProvider code="en_GB">
      <Checkbox
        onChange={action('changed')}
        disabled={boolean('disabled', false)}
        indeterminate={boolean('indeterminate', false)}
        description={text('description', '')}
        errorText={text('errorText', '')}
      >
        {text('children', 'Option')}
      </Checkbox>
    </DSProvider>
  ))
  .add('solo', () => (
    <DSProvider code="en_GB">
      <Checkbox
        onChange={action('changed')}
        disabled={boolean('disabled', false)}
        indeterminate={boolean('indeterminate', false)}
      />
    </DSProvider>
  ))
  .add('group', () => (
    <DSProvider code="en_GB">
      <Checkbox.Group
        onChange={values => console.log('Checked values', values)}
      >
        <Checkbox
          disabled={boolean('disabled', false)}
          indeterminate={boolean('indeterminate', false)}
          description={text('description', '')}
          errorText={text('errorText', '')}
          value="A"
        >
          {text('children', 'Option')}
        </Checkbox>
        <Checkbox
          disabled={boolean('disabled', false)}
          indeterminate={boolean('indeterminate', false)}
          description={text('description', '')}
          errorText={text('errorText', '')}
          value="B"
        >
          {text('children', 'Option')}
        </Checkbox>
      </Checkbox.Group>
    </DSProvider>
  ));
