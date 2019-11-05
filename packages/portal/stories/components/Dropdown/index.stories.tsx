import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';
import Example1 from './examples/Example1';

const stories = {
  basic: {
    trigger: ['click'],
    overlay: (<div>Dropdown overlay content</div>),
    children: (<Button>Click</Button>),
  },
  example1: Example1,
};

export default {
  name: 'Components|Dropdown',
  stories,
  Component: Dropdown,
};
