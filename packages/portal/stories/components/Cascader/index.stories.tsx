import * as React from 'react';
import Cascader from '@synerise/ds-cascader';
import * as mock from './mock.json';

const decorator = storyFn => (
  <div style={{ width: '100vw', position: 'absolute', left: '0', top: '10vh' }}>
    <div style={{ width: '300px', margin: 'auto' }}>{storyFn()}</div>
  </div>
);

const stories = {
  default: () => {
    const routes = mock.default;
    return (
      <Cascader
        itemsTitle={'Items'}
        categories={routes}
      />
    );
  },

};

export default {
  name: 'Components|Cascader',
  config: {},
  stories,
  decorator,
};
