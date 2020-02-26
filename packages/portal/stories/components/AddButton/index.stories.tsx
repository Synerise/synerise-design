import * as React from 'react';

import AddButton from '@synerise/ds-add-button';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

const defaultProps = () => ({
  disabled: boolean('Disabled', false),
  label: text('Button label', 'Add position'),
  block: boolean('Fullwidth', false),
});

const stories = {
  default: () => {
    const props = defaultProps();
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
        <AddButton {...props} onClick={action('click')} />
      </div>
    )
  },
};

export default {
  name: 'Components|AddButton',
  config: {},
  stories,
  Component: AddButton,
}
