import * as React from 'react';
import { boolean, text, select, number } from '@storybook/addon-knobs';

import Tooltip from '@synerise/ds-tooltip';
import Avatar from '@synerise/ds-avatar';
import { InfoFillS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Button from '@synerise/ds-button';

const decorator = (storyFn) => (
  <div style={{ padding: '60px' }}>
    {storyFn()}
  </div>
);

const TUTORIALS = [
  {
    title: 'Tip for you - 1',
    description: 'You can change profile name later in your profile settings.'
  },
  {
    title: 'Tip for you - 2',
    description: 'You can change avatar later in your profile settings.'
  },
  {
    title: 'Tip for you - 3',
    description: 'You can change password later in your profile settings.'
  }
];

const props = () => ({
  placement: select(
    'Placement',
    [
      'top',
      'left',
      'right',
      'bottom',
      'topLeft',
      'topRight',
      'bottomLeft',
      'bottomRight',
      'leftTop',
      'leftBottom',
      'rightTop',
      'rightBottom',
    ],
    'top'
  ),
  trigger: select('Trigger', ['hover', 'focus', 'click', 'contextMenu'], 'hover'),
});

const tutorialProps = () => ({
  tutorialAutoplay: boolean('Enable tutorial autoplay', true),
  tutorialAutoplaySpeed: number('Set speed of tutorial [ms]', 5000),
  tutorials: TUTORIALS,
});

const stories = {
  default: () => (
    <div>
      <Tooltip
        {...props()}
        type="default"
        title={text('Set tooltip title', 'More than just example text')}
      >
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
    </div>
  ),
  icon: () => (
    <div>
      <Tooltip
        {...props()}
        type="icon"
        title={text('Set tooltip title', 'More than just example text')}
        description={text('Set tooltip description', 'You can change profile name later in your profile settings. More info')}
      >
        <Button type="primary">Show more</Button>
      </Tooltip>
    </div>
  ),
  large: () => (
    <div>
      <Tooltip
        {...props()}
        type="largeSimple"
        description={text('Set tooltip description', 'You can change profile name later in your profile settings. More info')}
        offset='small'
      >
        <span style={{display: 'flex'}}>
          <Icon component={<InfoFillS />} color="#b5bdc3" />
        </span>
      </Tooltip>
    </div>
  ),
  avatar: () => (
    <div>
      <Tooltip
        {...props()}
        type="avatar"
        title={text('Set user name', 'Jan Nowak')}
        description={text('Set user email', 'jan.nowak@gmail.com')}
      >
        <Avatar backgroundColor='green' backgroundColorHue='600'>JN</Avatar>
      </Tooltip>
    </div>
  ),
  tutorial: () => (
    <div>
      <Tooltip
        {...props()}
        {...tutorialProps()}
        type="tutorial"
        tutorials={TUTORIALS}
      >
        <Button type="primary">Show tips</Button>
      </Tooltip>
    </div>
  ),
};

export default {
  name: 'Components|Tooltip',
  decorator,
  stories,
  Component: Tooltip,
};
