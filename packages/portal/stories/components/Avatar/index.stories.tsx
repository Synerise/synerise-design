import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Avatar from '@synerise/ds-avatar';

const stories = storiesOf('Components|Avatar', module);

stories.add('default', () => {
  return (
    <div style={{ padding: 20 }}>
      <Avatar size={40}>U</Avatar>
    </div>
  );
});

export default stories;
