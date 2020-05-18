import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';
import Example1 from './examples/Example1';
import withCascader from './examples/withCascader';

const decorator = storyFn => (
  <div style={{ width: '100vw', position: 'absolute', left: '0', top: '20vh' }}>
    <div style={{ width: '300px', margin: 'auto', display:'flex', justifyContent:'center' }}>{storyFn()}</div>
  </div>
);


const stories = {
  basic: {
    trigger: ['click'],
    overlay: (<div>Dropdown overlay content</div>),
    children: (<Button>Click</Button>),
  },
  example1: Example1,
  withCascader: withCascader,
};

export default {
  name: 'Components|Dropdown',
  stories,
  Component: Dropdown,
  decorator,
};
