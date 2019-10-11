import Pagination from '@synerise/ds-pagination';

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import centered from '@storybook/addon-centered/react';

const stories = storiesOf('Components|Pagination', module);

stories
    .addDecorator(centered)
    .add('default', () => {
  return <Pagination onChange={action('onChange')} defaultCurrent={1} total={50} />;
});

export default stories;
