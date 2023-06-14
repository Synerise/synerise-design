import * as React from 'react';
import range from 'lodash/range';
import { text, select, number, boolean } from '@storybook/addon-knobs';
import Button from '@synerise/ds-button';
import Card, { CardGroup, CardBadge } from '@synerise/ds-card';
import Icon, { CheckS, Check3M, FilterM, SearchM, UserM, WarningFillM, SegmentM, UserCircleM } from "@synerise/ds-icon";
import { theme } from '@synerise/ds-core';
import * as S from './stories.styles';
import { Backgrounds, CardProps } from '@synerise/ds-card';
import { UserAvatar, ObjectAvatar } from '@synerise/ds-avatar';

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
    hideContent: boolean('Enable collapsing', true),
    iconColor: text('Icon color', '#54cb0b'),
    compactHeader: boolean('Compact header', false),
    headerBorderBottom: boolean('Header with border bottom', false),
    content: text('Content', 'Example of card content'),
    background: select('Background style', backgrounds, 'white-shadow') as Backgrounds,
    showSideChildrenWhenHeaderHidden: boolean('Set Footer Active', false),
    "data-testid": text('data-testid','card-example-testid')
  };
  return { props };
};

const renderCard = (
  props: CardProps & { withIcon?: string | boolean; content: React.ReactNode },
  hideContentInitial = false,
  onExpansionChange?: (expanded: boolean) => void
) => {
  const IconComponent = <Check3M />;
  const [hideContent, setHideContent] = React.useState(hideContentInitial);
  React.useEffect(() => {
    setHideContent(hideContentInitial);
  }, [hideContentInitial]);
  
  return (
    <Card
      lively={props.lively}
      disabled={props.disabled}
      raised={props.raised}
      withHeader={props.withHeader}
      title={props.title}
      description={props.description}
      avatar={props.avatar}
      icon={props.icon || (props.withIcon && IconComponent)}
      iconColor={props.iconColor}
      compactHeader={props.compactHeader}
      onHeaderClick={() => {
        onExpansionChange && onExpansionChange(!hideContent);
        setHideContent(!hideContent);
      }}
      headerSideChildren={props.headerSideChildren}
      headerBorderBottom={props.headerBorderBottom}
      background={props.background}
      hideContent={props.hideContent && hideContent}
      showSideChildrenWhenHeaderHidden={props.showSideChildrenWhenHeaderHidden}
      data-testid={props['data-testid']}
    >
      <div style={{ width: '100%', height: 300 }}>{props.content}</div>
    </Card>
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
          {renderCard({
            ...props,
            showSideChildrenWhenHeaderHidden: false,
            icon: <CardBadge icon={<CheckS />} status="success" />,
          })}
        </div>
      </div>
    );
  },
  headers: () => {
    const { props } = init();
    const [collapsedCardsState, setCollapsedCardsState] = React.useState({
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
      7: false,
      8: false,
    });

    const updateCollapsedState = (index, collapsed) =>
      setCollapsedCardsState({ ...collapsedCardsState, [index]: collapsed });


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
            {renderCard(
              {
                ...props,
                lively: true,
                description: null,
                withIcon: false,
                headerSideChildren: null,
                compactHeader: false,
                headerBorderBottom: false,
              },
              false
            )}
          </S.HeaderWrapper>
          <S.HeaderWrapper>
            {renderCard(
              {
                ...props,
                lively: true,
                description: null,
                withIcon: false,
                compactHeader: false,
                headerBorderBottom: false,
                headerSideChildren: (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '8px' }}>
                    <Button
                      type="ghost"
                      onClick={() => {
                        updateCollapsedState(0, true);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        updateCollapsedState(0, true);
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                ),
              },
              collapsedCardsState[0],
              collapsed => updateCollapsedState(0, collapsed)
            )}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard(
              {
                ...props,
                lively: true,
                withIcon: false,
                compactHeader: true,
                headerBorderBottom: false,
                headerSideChildren: (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '8px' }}>
                    <Button type="ghost" mode="single-icon">
                      <Icon component={<FilterM />} />
                    </Button>
                    <Button type="ghost" mode="single-icon">
                      <Icon component={<SearchM />} />
                    </Button>
                  </div>
                ),
                showSideChildrenWhenHeaderHidden: false,
              },
              false
            )}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard(
              {
                ...props,
                lively: true,
                withIcon: false,
                compactHeader: true,
                headerBorderBottom: false,
                icon: <CardBadge icon={<CheckS />} status="success" />,
                headerSideChildren: (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '8px' }}>
                    <Button type="ghost" mode="single-icon">
                      <Icon component={<FilterM />} />
                    </Button>
                    <Button type="ghost" mode="single-icon">
                      <Icon component={<SearchM />} />
                    </Button>
                  </div>
                ),
                showSideChildrenWhenHeaderHidden: false,
              },
              false
            )}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard(
              {
                ...props,
                lively: true,
                withIcon: false,
                description: null,
                compactHeader: true,
                headerBorderBottom: true,
                showSideChildrenWhenHeaderHidden: false,
              },
              false
            )}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard(
              {
                ...props,
                lively: true,
                compactHeader: false,
                icon: <CardBadge icon={<CheckS />} />,
                headerBorderBottom: false,
                headerSideChildren: (
                  <div>
                    <Button
                      onClick={() => {
                        updateCollapsedState(1, false);
                      }}
                    >
                      Define
                    </Button>
                  </div>
                ),
              },
              collapsedCardsState[1],
              collapsed => updateCollapsedState(1, collapsed)
            )}
          </S.HeaderWrapper>
          <S.HeaderWrapper>
            {renderCard(
              {
                ...props,
                lively: true,
                compactHeader: false,
                icon: <CardBadge icon={<CheckS />} />,
                headerBorderBottom: false,
                headerSideChildren: (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: 8 }}>
                    <Button
                      type="ghost"
                      onClick={() => {
                        updateCollapsedState(2, true);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="custom-color"
                      color="green"
                      onClick={() => {
                        updateCollapsedState(2, true);
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                ),
              },
              collapsedCardsState[2],
              collapsed => updateCollapsedState(2, collapsed)
            )}
          </S.HeaderWrapper>
          <S.HeaderWrapper>
            {renderCard(
              {
                ...props,
                lively: true,
                compactHeader: false,
                icon: <CardBadge icon={<CheckS />} />,
                headerBorderBottom: false,
                headerSideChildren: (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: 8 }}>
                    <Button
                      type="custom-color"
                      color={'yellow'}
                      onClick={() => {
                        updateCollapsedState(3, true);
                      }}
                    >
                      Skip step
                    </Button>
                    <Button
                      onClick={() => {
                        updateCollapsedState(3, false);
                      }}
                    >
                      Define
                    </Button>
                  </div>
                ),
              },
              collapsedCardsState[3],
              collapsed => updateCollapsedState(3, collapsed)
            )}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard(
              {
                ...props,
                lively: true,
                compactHeader: false,
                icon: <CardBadge icon={<CheckS />} status="success" />,
                headerBorderBottom: false,
                headerSideChildren: (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridColumnGap: 8 }}>
                    <Button
                      onClick={() => {
                        updateCollapsedState(4, false);
                      }}
                    >
                      Change
                    </Button>
                  </div>
                ),
              },
              collapsedCardsState[4],
              collapsed => updateCollapsedState(4, collapsed)
            )}
          </S.HeaderWrapper>
          <S.HeaderWrapper>
            {renderCard(
              {
                ...props,
                lively: true,
                compactHeader: false,
                disabled: true,
                icon: <CardBadge icon={<CheckS />} />,
                headerBorderBottom: false,
                headerSideChildren: (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridColumnGap: 8 }}>
                    <Button
                      onClick={() => {
                        updateCollapsedState(5, false);
                      }}
                    >
                      Change
                    </Button>
                  </div>
                ),
                showSideChildrenWhenHeaderHidden: false,
              },
              collapsedCardsState[5],
              collapsed => updateCollapsedState(5, collapsed)
            )}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard(
              {
                ...props,
                lively: true,
                compactHeader: false,
                withIcon: 'UserM',
                iconColor: theme.palette['grey-400'],
                headerBorderBottom: false,
                headerSideChildren: (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridColumnGap: 8 }}>
                    <Button
                      onClick={() => {
                        updateCollapsedState(6, false);
                      }}
                    >
                      Change
                    </Button>
                  </div>
                ),
              },
              collapsedCardsState[6],
              collapsed => updateCollapsedState(6, collapsed)
            )}
          </S.HeaderWrapper>
          <S.HeaderWrapper>
            {renderCard(
              {
                ...props,
                lively: false,
                raised: false,
                compactHeader: false,
                withIcon: 'UserM',
                iconColor: theme.palette['grey-400'],
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
                showSideChildrenWhenHeaderHidden: false,
              },
              false
            )}
          </S.HeaderWrapper>
          <S.HeaderWrapper>
            {renderCard(
              {
                ...props,
                lively: false,
                raised: false,
                description: null,
                compactHeader: false,
                icon: <Icon component={<UserM />} />,
                iconColor: theme.palette['grey-400'],
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
                showSideChildrenWhenHeaderHidden: false,
              },
              false
            )}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard(
              {
                ...props,
                lively: false,
                raised: false,
                description: null,
                compactHeader: false,
                avatar: (
                  <UserAvatar 
                    text="A"
                    size="medium"
                    badgeStatus="active"
                    backgroundColor="auto"
                    iconComponent={ <Icon component={<UserCircleM />} /> }
                  />
                ),
                // iconColor: theme.palette['grey-400'],
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
                showSideChildrenWhenHeaderHidden: false,
              },
              false
            )}
          </S.HeaderWrapper>

          <S.HeaderWrapper>
            {renderCard(
              {
                ...props,
                lively: false,
                raised: false,
                description: 'Lorem ipsum dolor sit amet',
                compactHeader: false,
                avatar: (
                  <ObjectAvatar
                    color="mars"
                    size="medium"
                    backgroundColor="blue"
                    object={{
                      name: 'Object name',
                      status: 'API',
                      description: 'Some great description',
                    }}
                  />
                ),
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
                showSideChildrenWhenHeaderHidden: false,
              },
              false
            )}
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
            {range(0, itemsInGroup).map(i => (
              <div key={i}>{renderCard({ ...props, icon: <CardBadge icon={<CheckS />} /> })}</div>
            ))}
          </CardGroup>
        </div>
      </div>
    );
  },
  withStaticContent: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div style={{ padding: 24, width: '100%', position: 'absolute', top: 0, left: 0, height: '100%' }}>
        <Card
          headerSideChildren={(
            <Button type="ghost" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? 'Close' : 'Open'}
            </Button>
          )}
          showSideChildrenWhenHeaderHidden
          hideContent={!isOpen}
          withHeader
          title="Title"
          description="Description"
          icon={<CardBadge icon={<CheckS />} />}
          staticContent={<div>
            <ul>
              <li>Static content</li>
            </ul>
          </div>}
        >
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."<br/><br/>

          Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC<br/>
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"<br/><br/>

          1914 translation by H. Rackham<br/>
          "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
        </Card>
      </div>
    );
  },
  customBadgeSlot: () => {
    const badgesOptions = {
      'undefined': 'undefined',
      'text': 'text',
      'icon': 'icon',
    }
    const badges = {
      'undefined': undefined,
      'text': <div>Badge</div>,
      'icon': <div style={{ marginRight: '16px' }}>
        <ObjectAvatar
          color="mars"
          iconComponent={<Icon component={<SegmentM/>}/>}
        />
      </div>,
    }
    return (<Card
      withHeader
      title="Title"
      description="Description"
      renderBadge={() => badges[select('Badge slot', badgesOptions, 'icon')]}>{
        text('Card description', 'Description')
      }</Card>)
  }
};

export default {
  name: 'Components/Card',
  stories,
  Component: Card,
};
