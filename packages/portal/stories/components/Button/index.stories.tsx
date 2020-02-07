import * as React from 'react';
import { boolean, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Icon from '@synerise/ds-icon';
import { AngleDownS, DragHandleM, ShowM } from '@synerise/ds-icon/dist/icons';

import Button from '@synerise/ds-button';
import markdown from '@/button/README.md';

const typeOptions = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Ghost: 'ghost',
  Danger: 'danger',
  Success: 'success',
  Warning: 'warning',
  tertiaryWhite: 'tertiary-white',
  ghostPrimary: 'ghost-primary',
  ghostWhite: 'ghost-white',
};

const justifyContentOptions = {
  'flex-start': 'flex-start',
  'flex-end': 'flex-end',
  'center': 'center',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly',
  'start': 'start',
  'end': 'end',
  'left': 'left',
  'right': 'right',
  'safe': 'safe',
  'unsafe': 'unsafe',
};

const getDefaultProps = () => ({
  disabled: boolean('Disables', false),
  block: boolean('Fit button width', false),
  htmlType: text('Type button', 'button'),
  href: text('Redirect to link', ''),
  type: select('Set type', typeOptions, 'primary'),
  justifyContent: select('Set justify content', justifyContentOptions, 'center'),
  onClick: action('onClick CLICK'),
});

const stories = {
  allTypes: () => {
    const props = {
      ...getDefaultProps(),
      style: {
        margin: 4,
      },
    } as object;
    return (
      <div style={{background:`${(props.type === 'tertiary-white' || props.type === 'ghost-white') ? '#384350' : 'transparent'}`, display: 'flex'}}>
        <Button {...props} mode="simple">
          Button
        </Button>
        <Button {...props} mode="split">
          Button
          <Icon component={<AngleDownS />} color="#ffffff" />
        </Button>
        <Button {...props} mode="two-icons">
          <Icon component={<DragHandleM />} color="#ffffff" />
          Button
          <Icon component={<AngleDownS />} color="#ffffff" />
        </Button>
        <Button {...props} mode="label-icon">
          Button
          <Icon component={<AngleDownS />} color="#ffffff" />
        </Button>
        <Button {...props} mode="icon-label">
          <Icon component={<AngleDownS />} color="#ffffff" />
          Button
        </Button>
        <Button {...props} mode="single-icon">
          <Icon component={<ShowM />} color="#ffffff" />
        </Button>
      </div>
    );
  },
  simple: () => ({
    ...getDefaultProps(),
    mode: 'simple',
    children: text('Button content', 'Button'),
  }),
  split: () => ({
    ...getDefaultProps(),
    mode: 'split',
    children: (
      <React.Fragment>
        Button
        <Icon component={<AngleDownS />} color="#ffffff" />
      </React.Fragment>
    ),
  }),
  twoIcons: () => ({
    ...getDefaultProps(),
    mode: 'two-icons',
    children: (
      <React.Fragment>
        <Icon component={<DragHandleM />} color="#ffffff" />
        Button
        <Icon component={<AngleDownS />} color="#ffffff" />
      </React.Fragment>
    ),
  }),
  labelIcon: () => ({
    ...getDefaultProps(),
    mode: 'label-icon',
    children: (
      <React.Fragment>
        Button
        <Icon component={<AngleDownS />} color="#ffffff" />
      </React.Fragment>
    ),
  }),
  iconLabel: () => ({
    ...getDefaultProps(),
    mode: 'icon-label',
    children: (
      <React.Fragment>
        <Icon component={<AngleDownS />} color="#ffffff" />
        Button
      </React.Fragment>
    ),
  }),
  singleIcon: () => ({
    ...getDefaultProps(),
    mode: 'single-icon',
    children: (
      <React.Fragment>
        <Icon component={<ShowM />} color="#ffffff" />
      </React.Fragment>
    ),
  }),
};

export default {
  name: 'Components|Button',
  config: {
    notes: {
      markdown,
    },
  },
  stories,
  Component: Button,
};
