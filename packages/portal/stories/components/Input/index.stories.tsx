import * as React from 'react';
import { storiesOf } from '@storybook/react';

import {
  InputBasic,
  InputWithIcons,
  InputWithPreSelect,
  TextAreaBasic,
  TextAreaWithIcons
} from "./examples/Examples";

storiesOf('Components|Input', module)
  .add('Input', InputBasic)
  .add('InputGroup', InputWithPreSelect)
  .add('Input with icons', InputWithIcons)
  .add('Textarea', TextAreaBasic)
  .add('Textarea with icons', TextAreaWithIcons)
;
