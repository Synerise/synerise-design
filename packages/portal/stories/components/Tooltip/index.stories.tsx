import * as React from 'react';
import { boolean, text, select, array } from '@storybook/addon-knobs';

import Tooltip from '@synerise/ds-tooltip';

const decorator = (storyFn) => (
  <div style={{ padding: '60px' }}>
    {storyFn()}
  </div>
);

const props = () => ({
  title: text('Tooltip text', 'More than just example text'),
  description: text('Tooltip description', 'You can change profile name later in your profile settings. More info'),
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
  type: select('Type', ['default', 'icon', 'largeSimple', 'tutorial'], 'default'),
  trigger: select('Trigger', ['hover', 'focus', 'click', 'contextMenu'], 'hover'),
});

const stories = {
  default: () => ({
    ...props(),
    autoAdjustOverflow: boolean('autoAdjustOverflow', true),
    arrowPointAtCenter: boolean('arrowPointAtCenter', false),
    children: (<span>Tooltip will show on mouse enter.</span>),
  }),
  forceVisibility: () => ({
    ...props(),
    autoAdjustOverflow: boolean('autoAdjustOverflow', true),
    arrowPointAtCenter: boolean('arrowPointAtCenter', false),
    visible: boolean('visible', true),
    children: (<span>Tooltip will show on mouse enter.</span>),
  }),
  isDescriptionArray: () => ({
    ...props(),
    description: array('Tooltip description', ['You can change profile name later in your profile settings. More info','More tips. This is a second tab of tutorial tips.'],','),
    autoAdjustOverflow: boolean('autoAdjustOverflow', true),
    arrowPointAtCenter: boolean('arrowPointAtCenter', false),
    visible: boolean('visible', true),
    children: (<span>Tooltip will show on mouse enter.</span>),
  }),
  noTitleDescriptionIconProvided: () => ({
    ...props(),
    title: undefined,
    description: undefined,
    autoAdjustOverflow: boolean('autoAdjustOverflow', true),
    arrowPointAtCenter: boolean('arrowPointAtCenter', false),
    children: (<span>Tooltip will show on mouse enter.</span>)
  }),
};

export default {
  name: 'Components|Tooltip',
  decorator,
  stories,
  Component: Tooltip,
};
