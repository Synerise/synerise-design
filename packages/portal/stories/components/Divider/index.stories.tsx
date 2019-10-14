import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select, number } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import { DSProvider } from "@synerise/ds-core";
import Divider from '@synerise/ds-divider';

storiesOf('Components|Divider', module)
  .addDecorator(centered)
  .add('default', () => (
    <DSProvider code="en_GB">
      <div style={{ background: '#fff', width: '300px', padding: '16px' }}>
        <Divider
          dashed={boolean('dashed', false)}
          orientation={select('orientation', ['left', 'right', 'center'], 'center')}
          marginTop={number('marginTop', 24)}
          marginBottom={number('marginBottom', 24)}
        >
          {text('children', '')}
        </Divider>
      </div>
    </DSProvider>
  ))
;
