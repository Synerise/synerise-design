import * as React from 'react';

import { storiesOf } from '@storybook/react';

import Input from '@synerise/ds-input';

storiesOf('Components|Input', module)
  .add('default', () => <Input placeholder="Basic input" />)
  .add('Basic', () => <Input placeholder="Basic input" />)
  .add('Textarea', () => <Input.TextArea placeholder="Text Area" rows={4} />);
