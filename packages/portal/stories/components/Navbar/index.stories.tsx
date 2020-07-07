import Navbar from '@synerise/ds-navbar';

import * as React from 'react';
import { select } from '@storybook/addon-knobs';
import Button from '@synerise/ds-button/dist/Button';
import Icon from '@synerise/ds-icon';
import { NotificationsPlayM, CalendarM, DashboardM } from '@synerise/ds-icon/dist/icons';
import { action } from '@storybook/addon-actions';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

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

}

const buttonStyle = {
  color: '#ffffff',
};

const dataSingle = [
  [
    { text: 'Item 1', disabled: true },
    { text: 'Item 2', disabled: false },
    { text: 'Item 3', disabled: true },
    { text: 'Item 4', disabled: false, danger: true },
  ],
];

const logoSrc = 'https://synerise.com/synerise/assets/svg/logos/logo-white.png';

const stories = {
  default:() => {
    return <Navbar
    description={'Module name'}
    logo={logoSrc}
    color={select('Background color', backgroundColors, '#0b68ff')}
    additionalNodes={[<div>some text</div>, <div>some other text</div>]}
    actions={<>
      <Button onClick={action('onClick')} type="ghost-white" mode="single-icon">
        <Icon component={<DashboardM />} color={'#ffffff'} />
      </Button>
      <Button onClick={action('onClick')} type="ghost-white" mode="single-icon">
        <Icon component={<CalendarM />} color={'#ffffff'} />
      </Button>
      <Button onClick={action('onClick')} type="ghost-white" mode="single-icon">
        <Icon component={<NotificationsPlayM />} color={'#ffffff'} />
      </Button>
    </>}
    />},
};

export default {
  name: 'Components|Navbar',
  withoutCenter: true,
  stories,
  Component: Navbar,
};
