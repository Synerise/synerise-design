import * as React from 'react';
import range from 'lodash/range';

import { DSProvider } from '@synerise/ds-core';
import CardSelect from '@synerise/ds-card-select';

import { storiesOf } from '@storybook/react';
import { boolean, text, select, number } from '@storybook/addon-knobs';

storiesOf('Components|CardSelect', module)
  .add('default', () => {
    const [store, setStore] = React.useState<{[k: number]: boolean}>({});
    const raised = boolean('Raised', false);
    const tickVisible = boolean('With tick', true);
    const stretchToFit = boolean('Stretch to fit', false);
    const icon = text('Icon component name', 'tiles-m');
    const iconSize = number('Icon component size', 82);
    const size = select('Size', {small: 'small', medium: 'medium'}, 'medium');

    const IconComponent = React.lazy(() => import(`@synerise/ds-icon/dist/icons/${icon}.svg`).catch(err => {}));

    const commonProps = {
      size,
      raised,
      tickVisible,
      icon: <IconComponent />,
      iconSize,
      stretchToFit,
    };

    return (
      <DSProvider code="en_GB">
        <div style={{ background: '#f2f5f6', padding: '16px', display: 'flex' }}>
          <React.Suspense fallback={<div>Loading icons... (or perhaps given icon couldn't be found)</div>}>
            <div style={{ marginLeft: 6, marginRight: 6 }}>
              <CardSelect
                {...commonProps}
                title={`Selectable card`}
                description={`With description`}
                value={store[0]}
                onChange={() => setStore({ [0]: !store[0] })}
              />
            </div>

            <div style={{ marginLeft: 6, marginRight: 6 }}>
              <CardSelect
                {...commonProps}
                title={`No description`}
                value={store[1]}
                onChange={() => setStore({ [1]: !store[1] })}
              />
            </div>

            <div style={{ marginLeft: 6, marginRight: 6 }}>
              <CardSelect
                {...commonProps}
                title={`Disabled card`}
                description={`Description of disabled card`}
                disabled={true}
              />
            </div>

            <div style={{ marginLeft: 6, marginRight: 6 }}>
              <CardSelect
                {...commonProps}
                icon={undefined}
                description={`No Icon`}
                value={store[2]}
                onChange={() => setStore({ [2]: !store[2] })}
              />
            </div>
          </React.Suspense>
        </div>
      </DSProvider>
    );
  })
;