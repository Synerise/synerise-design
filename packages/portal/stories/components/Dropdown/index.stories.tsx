import * as React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';
import Dropdown from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';

import Example1 from "./examples/Example1";
import { DSProvider } from "../../../../components/core";

const Basic = () => (
  <DSProvider code="en_GB">
    <Dropdown trigger={['click']} overlay={<div>Dropdown overlay content</div>}>
      <Button>Click</Button>
    </Dropdown>
  </DSProvider>
);

storiesOf('Components|Dropdown', module)
  .addDecorator(centered)
  .add('default', Basic)
  .add('example 1', Example1);
