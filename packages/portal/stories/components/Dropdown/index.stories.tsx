import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Dropdown from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';

import Example1 from "./examples/Example1";

const Basic = () => (
  <Dropdown trigger={['click']} overlay={<div>Dropdown overlay content</div>}>
    <Button>Click</Button>
  </Dropdown>
);

storiesOf('Components|Dropdown', module)
  .add('default', Basic)
  .add('example 1', Example1);
