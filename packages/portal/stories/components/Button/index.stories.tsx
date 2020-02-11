import * as React from 'react';
import { text, select } from '@storybook/addon-knobs';
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

const getDefaultProps = () => ({
  htmlType: text('Type button', 'button'),
  type: select('Set type', typeOptions, 'primary'),
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
      <div style={{background:`${(props.type === 'tertiary-white' || props.type === 'ghost-white') ? '#384350' : 'transparent'}`, display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex'}}>
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
        <div style={{display: 'flex'}}>
          <Button {...props} disabled mode="simple">
            Button
          </Button>
          <Button {...props} disabled mode="split">
            Button
            <Icon component={<AngleDownS />} color="#ffffff" />
          </Button>
          <Button {...props} disabled mode="two-icons">
            <Icon component={<DragHandleM />} color="#ffffff" />
            Button
            <Icon component={<AngleDownS />} color="#ffffff" />
          </Button>
          <Button {...props} disabled mode="label-icon">
            Button
            <Icon component={<AngleDownS />} color="#ffffff" />
          </Button>
          <Button {...props} disabled mode="icon-label">
            <Icon component={<AngleDownS />} color="#ffffff" />
            Button
          </Button>
          <Button {...props} disabled mode="single-icon">
            <Icon component={<ShowM />} color="#ffffff" />
          </Button>
        </div>
        <div style={{display: 'flex'}}>
          <Button {...props} spinner mode="simple">
            Button
          </Button>
          <Button {...props} spinner mode="split">
            Button
            <Icon component={<AngleDownS />} color="#ffffff" />
          </Button>
          <Button {...props} spinner mode="two-icons">
            <Icon component={<DragHandleM />} color="#ffffff" />
            Button
            <Icon component={<AngleDownS />} color="#ffffff" />
          </Button>
          <Button {...props} spinner mode="label-icon">
            Button
            <Icon component={<AngleDownS />} color="#ffffff" />
          </Button>
          <Button {...props} spinner mode="icon-label">
            <Icon component={<AngleDownS />} color="#ffffff" />
            Button
          </Button>
          <Button {...props} spinner mode="single-icon">
            <Icon component={<ShowM />} color="#ffffff" />
          </Button>
        </div>
        <div style={{display: 'flex'}}>
          <Button {...props} mode="simple" groupVariant="left-rounded">
            Button
          </Button>
          <Button {...props} mode="simple" groupVariant="squared">
            Button
          </Button>
          <Button {...props} mode="simple" groupVariant="right-rounded">
            Button
          </Button>
        </div>
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
