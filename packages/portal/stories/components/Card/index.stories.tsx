import * as React from 'react';
import range from 'lodash/range';

import { DSProvider } from '@synerise/ds-core';
import Button from '@synerise/ds-button';
import Card, { CardGroup } from '@synerise/ds-card';

import { storiesOf } from '@storybook/react';
import { boolean, text, number } from '@storybook/addon-knobs';

const init = () => {
  const props = {
    raised: boolean('Raised', false),
    disabled: boolean('Disabled', false),
    lively: boolean('Lively', false),
    withHeader: boolean('With header', true),
    showContent: boolean('Show content', true),
    withHeaderSide: boolean('With header side children', true),
    withIcon: text('With icon', ''),
    compactHeader: boolean('Compact header', false),
  };

  return { props };
};

const renderCard = props => (
  <Card
    lively={props.lively}
    disabled={props.disabled}
    raised={props.raised}
    withHeader={props.withHeader}
    title="Card title"
    description="Description of the card contents"
    icon={props.withIcon}
    compactHeader={props.compactHeader}
    headerSideChildren={props.withHeaderSide && (
      <Button type="primary">Button</Button>
    )}
  >
    {props.showContent &&
      <div style={{width: '100%', height: 300}}>
        Wow so great, such content!1
      </div>
    }
  </Card>
);

storiesOf('Components|Card', module)
  .add('Single', () => {
    const { props } = init();

    return (
      <DSProvider code="en_GB">
        <div style={{margin: 24}}>
          <h3>Single card</h3>
          <div style={{ paddingTop: 12, width: '100%' }}>
            {renderCard(props)}
          </div>
        </div>
      </DSProvider>
    );
  })
  
  .add('Group', () => {
    const { props } = init();
    const itemsInGroup = number('Number of cards rendered', 9);
    const rowItems = number('Items per row', 3);

    return (
      <DSProvider code="en_GB">
        <div style={{ margin: 24 }}>
          <h3>Card Group</h3>
          <div style={{ paddingTop: 12, width: '100%' }}>
            <CardGroup columns={rowItems}>
              {range(1, itemsInGroup).map(i =>
                <React.Fragment key={i}>
                  {renderCard(props)}
                </React.Fragment>
              )}
            </CardGroup>
          </div>
        </div>
      </DSProvider>
    );
  }) 
;