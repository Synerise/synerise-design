import { boolean, number, select, text } from '@storybook/addon-knobs';
import Icon, {
  Check3M, DuplicateS,
  InfoFillM,
  WarningFillM,
} from '@synerise/ds-icon';
import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip';
import Button from '@synerise/ds-button';
import UnorderedList from '@synerise/ds-unordered-list';
import Alert from '@synerise/ds-alert';
import Toast from '@synerise/ds-alert/dist/Toast/Toast';
import {
  AnimationContainer,
  FirstButtonWrapper, IconOrderWrapper,
  NumberWrapper,
  OrderWrapper,
  Wrapper,
} from '@synerise/ds-alert/dist/Toast/Toast.styles';
import AnimateHeight from 'react-animate-height';



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
const req = require.context('@synerise/ds-icon/dist/icons', false, /index.js/);
const iconsRaw = req(req.keys()[0]);
const iconsNames = Object.keys(iconsRaw);
const getDefaultProps = () => ({
  customIcon: boolean('Set custom symbol', false),
});
const SECTION_COLOR_TYPES = ['success', 'warning' , 'negative' , 'neutral' ,'informative'];
const typeOfContent = ['unorderedList', ''];
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
  success: {color:'green',colorIcon: 'white',icon: <Check3M />},
  warning: {color:'yellow',colorIcon: 'black',icon: <WarningFillM />},
  negative: {color:'red',colorIcon: 'white',icon: <WarningFillM />},
  neutral: {color:'grey',colorIcon: 'grey',icon: <InfoFillM/>},
  informative:{color:'blue',colorIcon: 'blue',icon: <InfoFillM/>},
};

const stories = {
  Default: () => {
    const message = text('Message', 'Campaign saved!');
    const type = select('Set type', SECTION_COLOR_TYPES, 'success');
    return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'bottom',
            alignItems: 'bottom',
          }}>
          <Toast
            message={message}
            type={type}
            color={additionalAlertMapper[type].color}
            colorIcon={additionalAlertMapper[type].colorIcon}
          />
      </div>
    );
  },
  WithDescription: () => {
    const message = text('Message', 'Campaign saved!');
    const type = select('Set type', SECTION_COLOR_TYPES, 'success');
    const description = text('Description', 'No response from server, try again later');
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'bottom',
          alignItems: 'bottom',
        }}>
        <Toast
          message={message}
          type={type}
          description={description}
          color={additionalAlertMapper[type].color}
          colorIcon={additionalAlertMapper[type].colorIcon}
        />
      </div>
    );
  },
  WithList: () => {
    const message = text('Message', 'Campaign saved!');
    const type = select('Set type', SECTION_COLOR_TYPES, 'success');
    const customColorText = select('Set custom color text', CUSTOM_COLORS, '');
    const [iconCopied, setIconCopied] = React.useState(false);
    const data = [
      {
        label: (
          <OrderWrapper customColorText={customColorText} color={additionalAlertMapper[type].color} >
            <div style={{ marginRight: '10px' }}>•</div> Schedule section must be defined
            <NumberWrapper>(505-456)</NumberWrapper>
            <Tooltip mouseLeaveDelay={0.5} title={iconCopied ? 'Copied!' : 'Copy'}>
              <IconOrderWrapper customColorText={customColorText} color={additionalAlertMapper[type].color} ><Icon onClick={(): void => setIconCopied(!iconCopied)} component={<DuplicateS/>}/></IconOrderWrapper>
            </Tooltip>
          </OrderWrapper>
        ),
        index: (1),
        id:('list')
      },
      {
        label: (
          <OrderWrapper customColorText={customColorText} color={additionalAlertMapper[type].color} >
            <div style={{ marginRight: '10px' }}>•</div> Missing email template
            <NumberWrapper>(505-456)</NumberWrapper>
            <Tooltip mouseLeaveDelay={0.5} title={iconCopied ? 'Copied!' : 'Copy'}>
              <IconOrderWrapper customColorText={customColorText} color={additionalAlertMapper[type].color}><Icon onClick={(): void => setIconCopied(!iconCopied)} component={<DuplicateS/>}/></IconOrderWrapper>
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
          justifyContent: 'bottom',
          alignItems: 'bottom',
        }}>
        <Toast
          message={message}
          expanded
          type={type}
          color={additionalAlertMapper[type].color}
          colorIcon={additionalAlertMapper[type].colorIcon}
          expandedContent={<Wrapper>
            <UnorderedList data={data} indexFormatter={undefined} />
          </Wrapper>}
        />
      </div>
    );
  },
  WithListAndDescription: () => {
    const message = text('Message', 'Campaign saved!');
    const type = select('Set type', SECTION_COLOR_TYPES, 'success');
    const description = text('Description', 'No response from server, try again later');
    const [iconCopied, setIconCopied] = React.useState(false);
    const data = [
      {
        label: (
          <OrderWrapper  color={additionalAlertMapper[type].color} >
            <div style={{ marginRight: '10px' }}>•</div> Schedule section must be defined
            <NumberWrapper>(505-456)</NumberWrapper>
            <Tooltip mouseLeaveDelay={0.5} title={iconCopied ? 'Copied!' : 'Copy'}>
              <IconOrderWrapper  color={additionalAlertMapper[type].color} ><Icon onClick={(): void => setIconCopied(!iconCopied)} component={<DuplicateS/>}/></IconOrderWrapper>
            </Tooltip>
          </OrderWrapper>
        ),
        index: (1),
        id:('list')
      },
      {
        label: (
          <OrderWrapper color={additionalAlertMapper[type].color} >
            <div style={{ marginRight: '10px' }}>•</div> Missing email template
            <NumberWrapper>(505-456)</NumberWrapper>
            <Tooltip mouseLeaveDelay={0.5} title={iconCopied ? 'Copied!' : 'Copy'}>
              <IconOrderWrapper color={additionalAlertMapper[type].color}><Icon onClick={(): void => setIconCopied(!iconCopied)} component={<DuplicateS/>}/></IconOrderWrapper>
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
          justifyContent: 'bottom',
          alignItems: 'bottom',
        }}>
        <Toast
          message={message}
          expanded
          type={type}
          color={additionalAlertMapper[type].color}
          colorIcon={additionalAlertMapper[type].colorIcon}
          description={description}
          expandedContent={<Wrapper>
            <UnorderedList data={data} indexFormatter={undefined} />
          </Wrapper>}
        />
      </div>
    );
  },
  WithGroupToast: () => {
    const message = text('Message', 'Campaign saved!');
    const type = select('Set type', SECTION_COLOR_TYPES, 'success');
    const [show1, setShow1] = React.useState(true);
    const [shouldRender1, setRender1] = React.useState(show1);
    const [show2, setShow2] = React.useState(true);
    const [shouldRender2, setRender2] = React.useState(show2);
    const [show3, setShow3] = React.useState(true);
    const [shouldRender3, setRender3] = React.useState(show3);

    React.useEffect(() => {
      if (show1) setRender1(false);
    }, [show1]);

    const onAnimationEnd1 = (): void => {
      if (!show1) setRender1(true);
    };
    React.useEffect(() => {
      if (show2) setRender2(false);
    }, [show2]);

    const onAnimationEnd2 = (): void => {
      if (!show2) setRender2(true);
    };
    React.useEffect(() => {
      if (show3) setRender3(false);
    }, [show1]);

    const onAnimationEnd3 = (): void => {
      if (!show3) setRender3(true);
    };
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'bottom',
          alignItems: 'bottom',
        }}>
        <AnimateHeight className="Toast-animation" duration={400} height={show1 ? 'auto' : 0}>
        {!shouldRender1 && (
          <AnimationContainer
            show={show1}
            onAnimationEnd={onAnimationEnd1}
          >
        <div style={{paddingBottom: '20px'}}>
        <Toast
          show={show1}
          onCloseClick={() => setShow1(show1 =>!show1)}
          message={message}
          type={type}
          withClose
          color={additionalAlertMapper[type].color}
          colorIcon={additionalAlertMapper[type].colorIcon}
        />
      </div>
          </AnimationContainer>)}
        </AnimateHeight>
        <AnimateHeight className="Toast-animation" duration={400} height={show2 ? 'auto' : 0}>
        {!shouldRender2 && (
          <AnimationContainer
            show={show2}
            onAnimationEnd={onAnimationEnd2}
          >
            <div style={{paddingBottom: '20px'}}>
            <Toast
              show={show2}
              onCloseClick={() => setShow2( show2 =>!show2)}
              message={message}
              type={type}
              withClose
              color={additionalAlertMapper[type].color}
              colorIcon={additionalAlertMapper[type].colorIcon}
            />
            </div>
          </AnimationContainer>)}
        </AnimateHeight>
        <AnimateHeight className="Toast-animation" duration={400} height={show3 ? 'auto' : 0}>
        {!shouldRender3 && (
          <AnimationContainer
            show={show3}
            onAnimationEnd={onAnimationEnd3}
          >
              <Toast
                show={show3}
                onCloseClick={() => setShow3(show3 =>!show3)}
                message={message}
                type={type}
                withClose
                color={additionalAlertMapper[type].color}
                colorIcon={additionalAlertMapper[type].colorIcon}
              />
          </AnimationContainer>)}
        </AnimateHeight>
      </div>
    );
  },
  Playground: () => {
    const expanderButton = boolean('Set expander button', false);
    const withClose = boolean('Set close button', true);
    const durationClose = number('Set time to close', 3000)
    const typeExpandedContent = select('Set type content', typeOfContent, '');
    const type = select('Set type', SECTION_COLOR_TYPES, 'success');
    const showButton = boolean('Set button', false);
    const props = getDefaultProps();
    const customMIcon = select('Set custom M Icon', iconsNames, iconsNames[3]);
    const customColor = select('Set custom color', CUSTOM_COLORS, '');
    const customColorIcon = select('Set custom color Icon', CUSTOM_COLORS, '');
    const customColorText = select('Set custom color text', CUSTOM_COLORS, '');
    const [iconCopied, setIconCopied] = React.useState(false);
    const [opened, setOpened] = React.useState(false);
    const data = [
      {
        label: (
          <OrderWrapper customColorText={customColorText} color={additionalAlertMapper[type].color} >
            <div style={{ marginRight: '10px' }}>•</div> Schedule section must be defined
            <NumberWrapper>(505-456)</NumberWrapper>
            <Tooltip mouseLeaveDelay={0.5} title={iconCopied ? 'Copied!' : 'Copy'}>
              <IconOrderWrapper customColorText={customColorText} color={additionalAlertMapper[type].color} ><Icon onClick={(): void => setIconCopied(!iconCopied)} component={<DuplicateS/>}/></IconOrderWrapper>
            </Tooltip>
          </OrderWrapper>
        ),
        index: (1),
        id:('list')
      },
      {
        label: (
          <OrderWrapper customColorText={customColorText} color={additionalAlertMapper[type].color} >
            <div style={{ marginRight: '10px' }}>•</div> Missing email template
            <NumberWrapper>(505-456)</NumberWrapper>
            <Tooltip mouseLeaveDelay={0.5} title={iconCopied ? 'Copied!' : 'Copy'}>
              <IconOrderWrapper customColorText={customColorText} color={additionalAlertMapper[type].color}><Icon onClick={(): void => setIconCopied(!iconCopied)} component={<DuplicateS/>}/></IconOrderWrapper>
            </Tooltip>
          </OrderWrapper>
        ),
        index: (1),
        id:('list')
      },
    ];
    const expandedContent = {
      unorderedList: <Wrapper>
        <UnorderedList data={data} indexFormatter={undefined} />
      </Wrapper>,
      '': '',
    };
    const description = text('Description', 'No response from server, try again later');
    const message = text('Message', 'Campaign saved!');
    const IconComp = iconsRaw[customMIcon];
    React.useEffect(() => {setOpened(true)}, [typeExpandedContent])
    const [show, setShow] = React.useState(false);
    const [shouldRender, setRender] = React.useState(show);
    const getTypeButton = (type): string => {
      if (type === 'neutral') {
        return 'tertiary';
      }
      if (type === 'informative') {
        return 'tertiary';
      }
      return 'tertiary-white';
    };

    React.useEffect(() => {
      if (show) setRender(true);
    }, [show]);

    const onAnimationEnd = (): void => {
      if (!show) setRender(false);
    };
    React.useEffect((): (() => void) => {
      const timeout = setTimeout(() => {
        setShow(false);
      }, durationClose);
      return (): void => {
        clearTimeout(timeout);
      };
    }, [shouldRender, durationClose]);
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10%'

      }}>
        <Button type="primary" mode="label" onClick={() => setShow(show => !show)}>
          show
        </Button>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'bottom',
          alignItems: 'bottom',
        }}>
        {shouldRender && (
          <AnimationContainer
            show={show}
            onAnimationEnd={onAnimationEnd}
          >
        <Toast
          {...props}
          show={show}
          onCloseClick={() => setShow(false)}
          expanded={opened}
          onExpand={setOpened}
          description={description}
          message={message}
          customColor={customColor}
          customColorIcon={customColorIcon}
          customColorText={customColorText}
          customIcon={props.customIcon ? <Icon component={<IconComp />}/> : null}
          expander={expanderButton}
          expandedContent={expandedContent[typeExpandedContent]}
          button={showButton && <FirstButtonWrapper>
            <Button type={getTypeButton(type)} mode="label">
              Button
            </Button>
          </FirstButtonWrapper>}
          type={type}
          color={additionalAlertMapper[type].color}
          colorIcon={additionalAlertMapper[type].colorIcon}
          withClose={withClose}
        />
          </AnimationContainer>)}
      </div>
        </div>
    );
  },
}
export default {
  name: 'Components/Alert/Toast',
  config: {},
  decorator,
  stories,
  Component: Alert,
};
