import { boolean, select, text } from '@storybook/addon-knobs';
import Icon, {
  Check3M, DuplicateS,
  InfoFillM,
  WarningFillM,
} from '@synerise/ds-icon';
import React from 'react';
import Tooltip from '@synerise/ds-tooltip';
import Button from '@synerise/ds-button';
import UnorderedList from '@synerise/ds-unordered-list';
import Alert from '@synerise/ds-alert';
import Toast from '@synerise/ds-alert/dist/Toast/Toast';
import {
  FirstButtonWrapper, IconOrderWrapper,
  NumberWrapper,
  OrderWrapper,
  Wrapper,
} from '@synerise/ds-alert/dist/Toast/Toast.styles';



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
const SECTION_COLOR_TYPES = ['success', 'warning' , 'negative' , 'neutral' ,'informative'];


const additionalAlertMapper = {
  success: {color:'green',colorIcon: 'white',icon: <Check3M />},
  warning: {color:'yellow',colorIcon: 'black',icon: <WarningFillM />},
  negative: {color:'red',colorIcon: 'white',icon: <WarningFillM />},
  neutral: {color:'grey',colorIcon: 'grey',icon: <InfoFillM/>},
  informative:{color:'blue',colorIcon: 'blue',icon: <InfoFillM/>},
};

const stories = {
  WithCloseIcon: () => {
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
          withClose
          color={additionalAlertMapper[type].color}
          colorIcon={additionalAlertMapper[type].colorIcon}
        />
      </div>
    );
  },
  WithExpander: () => {
    const message = text('Message', 'Campaign saved!');
    const type = select('Set type', SECTION_COLOR_TYPES, 'success');
    const [iconCopied, setIconCopied] = React.useState(false);
    const [opened, setOpened] = React.useState(false);
    const data = [
      {
        label: (
          <OrderWrapper  color={additionalAlertMapper[type].color} >
            <div style={{ marginRight: '10px' }}>•</div> Schedule section must be defined
            <NumberWrapper>(505-456)</NumberWrapper>
            <Tooltip title={iconCopied ? 'Copied!' : 'Copy'}>
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
            <Tooltip title={iconCopied ? 'Copied!' : 'Copy'}>
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
          type={type}
          expander
          withClose={boolean('with close button', true)}
          expanded={opened}
          onExpand={setOpened}
          color={additionalAlertMapper[type].color}
          colorIcon={additionalAlertMapper[type].colorIcon}
          expandedContent={<Wrapper>
            <UnorderedList data={data} indexFormatter={undefined} />
          </Wrapper>}
        />
      </div>
    );
  },
  WithActionButton: () => {
    const message = text('Message', 'Campaign saved!');
    const type = select('Set type', SECTION_COLOR_TYPES, 'success');
    const description = text('Description', 'No response from server, try again later');
    const getTypeButton = (type): string => {
      if (type === 'neutral') {
        return 'tertiary';
      }
      if (type === 'informative') {
        return 'tertiary';
      }
      return 'tertiary-white';
    };
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
          description={description}
          expanded
          button={<FirstButtonWrapper>
            <Button type={getTypeButton(type)} mode="label">
              Button
            </Button>
          </FirstButtonWrapper>}
        />
      </div>
    );
  },
}
export default {
  name: 'Components/Alert/Toast/WithActions',
  config: {},
  decorator,
  stories,
  Component: Alert,
};
