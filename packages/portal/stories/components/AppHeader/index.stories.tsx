import * as React from 'react';

import { text, select, boolean } from '@storybook/addon-knobs';

import AppHeader from '@synerise/ds-app-header';
import Icon from '@synerise/ds-icon';
// import ButtonGroup from '@synerise/ds-button-group';
import Button from '@synerise/ds-button';

import LogoSVG from './white.svg';
import AvatarImage from './avatar.jpg';

import Add3M from '@synerise/ds-icon/dist/icons/Add3M';
import BookM from '@synerise/ds-icon/dist/icons/BookM';
import HelpM from '@synerise/ds-icon/dist/icons/HelpM';
import NotificationsM from '@synerise/ds-icon/dist/icons/NotificationsM';

const decorator = (storyFn) => (
  <div style={{ width: 800 }}>
    {storyFn()}
  </div>
);

const stories = {
  default: () => {
    const title = text('title', 'Module name');
    const renderExampleNodes = boolean('Render example of side nodes', true);
    const backgroundColor = select('backgroundColor', {
      'red': 'red',
      'blue': 'blue',
      'green': 'green',
      'grey': 'grey',
      'yellow': 'yellow',
      'pink': 'pink',
      'mars': 'mars',
      'orange': 'orange',
      'fern': 'fern',
      'cyan': 'cyan',
      'purple': 'purple',
      'violet': 'violet',
    }, 'blue');

    const props = {
      title,
      backgroundColor,
      logo: LogoSVG,
      sideNodes: renderExampleNodes && [(
        <div style={{color: '#fff', fontWeight: 500}}>some seperate text</div>
      ), (
        <div>
          <Button type="primary" mode="single-icon">
            <Icon component={<NotificationsM />} size={32} />
          </Button>
          <Button type="primary" mode="single-icon">
            <Icon component={<HelpM />} size={32} />
          </Button>
        </div>
      ), (
        <div><img src={AvatarImage} alt="" style={{width: 32, height: 32, borderRadius: 16}} /></div>
      )]
    };

    return <AppHeader {...props} />;
  },
};

export default {
  name: 'Components|AppHeader',
  config: {},
  decorator,
  stories,
  Component: AppHeader,
}
