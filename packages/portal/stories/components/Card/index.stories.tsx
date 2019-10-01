import * as React from 'react';
import range from 'lodash/range';

import { DSProvider } from '@synerise/ds-core';
import Button from '@synerise/ds-button';
import Card from '@synerise/ds-card';

import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';

storiesOf('Components|Card', module)
  .add('default', () => {
    const [store, setStore] = React.useState<{[k: number]: boolean}>({});
    const raised = boolean('Raised', false);
    const disabled = boolean('Disabled', false);
    const lively = boolean('Lively', false);
    const withHeader = boolean('With header', true);
    const showContent = boolean('Show content', true);
    const withHeaderSide = boolean('With header side children', true);
    const withIcon = boolean('With icon', false);

    return (
      <DSProvider code="en_GB">
        <div style={{ background: '#f2f5f6', padding: '16px', display: 'flex' }}>
          <div style={{ marginLeft: 6, marginRight: 6, width: '100%' }}>
            <Card
              lively={lively}
              disabled={disabled}
              raised={raised}
              withHeader={withHeader}
              title="Card title"
              description="Description of the card contents"
              icon={withIcon}
              headerSideChildren={withHeaderSide && (
                <Button type="primary">Button</Button>
              )}
            >
              {showContent &&
                <div style={{backgroundColor: '#ffcccb', width: '100%', height: 300}}>
                  Wow so great, such content!1
                </div>
              }
            </Card>
          </div>
        </div>
      </DSProvider>
    );
  })
;