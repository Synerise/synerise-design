import * as React from 'react';

import ActionArea from '@synerise/ds-action-area';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

const stories = {
  default: () => (
    <ActionArea
      label={text('Set label', 'Label')}
      description={text('Set description', 'Very long description')}
      actionLabel={text('Set button label', 'Define')}
      action={action('handle action')}
    />
  ),
};

export default {
  name: 'Components/ActionArea',
  config: {},
  stories,
  Component: ActionArea,
};
