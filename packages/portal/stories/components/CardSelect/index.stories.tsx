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
        <div style={{ background: '#fff', padding: '16px', display: 'flex' }}>
          {range(3).map(i => (
            <div style={{ marginLeft: 6, marginRight: 6 }}>
              <CardSelect
                icon="ad-simple-push-l"
                iconSize={96}
                title={`Selectable card ${i}`}
                description={`Description of selectable card ${i}`}
                raised={raised}
                tickVisible={tickVisible}
                value={store[i]}
                onChange={() => setStore({ [i]: !store[i] })}
              />
            </div>
          ))}
        </div>
      </DSProvider>
    );
  })
;