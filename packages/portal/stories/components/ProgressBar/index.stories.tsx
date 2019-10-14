import * as React from 'react';
import { DSProvider } from '@synerise/ds-core';
import { storiesOf } from '@storybook/react';
import ProgressBar from '@synerise/ds-progress-bar';
import centered from '@storybook/addon-centered/react';

import { PROGRESS_COLORS } from '@synerise/ds-progress-bar/dist/ProgressBar';

storiesOf('Components|Progress Bar', module)
  .addDecorator(centered)
  .add('Solo bar', () => (
      <DSProvider code="en_GB">
        <div style={{ background: "#fff", padding: '16px', width: '600px' }}>
          <ProgressBar amount={60} percent={50} showLabel={false} />
        </div>
      </DSProvider>
  ))
  .add('Solo bar with label', () => (
      <DSProvider code="en_GB">
        <div style={{ background: "#fff", padding: '16px', width: '600px' }}>
          <ProgressBar amount={60} percent={60} showLabel={true} />
        </div>
      </DSProvider>
  ))
  .add('Solo bar with label and description', () => (
      <DSProvider code="en_GB">
        <div style={{ background: "#fff", padding: '16px', width: '600px' }}>
          <ProgressBar amount={60} percent={60} showLabel={true} description="Description" />
        </div>
      </DSProvider>
  ))
