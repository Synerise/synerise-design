import * as React from 'react';
import { select } from '@storybook/addon-knobs';
import Status from '@synerise/ds-status';

const decorator = (storyFn) => (
  <div style={{ padding: 12 }}>
    {storyFn()}
  </div>
);

const typeOptions = {
  primary: 'primary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  disabled: 'disabled',
};

const stories = {
  status: () => ({
    type: select('Type', typeOptions, 'primary'),
    label: 'This is a status',
  }),
};

export default {
  name: 'Components|Tags',
  decorator,
  stories,
  Component: Status,
};
