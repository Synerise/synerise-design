import * as React from 'react';
import { text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import ButtonsExample from './ButtonsExample';
import Button from '@synerise/ds-button';
import markdown from '@/button/README.md';

const typeOptions = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Ghost: 'ghost',
  Danger: 'danger',
  Success: 'success',
  Warning: 'warning',
  tertiaryWhite: 'tertiary-white',
  ghostPrimary: 'ghost-primary',
  ghostWhite: 'ghost-white',
};

const buttonSizes = {
  default: 'default',
  large: 'large',
}

const getDefaultProps = () => ({
  htmlType: text('Type button', 'button'),
  type: select('Set type', typeOptions, 'primary'),
  size: select('Set Size', buttonSizes, 'default'),
  onClick: action('onClick CLICK'),
});

const stories = {
  allTypes: () => {
    const props = {
      ...getDefaultProps(),
      style: {
        margin: 4,
      },
    } as object;
    return <ButtonsExample {...props} />
  },
};

export default {
  name: 'Components|Button',
  config: {
    notes: {
      markdown,
    },
  },
  stories,
  Component: Button,
};
