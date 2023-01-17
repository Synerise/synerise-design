import * as React from 'react';

import { text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions';

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

export default {
  name: 'Components/AccordionMenu',
  title: 'components',
  config: {},
};
