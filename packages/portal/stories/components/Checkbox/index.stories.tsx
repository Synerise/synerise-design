import * as React from 'react';
import { storiesOf } from "@storybook/react";
import { action } from '@storybook/addon-actions';

import Checkbox from '@synerise/ds-checkbox';

storiesOf('Components|Checkbox', module)
  .add('default', () => <Checkbox onChange={action('changed')}>Checkbox Label</Checkbox>)
  .add('disabled', () => <Checkbox disabled onChange={action('changed')}>Checkbox Label</Checkbox>);
