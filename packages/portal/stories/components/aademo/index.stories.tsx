import * as React from 'react';

import { text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions';
import * as accmenu from '../AccordionMenu/index.stories'

export const story = () => {
  return (
    <div style={{ width: '200px' }}>
      {text('desc', 'sample story')}
    </div>
  );
}

import Button from '@synerise/ds-button';

export const button = () => <Button mode="simple" onClick={action('onclick')}>
  label
</Button>

button.args = {
  variant: 'primary',
};

export const accMenu = accmenu.Default

export default {
  name: 'Components/AccordionMenu',
  title: 'components',
  config: {},
  argTypes: {
    advanced: { control: 'boolean' },
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
  }
};
