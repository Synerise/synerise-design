import * as React from 'react';

import ColumnManager from '@synerise/ds-column-manager';
import { action } from '@storybook/addon-actions';

const stories = {
  default: () => (
    <ColumnManager hide={action('hide Column Manager')} showList={action('show Item Filter')} visible />
  ),
};

export default {
  name: 'Components|ColumnManager',
  config: {},
  stories,
  Component: ColumnManager,
}
