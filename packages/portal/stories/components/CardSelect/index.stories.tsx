import * as React from 'react';
import range from 'lodash/range';

import { DSProvider } from '@synerise/ds-core';
import CardSelect from '@synerise/ds-card-select';

import { storiesOf } from '@storybook/react';
import { boolean, text, select, number } from '@storybook/addon-knobs';

storiesOf('Components|CardSelect', module)
  .add('default', () => {
    const [store, setStore] = React.useState<number | null>(null);

    const raised = boolean('Raised', false);
    const tickVisible = boolean('With tick', true);
    const stretchToFit = boolean('Stretch to fit', false);
    const icon = text('Icon component name', 'tiles-m');
    const iconSize = number('Custom Icon component size', 0);
    const size = select('Size', {small: 'small', medium: 'medium'}, 'medium');

    const IconComponent = React.lazy(() => import(`@synerise/ds-icon/dist/icons/${icon}.svg`).catch(() => {}));

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
          <React.Suspense fallback={<div>Loading icons... (or perhaps you've entered an icon that couldn't be found)</div>}>
            <div style={{ marginLeft: 12, marginRight: 12 }}>
              <CardSelect
                {...commonProps}
                title={`Selectable card`}
                description={`With description`}
                value={store === 0}
                onChange={() => store !== 0 && setStore(0)}
              />
            </div>

            <div style={{ marginLeft: 12, marginRight: 12 }}>
              <CardSelect
                {...commonProps}
                title={`No description`}
                value={store === 1}
                onChange={() => store !== 1 && setStore(1)}
              />
            </div>

            <div style={{ marginLeft: 12, marginRight: 12 }}>
              <CardSelect
                {...commonProps}
                tickVisible={false}
                title={`Clickable example`}
                description={`No tick or value`}
                onClick={() => window.alert('Hello world!')}
              />
            </div>

            <div style={{ marginLeft: 12, marginRight: 12 }}>
              <CardSelect
                {...commonProps}
                title={`Disabled card`}
                description={`Description of disabled card`}
                disabled={true}
              />
            </div>

            {size === 'medium' &&
              <React.Fragment>
                <div style={{ marginLeft: 12, marginRight: 12 }}>
                  <CardSelect
                    {...commonProps}
                    icon={undefined}
                    title={`No Icon with only title`}
                    value={store === 2}
                    onChange={() => store !== 2 && setStore(2)}
                  />
                </div>

                <div style={{ marginLeft: 12, marginRight: 12 }}>
                  <CardSelect
                    {...commonProps}
                    icon={undefined}
                    description={`No Icon with only description`}
                    value={store === 3}
                    onChange={() => store !== 3 && setStore(3)}
                  />
                </div>
              </React.Fragment>
            }
          </React.Suspense>
        </div>
      </DSProvider>
    );
  })
;