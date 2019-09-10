import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import markdown from '@/button/README.md'
import Button from '@synerise/ds-button';
const config = {
    notes: { markdown },
}
storiesOf('Components|Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>, config)
  .add('with some emoji', () => (
    <Button type="primary" onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ), config);
