import * as React from 'react';

import ItemFilter from '@synerise/ds-item-filter';
import { action } from '@storybook/addon-actions';

const stories = {
  default: () => (
    <ItemFilter visible hide={action('hide')}/>
  ),
};

export default {
  name: 'Components|ItemFilter',
  config: {},
  stories,
  Component: ItemFilter,
}
