import * as React from 'react';
import range from 'lodash/range';
import { text, select, number, boolean } from '@storybook/addon-knobs';
import Button from '@synerise/ds-button';
import Card, { CardGroup, CardBadge } from '@synerise/ds-card';
import { doubleClickListener } from '@synerise/ds-utils';
import Icon from '@synerise/ds-icon';
import { CheckS, FilterM, SearchM, UserM, WarningFillM } from '@synerise/ds-icon/dist/icons';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import * as S from './stories.styles';
const backgrounds = {
  White: 'white',
  'White with shadow': 'white-shadow',
  Grey: 'grey',
  'Grey with shadow': 'grey-shadow',
  Outlined: 'outline',
};

const init = () => {
  const props = {
    title: text('Title', 'Card header'),
    description: text('Description', 'Description'),
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
    background: select('Background style', backgrounds, 'white-shadow'),
  };

  return { props };
};

const renderCard = (props) => {
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
        icon={props.icon || (props.withIcon && <IconComponent />)}
        iconColor={props.iconColor}
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
      <div
        style={{
          padding: 24,
          marginBottom: '24px',
          width: '100%',
          position: 'absolute',
          height: '100%',
          top: 0,
          left: 0,
        }}
      >
        <h3>Single card</h3>
        <div style={{ paddingTop: 12, width: '100%' }}>
          {renderCard({ ...props, icon: <CardBadge icon={<CheckS />} status="success" /> })}
        </div>
      </div>
    );
  },
  headers: () => {
    const { props } = init();
    return (
      <div
        style={{
          marginBottom: '48px',
          width: '100%',
          position: 'absolute',
          height: '100%',
          top: 0,
          left: 0,
        }}
      >
        <div style={{ padding: '24px' }}>
          <h3>Variants of card header</h3>
          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              description: null,
              withIcon: false,
              headerSideChildren: null,
              compactHeader: false,
              showContent: false,
              headerBorderBottom: false,
            })}
          </S.HeaderWrapper>
          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              description: null,
              withIcon: false,
              compactHeader: false,
              showContent: false,
              headerBorderBottom: false,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '8px' }}>
                  <Button type="ghost">Cancel</Button>
                  <Button type="primary">Apply</Button>
                </div>
              ),
            })}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              withIcon: false,
              compactHeader: true,
              showContent: false,
              headerBorderBottom: false,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '8px' }}>
                  <Button type="ghost" mode="single-icon">
                    <Icon component={<FilterM />} />{' '}
                  </Button>
                  <Button type="ghost" mode="single-icon">
                    <Icon component={<SearchM />} />{' '}
                  </Button>
                </div>
              ),
            })}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              withIcon: false,
              compactHeader: true,
              showContent: false,
              headerBorderBottom: false,
              icon: <CardBadge icon={<CheckS />} status="success" />,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '8px' }}>
                  <Button type="ghost" mode="single-icon">
                    <Icon component={<FilterM />} />{' '}
                  </Button>
                  <Button type="ghost" mode="single-icon">
                    <Icon component={<SearchM />} />{' '}
                  </Button>
                </div>
              ),
            })}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              withIcon: false,
              description: null,
              compactHeader: true,
              showContent: false,
              headerBorderBottom: true,
            })}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard({
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
              ),
            })}
          </S.HeaderWrapper>
          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              compactHeader: false,
              icon: <CardBadge icon={<CheckS />} />,
              showContent: false,
              headerBorderBottom: false,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: 8 }}>
                  <Button type="ghost">Cancel</Button>
                  <Button type="custom-color" color="green">
                    Apply
                  </Button>
                </div>
              ),
            })}
          </S.HeaderWrapper>
          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              compactHeader: false,
              icon: <CardBadge icon={<CheckS />} />,
              showContent: false,
              headerBorderBottom: false,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: 8 }}>
                  <Button type="custom-color" color={'yellow'}>
                    Skip step
                  </Button>
                  <Button>Define</Button>
                </div>
              ),
            })}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              compactHeader: false,
              icon: <CardBadge icon={<CheckS />} status="success" />,
              showContent: false,
              headerBorderBottom: false,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridColumnGap: 8 }}>
                  <Button>Change</Button>
                </div>
              ),
            })}
          </S.HeaderWrapper>
          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              compactHeader: false,
              disabled: true,
              icon: <CardBadge icon={<CheckS />} />,
              showContent: false,
              headerBorderBottom: false,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridColumnGap: 8 }}>
                  <Button>Change</Button>
                </div>
              ),
            })}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: true,
              compactHeader: false,
              withIcon: 'UserM',
              iconColor: theme.palette['grey-400'],
              showContent: false,
              headerBorderBottom: false,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridColumnGap: 8 }}>
                  <Button>Change</Button>
                </div>
              ),
            })}
          </S.HeaderWrapper>
          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: false,
              raised: false,
              compactHeader: false,
              withIcon: 'UserM',
              iconColor: theme.palette['grey-400'],
              showContent: false,
              headerBorderBottom: false,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridColumnGap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Icon
                      component={<WarningFillM />}
                      color={theme.palette['yellow-600']}
                      style={{ marginRight: '4px' }}
                    />
                    <span style={{ fontWeight: 500, color: theme.palette['yellow-600'] }}>Uncompleted</span>
                  </div>
                  <Button type="custom-color" color="green" disabled>
                    Apply
                  </Button>
                </div>
              ),
            })}
          </S.HeaderWrapper>
          <S.HeaderWrapper>
            {renderCard({
              ...props,
              lively: false,
              raised: false,
              description: null,
              compactHeader: false,
              icon: <Icon component={<UserM />}  style={{marginTop:'3px'}}/>,

              iconColor: theme.palette['grey-400'],
              showContent: false,
              headerBorderBottom: false,
              headerSideChildren: (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridColumnGap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Icon
                      component={<WarningFillM />}
                      color={theme.palette['yellow-600']}
                      style={{ marginRight: '4px'}}
                    />
                    <span style={{ fontWeight: 500, color: theme.palette['yellow-600'] }}>Uncompleted</span>
                  </div>
                  <Button type="custom-color" color="green" disabled>
                    Apply
                  </Button>
                </div>
              ),
            })}
          </S.HeaderWrapper>
        </div>
      </div>
    );
  },
  group: () => {
    const { props } = init();
    const itemsInGroup = number('Number of cards rendered', 9);
    const rowItems = number('Items per row', 3);

    return (
      <div style={{ padding: 24, width: '100%', position: 'absolute', top: 0, left: 0, height: '100%' }}>
        <h3>Card Group</h3>
        <div style={{ padding: '12px 0', width: '100%' }}>
          <CardGroup columns={rowItems}>
            {range(0, itemsInGroup).map((i) => (
              <React.Fragment key={i}>{renderCard({ ...props, icon: <CardBadge icon={<CheckS />} /> })}</React.Fragment>
            ))}
          </CardGroup>
        </div>
      </div>
    );
  },
};

export default {
  name: 'Card|Card',
  stories,
  Component: Card,
};
