import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';

import { DSProvider } from "@synerise/ds-core";
import Divider from '@synerise/ds-divider';

storiesOf('Components|Divider', module)
  .add('default', () => (
    <DSProvider code="en_GB">
      <div style={{ background: '#fff', width: '300px', padding: '16px' }}>
        <Divider
          dashed={boolean('dashed', false)}
          orientation={select('orientation', ['left', 'right', 'center'], 'center')}
        >
          {text('children', '')}
        </Divider>
      </div>
    </DSProvider>
  ))
;