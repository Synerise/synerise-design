import * as React from 'react';
import { storiesOf } from "@storybook/react";

import Dropdown from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';

const Basic = () => (
  <Dropdown trigger={["click"]} overlay={<div>Dropdown overlay content</div>}>
    <Button>Click</Button>
  </Dropdown>
);

storiesOf('Components|Dropdown', module)
  .add('basic', Basic);