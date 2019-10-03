import * as React from 'react';

import { DSProvider } from '@synerise/ds-core';
import Button from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';

import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

storiesOf('Components|ButtonGroup', module)
  .add('default', () => {
    const withTitle = boolean('With title', true);
    const withDescription = boolean('With description', true);
    
    return (
      <DSProvider code="en_GB">
        <div style={{ background: '#f2f5f6', padding: '16px', display: 'flex' }}>
          <ButtonGroup
            title={withTitle && 'Some title'}
            description={withDescription && 'Some description'}
          >
            <Button type="secondary">One</Button>
            <Button type="primary">Two</Button>
            <Button icon="poweroff">Three</Button>
          </ButtonGroup>
        </div>
      </DSProvider>
    );
  })
;