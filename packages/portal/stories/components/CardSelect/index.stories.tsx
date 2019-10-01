import * as React from 'react';
import range from 'lodash/range';

import { DSProvider } from '@synerise/ds-core';
import CardSelect from '@synerise/ds-card-select';

import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';

storiesOf('Components|CardSelect', module)
  .add('default', () => {
    const [store, setStore] = React.useState<{[k: number]: boolean}>({});
    const raised = boolean('Raised', false);
    const tickVisible = boolean('With tick', false);

    return (
      <DSProvider code="en_GB">
        <div style={{ background: '#f2f5f6', padding: '16px', display: 'flex' }}>
          <div style={{ marginLeft: 6, marginRight: 6 }}>
            <CardSelect
              icon="ad-simple-push-l"
              iconSize={96}
              title={`Selectable card`}
              description={`With description`}
              raised={raised}
              tickVisible={tickVisible}
              value={store[0]}
              onChange={() => setStore({ [0]: !store[0] })}
            />
          </div>

          <div style={{ marginLeft: 6, marginRight: 6 }}>
            <CardSelect
              icon="ad-simple-push-l"
              iconSize={96}
              title={`No description`}
              raised={raised}
              tickVisible={tickVisible}
              value={store[1]}
              onChange={() => setStore({ [1]: !store[1] })}
            />
          </div>

          <div style={{ marginLeft: 6, marginRight: 6 }}>
            <CardSelect
              icon="ad-simple-push-l"
              iconSize={96}
              title={`Disabled card`}
              description={`Description of disabled card`}
              raised={raised}
              tickVisible={tickVisible}
              disabled={true}
            />
          </div>

          <div style={{ marginLeft: 6, marginRight: 6 }}>
            <CardSelect
              title={`Selectable card`}
              description={`No Icon`}
              raised={raised}
              tickVisible={tickVisible}
              value={store[2]}
              onChange={() => setStore({ [2]: !store[2] })}
            />
          </div>
        </div>
      </DSProvider>
    );
  })
;