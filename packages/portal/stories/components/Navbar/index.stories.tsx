import Navbar from '@synerise/ds-navbar';

import * as React from 'react';
import { boolean, number, select } from '@storybook/addon-knobs';
import Button from '@synerise/ds-button/dist/Button';
import Icon from '@synerise/ds-icon';
import {
  Add3M,
  AngleDownS, HelpM, NotificationsActiveM, BookM,
} from '@synerise/ds-icon/dist/icons';
import { action } from '@storybook/addon-actions';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Avatar from '@synerise/ds-avatar';


const addonType = { avatar: 'avatar', none: 'none',};
function renderAddonComponent(suffixElementType: string) {
  switch (suffixElementType) {
    case addonType.avatar:
      return (
        <Avatar size="medium" backgroundColor="green" backgroundColorHue="400" shape="circle">
          AK
        </Avatar>
      );
    default:
      return null;
      break;
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

}
const backgroundButtonColors = {
  blue: 'blue',
  grey: 'grey',
  red: 'red',
  green: 'green',
  yellow: 'yellow',
  pink: 'pink',
  mars: 'mars',
  orange: 'orange',
  fern: 'fern',
  cyan: 'cyan',
  purple: 'purple',
  violet: 'violet',


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

const logoSrc = 'https://app.portal.rc.snrstage.com/spa/assets/images/logo.svg';

const stories = {
  default:() => {
    const suffixType = select('Set suffix type', addonType, addonType.none);
    const colorAll = select('Background color', backgroundColors, '#0b68ff');
    const colorButton = select('Button color', backgroundButtonColors, 'blue');
    const hasButton = boolean('Set button', false);


    return <Navbar
    description={'Module name'}
    logo={logoSrc}
    color={colorAll}
    additionalNodes={[<>
      <Button onClick={action('onClick')} type="ghost-white" mode="single-icon">
        <Icon component={<Add3M />} color={'#ffffff'} />
      </Button>
      <Button onClick={action('onClick')} type="ghost-white" mode="single-icon">
        <Icon component={<BookM />} color={'#ffffff'} />
      </Button>
      <Button onClick={action('onClick')} type="ghost-white" mode="single-icon">
        <Icon component={<HelpM />} color={'#ffffff'} />
      </Button>
      <Button onClick={action('onClick')} type="ghost-white" mode="single-icon" >
        <Icon component={<NotificationsActiveM />} color={'#ffffff'} />
      </Button>
    </>,
      <div>
        {hasButton && <Button  mode='label-icon' type='custom-color' color = {colorButton} >
          Button
          <Icon component={ <AngleDownS/>}/>
        </Button>}
      </div>]}
    actions={<>
      <div>{renderAddonComponent(suffixType)}</div>
    </>}
    />},
};

export default {
  name: 'Components|Navbar',
  withoutCenter: true,
  stories,
  Component: Navbar,
};
