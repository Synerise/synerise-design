import * as React from 'react';
import { DSProvider } from '@synerise/ds-core';
import { storiesOf } from '@storybook/react';
import ProgressBar from '@synerise/ds-progress-bar';
import { PROGRESS_COLORS } from '@synerise/ds-progress-bar/dist/ProgressBar';

storiesOf('Components|Progress Bar', module)
  .add('Solo bar', () => (
    <div style={{width: '200px'}}>
      <DSProvider code="en_GB">
        <div style={{ background: "#fff", padding: '16px', width: '600px' }}>
          <ProgressBar amount={60} percent={50} showLabel={false} />
        </div>
      </DSProvider>
    </div>
  ))
  .add('Solo bar with label', () => (
    <div style={{width: '200px'}}>
      <DSProvider code="en_GB">
        <div style={{ background: "#fff", padding: '16px', width: '600px' }}>
          <ProgressBar amount={60} percent={60} showLabel={true} />
        </div>
      </DSProvider>
    </div>
  ))
  .add('Solo bar with label and description', () => (
    <div style={{width: '200px'}}>
      <DSProvider code="en_GB">
        <div style={{ background: "#fff", padding: '16px', width: '600px' }}>
          <ProgressBar amount={60} percent={60} showLabel={true} description="Description" />
        </div>
      </DSProvider>
    </div>
  ))
