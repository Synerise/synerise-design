import * as React from 'react';
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Radio from '@synerise/ds-radio';

storiesOf('Components|Radio', module)
  .add('basic', () => <Radio>Radio label</Radio>)
  .add('disabled', () => <Radio disabled>Radio label</Radio>)
  .add('solid group', () => (
    <Radio.Group buttonStyle="solid" defaultValue="a" onChange={action('changed')}>
      <Radio.Button value="a">A</Radio.Button>
      <Radio.Button value="b">B</Radio.Button>
      <Radio.Button value="c">C</Radio.Button>
    </Radio.Group>
  ));
