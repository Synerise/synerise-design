import * as React from 'react';
import { text, select, number, boolean } from '@storybook/addon-knobs';
import Divider from '@synerise/ds-divider';

const decorator = (storyFn) => (
  <div style={{ background: '#fff', width: '300px', padding: '16px' }}>
    {storyFn()}
  </div>
);

const stories = {
  default: () => ({
    dashed: boolean('dashed', false),
    orientation: select('orientation', ['left', 'right', 'center'], 'center'),
    marginTop: number('marginTop', 24),
    marginBottom: number('marginBottom', 24),
    children: text('children', ''),
  }),
};

export default {
  name: 'Components|Divider',
  decorator,
  stories,
  Component: Divider,
};
