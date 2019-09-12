import Pagination from '@synerise/ds-pagination';

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

const stories = storiesOf('Components|Pagination', module);

stories.add('default', () => {
  return <Pagination onChange={action('onChange')} defaultCurrent={1} total={50} />;
});

export default stories;
