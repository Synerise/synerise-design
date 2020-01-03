import * as React from 'react';

import { text, select } from '@storybook/addon-knobs';

import AppHeader from '@synerise/ds-app-header';
import LogoSVG from './white.svg';

const decorator = (storyFn) => (
  <div style={{ width: 800 }}>
    {storyFn()}
  </div>
);

const stories = {
  default: () => ({
    logo: LogoSVG,
    title: text('title', 'Module name'),
    backgroundColor: select('backgroundColor', {
      'red': 'red',
      'blue': 'blue',
      'green': 'green',
      'grey': 'grey',
      'yellow': 'yellow',
      'pink': 'pink',
      'mars': 'mars',
      'orange': 'orange',
      'fern': 'fern',
      'cyan': 'cyan',
      'purple': 'purple',
      'violet': 'violet',
    }, 'blue'),
  }),
};

export default {
  name: 'Components|AppHeader',
  config: {},
  decorator,
  stories,
  Component: AppHeader,
}
