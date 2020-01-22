import * as React from 'react';
import ProgressBar from '@synerise/ds-progress-bar';

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
    strokeColor: '#ff5a4d',
  },
};

export default {
  name: 'Components|Progress Bar',
  decorator,
  stories,
  Component: ProgressBar,
};
