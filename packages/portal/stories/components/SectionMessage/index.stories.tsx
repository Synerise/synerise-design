import * as React from 'react';
import Icon, {
  Check3M,
  CheckS, DuplicateS,
  HelpFillM,
  NotificationsReceiveM,
  UpdateDataM,
  UserUpM,
  WarningFillM,
} from '@synerise/ds-icon';
import { boolean, select, text } from '@storybook/addon-knobs';
import SectionMessage from '@synerise/ds-alert/dist/SectionMessage/SectionMessage';
import Alert from '@synerise/ds-alert';
import Card, { CardBadge } from '@synerise/ds-card';
import { CardProps } from '@synerise/ds-card';
import Button from '@synerise/ds-button';
import * as S from '../Card/stories.styles';
import ModalProxy from '@synerise/ds-modal';
import { sizes } from '../Modal/index.stories';
import UnorderedList from '@synerise/ds-unordered-list';
import Tooltip from '@synerise/ds-tooltip';
import {
  ButtonsWrapper, FirstButtonWrapper,
  IconOrderWrapper,
  NumberWrapper,
  OrderWrapper, Wrapper,
} from '@synerise/ds-alert/dist/SectionMessage/SectionMessage.styles';

const decorator = storyFn => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {storyFn()}
  </div>
);
const req = require.context('@synerise/ds-icon/dist/esm/icons/', false, /index.js/);
const iconsRaw = req(req.keys()[0]);
const iconsNames = Object.keys(iconsRaw);

const getDefaultProps = () => ({
  customIcon: boolean('Set custom symbol', false),
});
const SECTION_COLOR_TYPES = ['positive', 'notice' , 'negative' , 'neutral' ,'supply', 'service' , 'entity',];

const CUSTOM_COLORS = [
  '',
  'blue',
  'grey',
  'red',
  'green',
  'yellow',
  'pink',
  'mars',
  'orange',
  'fern',
  'cyan',
  'purple',
  'violet',
];


const additionalAlertMapper = {
  positive: {color:'green',icon: <Check3M />},
  notice: {color:'yellow',icon: <WarningFillM />},
  negative: {color:'red',icon: <WarningFillM />},
  neutral: {color:'grey',icon: <HelpFillM/>},
  supply:{color:'violet',icon: <UserUpM/>},
  service:{color:'purple',icon: <UpdateDataM/>},
  entity:{color:'cyan',icon: <NotificationsReceiveM/>},
};
const stories = {
  Default: () => {
    const type = select('Set type', SECTION_COLOR_TYPES, 'negative')
    const withClose = boolean('Set close button', false);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '788px',
          height: '100%',
        }}
      >
        <SectionMessage
          type={type}
          color={additionalAlertMapper[type].color}
          description={text('Description', 'This is a simple message')}
          withClose={withClose}
        />
      </div>
    );
  },
  Withemphasis: () => {
    const type = select('Set type', SECTION_COLOR_TYPES, 'negative')
    const withClose = boolean('Set close button', false);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '788px',
          height: '100%',
        }}
      >
        <SectionMessage
          type={type}
          color={additionalAlertMapper[type].color}
          description={text('Description', 'This is a simple message')}
          withEmphasis={text('withEmphasis', 'with emphasis')}
          withClose={withClose}
        />
      </div>
    );
  },
  WithLink: () => {
    const type = select('Set type', SECTION_COLOR_TYPES, 'negative')
    const withClose = boolean('Set close button', false);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '788px',
          height: '100%',
        }}
      >
        <SectionMessage
          type={type}
          color={additionalAlertMapper[type].color}
          description={text('Description', 'This is a simple message')}
          withLink={text('withLink', 'Click here to learn more')}
          withClose={withClose}
        />
      </div>
    );
  },
  WithTitle: () => {
    const type = select('Set type', SECTION_COLOR_TYPES, 'negative')
    const withClose = boolean('Set close button', false);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '788px',
          height: '100%',
        }}
      >
        <SectionMessage
          type={type}
          color={additionalAlertMapper[type].color}
          description={text('Description', 'This is a simple message')}
          message={text('Message', 'Alert!')}
          withClose={withClose}
        />
      </div>
    );
  },
  WithClose: () => {
    const type = select('Set type', SECTION_COLOR_TYPES, 'negative')
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '788px',
          height: '100%',
        }}
      >
        <SectionMessage
          type={type}
          color={additionalAlertMapper[type].color}
          description={text('Description', 'This is a simple message')}
          withClose={true}
        />
      </div>
    );
  },
  WithActions: () => {
    const type = select('Set type', SECTION_COLOR_TYPES, 'negative')
    const withClose = boolean('Set close button', false);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '788px',
          height: '100%',
        }}
      >
        <SectionMessage
          type={type}
          color={additionalAlertMapper[type].color}
          description={text('Description', 'This is a simple message')}
          textButton='Add client'
          newClient={true}
          withClose={withClose}
        />
        <div style={{padding: '10px'}}/>
        <SectionMessage
          type={type}
          color={additionalAlertMapper[type].color}
          description={text('Description', 'This is a simple message')}
          message={text('Message', 'Alert!')}
          moreButtons={<ButtonsWrapper>
            <FirstButtonWrapper>
              <Button type="secondary" mode="label">
                Button
              </Button>
            </FirstButtonWrapper>
            <Button type="ghost" mode="label">
              Button
            </Button>
          </ButtonsWrapper>}
          withClose={withClose}
        />
      </div>
    );
  },
  WithList: () => {
    const type = select('Set type', SECTION_COLOR_TYPES, 'negative')
    const withClose = boolean('Set close button', false);
    const [iconCopied, setIconCopied] = React.useState(false);
    const data = [
      {
        label: (
          <OrderWrapper >
            <div style={{ marginRight: '10px' }}>•</div> Schedule section must be defined
            <NumberWrapper>(505-456)</NumberWrapper>
            <Tooltip title={iconCopied ? 'Copied!' : 'Copy'}>
              <IconOrderWrapper><Icon onClick={(): void => setIconCopied(!iconCopied)} component={<DuplicateS/>}/></IconOrderWrapper>
            </Tooltip>
          </OrderWrapper>
        ),
        index: (1),
        id:('list')
      },
      {
        label: (
          <OrderWrapper >
            <div style={{ marginRight: '10px' }}>•</div> Missing email template
            <NumberWrapper>(505-456)</NumberWrapper>
            <Tooltip title={iconCopied ? 'Copied!' : 'Copy'}>
              <IconOrderWrapper><Icon onClick={(): void => setIconCopied(!iconCopied)} component={<DuplicateS/>}/></IconOrderWrapper>
            </Tooltip>
          </OrderWrapper>
        ),
        index: (1),
        id:('list')
      },
    ];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '788px',
          height: '100%',
        }}
      >
        <SectionMessage
          type={type}
          color={additionalAlertMapper[type].color}
          description={text('Description', 'This is a simple message')}
          message={text('Message', 'Alert!')}
          unorderedList={
            <Wrapper>
              <UnorderedList data={data} indexFormatter={undefined} />
            </Wrapper>}
          withClose={withClose}
        />
      </div>
    );
  },
  CardWithSectionMessage: () => {
    const withClose = boolean('Set close button', false);
    const type = select('Set type', SECTION_COLOR_TYPES, 'notice');
    const message = text('Message', 'Warning');
    const [collapsedCardsState, setCollapsedCardsState] = React.useState({
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
    });
    const updateCollapsedState = (index, collapsed) =>
      setCollapsedCardsState({ ...collapsedCardsState, [index]: collapsed });
    const renderCard = (
      props: CardProps & { withIcon?: string | boolean },
      hideContentInitial = false,
      onExpansionChange?: (expanded: boolean) => void
    ) => {
      const [hideContent, setHideContent] = React.useState(hideContentInitial);
      React.useEffect(() => {
        setHideContent(hideContentInitial);
      }, [hideContentInitial]);
      return(
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '837px',
            height: '100%',
          }}
        >
        <Card
          lively={boolean('Hover enabled', true)}
          disabled={ boolean('Disabled', false)}
          raised={boolean('Active', false)}
          withHeader={boolean('With header', true)}
          title={text('Title', 'Card header')}
          description={text('description', 'description')}
          icon={<CardBadge icon={<CheckS />} />}
          iconColor={text('Icon color', '#54cb0b')}
          compactHeader={boolean('Compact header', false)}
          onHeaderClick={() => {
            onExpansionChange && onExpansionChange(!hideContent);
            setHideContent(!hideContent);
          }}
          headerSideChildren={props.headerSideChildren}
          headerBorderBottom={boolean('Header with border bottom', false)}
          background={'white-shadow'}
          hideContent={boolean('Enable collapsing', false)}
          showSideChildrenWhenHeaderHidden={boolean('Set Footer Active', false)}
        >
          <div style={{ width: '100%', height: 100 }}>
          <SectionMessage
            type={type}
            message={message}
            color={additionalAlertMapper[type].color}
            description={text('Description', 'Looks like you’ve exceeded your limit. ')}
            withLink={text('withLink', 'Need an upgrade?')}
            withClose={withClose}
          />
          </div>
        </Card>
        </div>
      )
    }
    return (
      <S.HeaderWrapper>
        {renderCard(
          {
            lively: true,
            compactHeader: false,
            icon: <CardBadge icon={<CheckS />} />,
            headerBorderBottom: false,
            headerSideChildren: (
              <div>
                <Button>
                  Define
                </Button>
              </div>
            ),
          },
          collapsedCardsState[1],
          collapsed => updateCollapsedState(1, collapsed)
        )}
      </S.HeaderWrapper>
    );
  },
  ModalWithSectionMessage: () => {
    const withClose = boolean('Set close button', false);
    const message = text('Message', 'Warning');
    const type = select('Set type', SECTION_COLOR_TYPES, 'notice');
    return (

      <ModalProxy
        size={select('Size', sizes, 'medium')}
        visible={boolean('Set open', true)}
        title="Modal header"

      >
        <div style={{ width: '566px', margin: '0 70px'}}>
        <SectionMessage
          type={type}
          message={message}
          color={additionalAlertMapper[type].color}
          description={text('Description', 'Looks like you’ve exceeded your limit. ')}
          withLink={text('withLink', 'Need an upgrade?')}
          withClose={withClose}
        />
        </div>
      </ModalProxy>
    );
  },
  Playground: () => {
    const showButton = boolean('Set button', false);
    const withClose = boolean('Set close button', false);
    const showUnorderedList = boolean('Set unorderedList', false);
    const showButtons = boolean('Set buttons', false);
    const type = select('Set type', SECTION_COLOR_TYPES, 'negative');
    const description = text('Description', 'This is a simple message');
    const message = text('Message', 'Alert!');
    const withEmphasis = text('withEmphasis', 'with emphasis');
    const withLink = text('withLink', 'Click here to learn more');
    const customColor = select('Set color', CUSTOM_COLORS, '');
    const customColorIcon = select('Set color Icon', CUSTOM_COLORS, '');
    const customMIcon = select('Set custom M Icon', iconsNames, iconsNames[3]);
    const IconComp = iconsRaw[customMIcon]
    const props = getDefaultProps();
    const [iconCopied, setIconCopied] = React.useState(false);
    const data = [
      {
        label: (
          <OrderWrapper >
            <div style={{ marginRight: '10px' }}>•</div> Schedule section must be defined
            <NumberWrapper>(505-456)</NumberWrapper>
            <Tooltip title={iconCopied ? 'Copied!' : 'Copy'}>
              <IconOrderWrapper><Icon onClick={(): void => setIconCopied(!iconCopied)} component={<DuplicateS/>}/></IconOrderWrapper>
            </Tooltip>
          </OrderWrapper>
        ),
        index: (1),
        id:('list')
      },
      {
        label: (
          <OrderWrapper >
            <div style={{ marginRight: '10px' }}>•</div> Missing email template
            <NumberWrapper>(505-456)</NumberWrapper>
            <Tooltip title={iconCopied ? 'Copied!' : 'Copy'}>
              <IconOrderWrapper><Icon onClick={(): void => setIconCopied(!iconCopied)} component={<DuplicateS/>}/></IconOrderWrapper>
            </Tooltip>
          </OrderWrapper>
        ),
        index: (1),
        id:('list')
      },
    ];
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '788px',
          height: '100%',
        }}>
        <SectionMessage
          {...props}
          description={description}
          message={message}
          withEmphasis={withEmphasis}
          withLink={withLink}
          textButton='Add client'
          customColor={customColor}
          customColorIcon={customColorIcon}
          customIcon={props.customIcon ? <Icon  component={<IconComp />}/> : null}
          newClient={showButton}
          moreButtons={showButtons && (<ButtonsWrapper>
            <FirstButtonWrapper>
              <Button type="secondary" mode="label">
                Button
              </Button>
            </FirstButtonWrapper>
            <Button type="ghost" mode="label">
              Button
            </Button>
          </ButtonsWrapper>)}
          unorderedList={showUnorderedList && (
            <Wrapper>
            <UnorderedList data={data} indexFormatter={undefined} />
          </Wrapper>)}
          type={type}
          color={additionalAlertMapper[type].color}
          withClose={withClose}
        />
      </div>
    );
  },
}
export default {
  name: 'Components/Alert/SectionMessage',
  config: {},
  decorator,
  stories,
  Component: Alert,
};
