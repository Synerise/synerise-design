import * as React from 'react';
import range from 'lodash/range';
import { text, select, number, boolean } from '@storybook/addon-knobs';
import Button from '@synerise/ds-button';
import Card, { CardGroup } from '@synerise/ds-card';
import { doubleClickListener } from '@synerise/ds-utils';

const sizes = {
  None: null,
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
  'Extra Large': 'extraLarge',
};

const init = () => {
  const props = {
    title: text('Title', 'Card Title'),
    description: text('Description', 'Description of the card contents'),
    size: select('Size', sizes, null),
    raised: boolean('Raised', false),
    disabled: boolean('Disabled', false),
    lively: boolean('Lively', false),
    withHeader: boolean('With header', true),
    showContent: boolean('Show content', true),
    withHeaderSide: boolean('With header side children', true),
    withIcon: text('With icon', 'Check3M'),
    iconColor: text('Icon color', '#54cb0b'),
    compactHeader: boolean('Compact header', false),
  };

  return { props };
};

const renderCard = props => {
  const IconComponent = React.lazy(() => import(`@synerise/ds-icon/dist/icons/${props.withIcon}`));
  const clickHandler = doubleClickListener(
    () => {
      console.log('Clicked header once');
    },
    () => {
      console.log('Clicked header twice');
    }
  );
  return (
    <React.Suspense fallback={<div>Loading icon</div>}>
      <Card
        lively={props.lively}
        disabled={props.disabled}
        raised={props.raised}
        withHeader={props.withHeader}
        title={props.title}
        description={props.description}
        icon={props.withIcon && <IconComponent />}
        iconColor={props.iconColor}
        size={props.size}
        compactHeader={props.compactHeader}
        onHeaderClick={clickHandler}
        headerSideChildren={
          props.withHeaderSide && (
            <Button
              type="primary"
              onClick={e => {
                e.stopPropagation();
                console.log('button clicked!');
              }}
            >
              Button
            </Button>
          )
        }
      >
        {props.showContent && <div style={{ width: '100%', height: 300 }}>Wow so great, such content!1</div>}
      </Card>
    </React.Suspense>
  );
};

const stories = {
  single: () => {
    const { props } = init();

    return (
      <div style={{ margin: 24 }}>
        <h3>Single card</h3>
        <div style={{ paddingTop: 12, width: '100%' }}>{renderCard(props)}</div>
      </div>
    );
  },
  group: () => {
    const { props } = init();
    const itemsInGroup = number('Number of cards rendered', 9);
    const rowItems = number('Items per row', 3);

    return (
      <div style={{ margin: 24 }}>
        <h3>Card Group</h3>
        <div style={{ paddingTop: 12, width: '100%' }}>
          <CardGroup columns={rowItems}>
            {range(1, itemsInGroup).map(i => (
              <React.Fragment key={i}>{renderCard(props)}</React.Fragment>
            ))}
          </CardGroup>
        </div>
      </div>
    );
  },
};

export default {
  name: 'Components|Card',
  stories,
  Component: Card,
};
