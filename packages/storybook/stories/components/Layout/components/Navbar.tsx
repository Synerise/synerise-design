import { theme } from '@synerise/ds-core';
import Button from '@synerise/ds-button';
import { action } from 'storybook/actions';
import Icon, { Add3M, AngleDownS, BookM, HelpM, NotificationsActiveM } from '@synerise/ds-icon';
import Navbar from '@synerise/ds-navbar';
import React from 'react';

const logoSrc = 'https://app.synerise.com/spa/assets/images/logo.svg';

const LayoutNavbar = () => (
  <Navbar
    description={'Module name'}
    logo={logoSrc}
    color={theme.palette['orange-600']}
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
        <Button mode="label-icon" type="ghost-white" >
          Button
          <Icon component={<AngleDownS />} />
        </Button>
      </div>,
    ]}
  />
)

export default LayoutNavbar;
