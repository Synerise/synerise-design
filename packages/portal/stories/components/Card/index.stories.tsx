import * as React from 'react';
import range from 'lodash/range';
import { text, select, number, boolean } from '@storybook/addon-knobs';
import Button from '@synerise/ds-button';
import Card, { CardGroup, CardBadge } from '@synerise/ds-card';
import { doubleClickListener } from '@synerise/ds-utils';
import Icon from '@synerise/ds-icon';
import { CheckM, CheckS, FilterM, SearchM } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

const sizes = {
  None: null,
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
  'Extra Large': 'extraLarge',
};

const backgrounds = {
  'White': 'white',
  'White with shadow': 'white-shadow',
  'Grey': 'grey',
  'Grey with shadow': 'grey-shadow',
  'Outlined': 'outline'
}

const init = () => {
  const props = {
    title: text('Title', 'Card header'),
    description: text('Description', 'Description'),
    size: select('Size', sizes, null),
    raised: boolean('Active', false),
    disabled: boolean('Disabled', false),
    lively: boolean('Hover enabled', true),
    withHeader: boolean('With header', true),
    showContent: boolean('Show content', true),
    withIcon: text('With icon', 'Check3M'),
    iconColor: text('Icon color', '#54cb0b'),
    compactHeader: boolean('Compact header', false),
    headerBorderBottom: boolean('Header with border bottom', false),
    content: text('Content', 'Example of card content'),
    background: select('Background style', backgrounds, 'white'),
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
        icon={props.icon || props.withIcon && <IconComponent />}
        iconColor={props.iconColor}
        size={props.size}
        compactHeader={props.compactHeader}
        onHeaderClick={clickHandler}
        headerSideChildren={props.headerSideChildren}
        headerBorderBottom={props.headerBorderBottom}
        background={props.background}
      >
        {props.showContent && <div style={{ width: '100%', height: 300 }}>{props.content}</div>}
      </Card>
    </React.Suspense>
  );
};

const stories = {
  single: () => {
    const { props } = init();

    return (
      <div style={{ padding: 24, marginBottom: 24, width: '100%', position: 'absolute', height: '100%', top: 0, left: 0 }}>
        <h3>Single card</h3>
        <div style={{ paddingTop: 12, width: '100%' }}>{renderCard({...props, icon: <CardBadge icon={<CheckS />} status="success" />,})}</div>
      </div>
    );
  },
  headers: () => {
    const { props } = init();
    return (
    <div style={{ padding: 24, marginBottom: 24, width: '100%', position: 'absolute', height: '100%', top: 0, left: 0 }}>
      <h3>Variants of card header</h3>
      <div style={{ paddingTop: 12, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{renderCard({
        ...props,
        lively: true,
        description: null,
        withIcon: false,
        headerSideChildren: null,
        compactHeader: false,
        showContent: false,
        headerBorderBottom: false,
      })}</div>

      <div style={{ paddingTop: 12, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{renderCard({
        ...props,
        lively: true,
        description: null,
        withIcon: false,
        compactHeader: false,
        showContent: false,
        headerBorderBottom: false,
        headerSideChildren: (
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '8px'}}>
            <Button type="ghost">Cancel</Button>
            <Button type="primary">Apply</Button>
          </div>
        )
      })}</div>

      <div style={{ paddingTop: 12, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{renderCard({
        ...props,
        lively: true,
        withIcon: false,
        compactHeader: true,
        showContent: false,
        headerBorderBottom: false,
        headerSideChildren: (
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '8px'}}>
            <Button type="ghost" mode="single-icon"><Icon component={<FilterM />} /> </Button>
            <Button type="ghost" mode="single-icon"><Icon component={<SearchM />} /> </Button>
          </div>
        )
      })}</div>

      <div style={{ paddingTop: 12, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{renderCard({
        ...props,
        lively: true,
        withIcon: false,
        compactHeader: true,
        showContent: false,
        headerBorderBottom: false,
        icon: <CardBadge icon={<CheckS />} status="success" />,
        headerSideChildren: (
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '8px'}}>
            <Button type="ghost" mode="single-icon"><Icon component={<FilterM />} /> </Button>
            <Button type="ghost" mode="single-icon"><Icon component={<SearchM />} /> </Button>
          </div>
        )
      })}</div>

      <div style={{ paddingTop: 12, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{renderCard({
        ...props,
        lively: true,
        withIcon: false,
        description: null,
        compactHeader: true,
        showContent: false,
        headerBorderBottom: true,
      })}</div>

      <div style={{ paddingTop: 12, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{renderCard({
        ...props,
        lively: true,
        compactHeader: false,
        icon: <CardBadge icon={<CheckS />} />,
        showContent: false,
        headerBorderBottom: false,
        headerSideChildren: (
          <div>
            <Button>Define</Button>
          </div>
        )
      })}</div>

      <div style={{ paddingTop: 12, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{renderCard({
        ...props,
        lively: true,
        compactHeader: false,
        icon: <CardBadge icon={<CheckS />} />,
        showContent: false,
        headerBorderBottom: false,
        headerSideChildren: (
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: 8 }}>
            <Button type="ghost">Cancel</Button>
            <Button type="custom-color" color="green">Apply</Button>
          </div>
        )
      })}</div>

      <div style={{ paddingTop: 12, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{renderCard({
        ...props,
        lively: true,
        compactHeader: false,
        icon: <CardBadge icon={<CheckS />} />,
        showContent: false,
        headerBorderBottom: false,
        headerSideChildren: (
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: 8 }}>
            <Button type="custom-color" color={"yellow"}>Skip step</Button>
            <Button>Define</Button>
          </div>
        )
      })}</div>

      <div style={{ paddingTop: 12, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{renderCard({
        ...props,
        lively: true,
        compactHeader: false,
        icon: <CardBadge icon={<CheckS />} status="success" />,
        showContent: false,
        headerBorderBottom: false,
        headerSideChildren: (
          <div style={{display: 'grid', gridTemplateColumns: '1fr', gridColumnGap: 8 }}>
            <Button>Change</Button>
          </div>
        )
      })}</div>

      <div style={{ paddingTop: 12, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{renderCard({
        ...props,
        lively: true,
        compactHeader: false,
        disabled: true,
        icon: <CardBadge icon={<CheckS />} />,
        showContent: false,
        headerBorderBottom: false,
        headerSideChildren: (
          <div style={{display: 'grid', gridTemplateColumns: '1fr', gridColumnGap: 8 }}>
            <Button>Change</Button>
          </div>
        )
      })}</div>


      <div style={{ paddingTop: 12, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>{renderCard({
        ...props,
        lively: true,
        compactHeader: false,
        withIcon: "UserM",
        iconColor: theme.palette['grey-400'],
        showContent: false,
        headerBorderBottom: false,
        headerSideChildren: (
          <div style={{display: 'grid', gridTemplateColumns: '1fr', gridColumnGap: 8 }}>
            <Button>Change</Button>
          </div>
        )
      })}</div>
    </div>
  )},
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
              <React.Fragment key={i}>{renderCard({...props, icon: <CardBadge icon={<CheckS />} />,})}</React.Fragment>
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
