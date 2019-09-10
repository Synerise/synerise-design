import PageHeader from '@synerise/ds-page-header';

import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { DSProvider } from '@synerise/ds-core';
import { action } from '@storybook/addon-actions';

const stories = storiesOf('Components|Page Header', module);

stories.add('default', () => {
  return (
    <DSProvider code="en_GB">
      <>
        <PageHeader title="Main page header" onGoBack={action('goBack')} />
      </>
    </DSProvider>
  );
});

export default stories;
