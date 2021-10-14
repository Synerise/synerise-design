import { boolean, select, text } from '@storybook/addon-knobs';
import * as React from 'react';
import {
  Add3M, AngleDownS, BookM,
  Check3M, ErrorFillM, HelpM, NotificationsActiveM,
  WarningFillM,
} from '@synerise/ds-icon/dist/icons';
import Alert from '@synerise/ds-alert';
import BroadcastBar from '@synerise/ds-alert/dist/BroadcastBar/BroadcastBar';
import Button from '@synerise/ds-button/dist/Button';
import { action } from '@storybook/addon-actions';
import Icon from '@synerise/ds-icon';
import Navbar from '@synerise/ds-navbar';
import { UserAvatar } from '@synerise/ds-avatar';
import { addonType } from '../Select/index.stories';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
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
const SECTION_COLOR_TYPES = ['success','warning','negative' ];
function renderAddonComponent(suffixElementType: string) {
  switch (suffixElementType) {
    case addonType.avatar:
      return (
        <Button type="ghost" mode="single-icon">
          <UserAvatar text="AK" size="small" />
        </Button>
      );
    default:
      return null;
  }
}
const logoSrc = 'https://app.synerise.com/spa/assets/images/logo.svg';
const backgroundColors = {
  blue: theme.palette['blue-600'],
  grey: theme.palette['grey-600'],
  red: theme.palette['red-600'],
  green: theme.palette['green-600'],
  yellow: theme.palette['yellow-600'],
  pink: theme.palette['pink-600'],
  mars: theme.palette['mars-600'],
  orange: theme.palette['orange-600'],
  fern: theme.palette['fern-600'],
  cyan: theme.palette['cyan-600'],
  purple: theme.palette['purple-600'],
  violet: theme.palette['violet-600'],
};
const additionalAlertMapper = {
  success: {color:'green',icon: <Check3M />},
  warning: {color:'yellow',icon: <WarningFillM />},
  negative: {color:'red',icon: <ErrorFillM />},

};
const stories = {
  default: () => {
    const type = select('Set type', SECTION_COLOR_TYPES, 'warning');
    const description = text('Description', 'Sorry! There was a problem with your request.');
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <BroadcastBar
          description={description}
          type={type}
          color={additionalAlertMapper[type].color}
        />
      </div>
    );
  },
  withClose: () => {
    const type = select('Set type', SECTION_COLOR_TYPES, 'warning');
    const description = text('Description', 'Sorry! There was a problem with your request.');
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <BroadcastBar
          description={description}
          type={type}
          color={additionalAlertMapper[type].color}
          withClose={true}
        />
      </div>
    );
  },
  withEmphasis: () => {
    const type = select('Set type', SECTION_COLOR_TYPES, 'warning');
    const withEmphasis = text('withEmphasis', 'There was a problem with your request.');
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <BroadcastBar
          withEmphasis={withEmphasis}
          type={type}
          color={additionalAlertMapper[type].color}
        />
      </div>
    );
  },
  withLink: () => {
    const type = select('Set type', SECTION_COLOR_TYPES, 'warning');
    const withLink = text('withLink', 'Please reset this screen');
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <BroadcastBar
          withLink={withLink}
          type={type}
          color={additionalAlertMapper[type].color}
        />
      </div>
    );
  },
  withActions: () => {
    const type = select('Set type', SECTION_COLOR_TYPES, 'warning');
    const description = text('Description', 'Sorry! There was a problem with your request.');
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}>
        <BroadcastBar
          description={description}
          type={type}
          color={additionalAlertMapper[type].color}
          withClose={true}
          button={true}
          textButton='Button'
        />
      </div>
    );
  },
  withNavbar: () => {
    const type = select('Set type', SECTION_COLOR_TYPES, 'warning');
    const description = text('Description', 'Sorry! There was a problem with your request.');
    const suffixType = select('Set suffix type', addonType, addonType.avatar);
    const colorAll = select('Background color', backgroundColors, '#0b68ff');
    const hasButton = boolean('Set button', true);
    const [close, setClose] = React.useState(true);
    return (
      <div
      style={{width: '100%',padding: '16px'}}>
        <AnimateHeight className="Toast-animation" duration={400} height={close ? 'auto' : 0}>
        <BroadcastBar
          description={description}
          type={type}
          color={additionalAlertMapper[type].color}
          withClose={true}
          onCloseClick={() => setClose(close =>!close)}
        />
        </AnimateHeight>
        <Navbar
          description={'Module name'}
          logo={logoSrc}
          color={colorAll}
          additionalNodes={[
            <>
              <Button onClick={action('onClick')} type="ghost-white" mode="single-icon">
                <Icon component={<Add3M />} color={'#ffffff'} />
              </Button>
              <Button onClick={action('onClick')} type="ghost-white" mode="single-icon">
                <Icon component={<BookM />} color={'#ffffff'} />
              </Button>
              <Button onClick={action('onClick')} type="ghost-white" mode="single-icon">
                <Icon component={<HelpM />} color={'#ffffff'} />
              </Button>
              <Button onClick={action('onClick')} type="ghost-white" mode="single-icon">
                <Icon component={<NotificationsActiveM />} color={'#ffffff'} />
              </Button>
            </>,
            <div>
              {hasButton && (
                <Button mode="label-icon" type="ghost-white" >
                  Button
                  <Icon component={<AngleDownS />} />
                </Button>
              )}
            </div>,
          ]}
          actions={renderAddonComponent(suffixType)}
        />
      </div>
    );
  },
Playground: () => {
  const showButton = boolean('Set button', false);
  const withClose = boolean('Set close button', false);
  const type = select('Set type', SECTION_COLOR_TYPES, 'warning');
  const description = text('Description', 'Sorry! There was a problem with your request.');
  const showDescription = boolean('Set description', true);
  const withEmphasis = text('withEmphasis', 'There was a problem with your request.');
  const showEmphasis = boolean('Set emphasis', false);
  const withLink = text('withLink', 'Please reset this screen');
  const showLink = boolean('Set link', false);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}>
      <BroadcastBar
        description={showDescription && description}
        withEmphasis={ showEmphasis && withEmphasis}
        withLink={showLink && withLink}
        textButton='Button'
        button={showButton}
        type={type}
        color={additionalAlertMapper[type].color}
        withClose={withClose}
      />
    </div>
  );
},
}
export default {
  name: 'Components/Alert/BroadcastBar',
  config: {},
  decorator,
  stories,
  Component: Alert,
};