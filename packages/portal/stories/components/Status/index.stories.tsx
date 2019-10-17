import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import { DSProvider } from '@synerise/ds-core';
import Status from '@synerise/ds-status';

storiesOf('Components|Status', module)
.add('default', () => {
  const typeOptions = {
    primary: 'primary',
    success: 'success',
    warning: 'warning',
    danger: 'danger',
    disabled: 'disabled',
  };

  const type = select('Type', typeOptions, 'primary');

  return (
    <DSProvider code="en_GB">
      <div style={{ padding: 12 }}>
        <Status type={type} label="This is a status" />
      </div>
    </DSProvider>
  );
});