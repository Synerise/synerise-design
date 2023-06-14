import Navbar from '@synerise/ds-navbar';

import * as React from 'react';
import { boolean, select } from '@storybook/addon-knobs';
import Button from '@synerise/ds-button';
import Icon, { Add3M, AngleDownS, HelpM, NotificationsActiveM, BookM } from '@synerise/ds-icon';
import { action } from '@storybook/addon-actions';
import { theme } from '@synerise/ds-core';
import { UserAvatar } from '@synerise/ds-avatar';
import IconAlert from '@synerise/ds-alert/dist/IconAlert/IconAlert';

const addonType = { avatar: 'avatar', none: 'none' };
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


const logoSrc = 'https://app.synerise.com/spa/assets/images/logo.svg';

const renderAlertNotification=(isAlertNotification:boolean)=>(
  isAlertNotification?
  <React.Fragment>
    <IconAlert iconAlert={true} message="Trial - Expire in 12 days." type="info" />
    <Button onClick={action('onClick button Alert')} type="tertiary-white">Button</Button>
  </React.Fragment>
  :null
);

const stories = {
  default: () => {
    const suffixType = select('Set suffix type', addonType, addonType.none);
    const colorAll = select('Background color', backgroundColors, '#0b68ff');
    const hasButton = boolean('Set button', false);
    const withAlertNotification = boolean('With alert notification',false);
    
    return (
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
        alertNotification={renderAlertNotification(withAlertNotification)}
        actions={renderAddonComponent(suffixType)}
      />
    );
  },
};

export default {
name: 'Components/Navbar',
  withoutCenter: true,
  stories,
  Component: Navbar,
};
