import * as React from 'react';
import range from 'lodash/range';

import { DSProvider } from '@synerise/ds-core';
import Button from '@synerise/ds-button';
import ButtonGroup from '@synerise/ds-button-group';

import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';

storiesOf('Components|ButtonGroup', module)
  .add('default', () => {
    const [store, setStore] = React.useState<{[k: number]: boolean}>({});
    const raised = boolean('Raised', false);
    
    return (
      <DSProvider code="en_GB">
        <div style={{ background: '#f2f5f6', padding: '16px', display: 'flex' }}>
          <ButtonGroup
            title="Some title"
            description="Some description"
          >
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </div>
      </DSProvider>
    );
  })
;