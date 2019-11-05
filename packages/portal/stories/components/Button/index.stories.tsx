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
};

const getDefaultProps = () => ({
  disabled: boolean('Disables', false),
  block: boolean('Fit button width', false),
  htmlType: text('Type button', 'button'),
  href: text('Redirect to link', ''),
  type: select('Set type', typeOptions, 'primary'),
  onClick: action('onClick CLICK'),
});

const stories = {
  allTypes: () => {
    const props = {
      ...getDefaultProps(),
      style: {
        margin: 20,
      },
    } as object;
    
    return (
      <React.Fragment>
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
      </React.Fragment>
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
