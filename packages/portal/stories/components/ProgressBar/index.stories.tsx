import * as React from 'react';
import ProgressBar from '@synerise/ds-progress-bar';
import { PROGRESS_COLORS, PROGRESS_STROKE_LINECAP } from '@synerise/ds-progress-bar/dist/ProgressBar';

const decorator = (storyFn) => (
  <div style={{ background: "#fff", padding: '16px', width: '600px' }}>
    {storyFn()}
  </div>
);

const stories = {
  soloBar: {
    amount: 60,
    percent: 50,
    showLabel: false,
  },
  soloBarWithLabel: {
    amount: 60,
    percent: 60,
    showLabel: true,
  },
  soloBarWithLabelAndDescription: {
    amount: 60,
    percent: 60,
    showLabel: true,
    description: 'Description',
    strokeColor: PROGRESS_COLORS.MARS,
  },
};

export default {
  name: 'Components|Progress Bar',
  decorator,
  stories,
  Component: ProgressBar,
};
