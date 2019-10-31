import * as React from 'react';

import message from '@synerise/ds-message';
import Button from '@synerise/ds-button';

const decorator = (storyFn) => (
  <div style={{ padding: 12 }}>
    {storyFn()}
  </div>
);


const Component: React.FC = () => <Button onClick={() => message.success('Thanks!')}>Click me!</Button>;

const stories = {
  default: () => ({}),
};

export default {
  name: 'Components|Message',
  stories,
  decorator,
  Component,
};
