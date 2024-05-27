import * as React from 'react';

import ActionArea from '@synerise/ds-action-area';
import { action } from '@storybook/addon-actions';
import { boolean, text, object } from '@storybook/addon-knobs';

const stories = {
  default: () => (
    <div
    style={{
      padding: '24px',
      width: '100%',
      position: 'absolute',
      height: '100%',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
    <ActionArea
      label={text('Set label', 'Label')}
      description={text('Set description', 'Very long description')}
      actionLabel={text('Set button label', 'Define')}
      action={action('handle action')}
      buttonProps={ boolean('Custom button', false) && object('Button props', {
        type: 'secondary',
        disabled: true
      })}
      isFullWidth={boolean('Set 100% width', false)}
      isError={boolean('Set validation state', false)}
      errorText={text('Error text', 'Error text')}
      />
    </div>
  ),
};

export default {
  name: 'Components/ActionArea',
  config: {},
  stories,
  Component: ActionArea,
};
