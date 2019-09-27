import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';

import { DSProvider } from '@synerise/ds-core';
import CardSelect from '@synerise/ds-card-select';

storiesOf('Components|CardSelect', module)
  .add('default', () => (
    <DSProvider code="en_GB">
      <div style={{ background: '#fff', width: '300px', padding: '16px' }}>
        <CardSelect />
      </div>
    </DSProvider>
  ))
;